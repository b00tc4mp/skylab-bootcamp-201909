const { validate, errors: { NotFoundError } } = require('gamerex-util')
const { ObjectId, models: { User, Game } } = require('gamerex-data')

module.exports = function (id, title, platform, sell, exchange, favourite) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    validate.string(title)
    validate.string.notVoid('title', title)

    validate.string(platform)
    validate.string.notVoid('platform', platform)

    console.log('pasa por create game apI')

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const game = await Game.create({ user: id, title, platform, sell, exchange, favourite })

        return game.id
    })()
}
