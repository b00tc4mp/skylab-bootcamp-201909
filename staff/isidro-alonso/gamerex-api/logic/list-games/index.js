const { validate, errors: { NotFoundError, ContentError } } = require('gamerex-util')
const { ObjectId, models: { User, Game } } = require('gamerex-data')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        await Game.updateMany({ user: id }, { $set: { lastAccess: new Date } })

        const games = await Game.find({ user: id }, { __v: 0 }).lean()

        games.forEach(game => {
            game.id = game._id.toString()
            delete game._id

            game.user = id
        })

        return games
    })()
}
