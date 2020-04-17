const { ObjectId, models: { User, Game, Comment } } = require('gamerex-data')
const { validate, errors: { ContentError, NotFoundError } } = require('gamerex-util')

module.exports = function (gameId) {
    validate.string(gameId)
    validate.string.notVoid('game id', gameId)

    return (async () => {

        const game = await Game.findById(gameId)

        if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

        const comments = await Comment.find().lean()

        if (!comments) return ''

        return comments

    })()
}