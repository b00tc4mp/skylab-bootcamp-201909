const { validate, errors: { ConflictError, NotFoundError } } = require('gamerex-util')
const { ObjectId, models: { User, Game } } = require('gamerex-data')

module.exports = function (id, gameId, title, platform, sell, exchange, favourite) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    validate.string(gameId)
    validate.string.notVoid('game id', gameId)
    if (!ObjectId.isValid(gameId)) throw new ContentError(`${gameId} is not a valid game id`)

    if (title) {
        validate.string(title)
        validate.string.notVoid('title', title)
    }
    if (platform) {
        validate.string(platform)
        validate.string.notVoid('platform', platform)
    }

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const game = await Game.findById(gameId)

        if (!game) throw new NotFoundError(`user does not have game with id ${gameId}`)

        if (game.user.toString() !== id.toString()) throw new ConflictError(`user with id ${id} does not correspond to game with id ${gameId}`)

        const update = {}

        title && (update.title = title)
        platform && (update.platform = platform)
        update.sell = sell
        update.exchange = exchange
        update.favourite = favourite
        update.lastAccess = new Date

        await Game.updateOne({ _id: ObjectId(gameId) }, { $set: update })
    })()
}
