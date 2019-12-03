const { validate, errors: { NotFoundError, ContentError } } = require('gamerex-util')
const { ObjectId, models: { Game } } = require('gamerex-data')

module.exports = function () {

    return (async () => {

        // const user = await User.findById(id)

        // if (!user) throw new NotFoundError(`user with id ${id} not found`)

        // await Game.updateMany({ user: id }, { $set: { lastAccess: new Date } })

        // const games = await Game.find({ user: id }, { __v: 0 }).lean()

        // games.forEach(game => {
        //     game.id = game._id.toString()
        //     delete game._id

        //     game.user = id
        // })

        // return games

        // const users = await User.find().lean()

        // for(let i=0; i < users.length; i++) {
        //     console.log(users[i]._id)
        // }

        const games = await Game.find().lean()

        // for(let i=0; i < games.length; i++) {
        //     console.log(games[i].user)
        // }

        return games
    })()
}
