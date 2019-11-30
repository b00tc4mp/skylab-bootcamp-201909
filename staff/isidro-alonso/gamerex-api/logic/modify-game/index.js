const { validate, errors: { ConflictError, NotFoundError } } = require('gamerex-util')
const { ObjectId, models: { User, Game } } = require('gamerex-data')

module.exports = function (id, gameId, title, description, status) {
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
    if (description) {
        validate.string(description)
        validate.string.notVoid('description', description)
    }
    if (status) {
        validate.string(status)
        validate.string.notVoid('status', status)
        validate.matches('status', status, 'TODO', 'DOING', 'REVIEW', 'DONE')
    }

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const game = await Game.findById(gameId)

        if (!game) throw new NotFoundError(`user does not have game with id ${gameId}`)

        if (game.user.toString() !== id.toString()) throw new ConflictError(`user with id ${id} does not correspond to game with id ${gameId}`)

        const update = {}

        title && (update.title = title)
        description && (update.description = description)
        status && (update.status = status)
        update.lastAccess = new Date

        await Game.updateOne({ _id: ObjectId(gameId) }, { $set: update })
    })()
}
