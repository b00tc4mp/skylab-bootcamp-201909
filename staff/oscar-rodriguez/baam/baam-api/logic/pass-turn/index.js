const { validate, errors: { NotFoundError, ContentError, CredentialsError } } = require('baam-util')
const { ObjectId, models: { Game} } = require('baam-data')

module.exports = function (gameId, userId) {

    validate.string(gameId)
    validate.string.notVoid('id', gameId)
    if (!ObjectId.isValid(gameId)) throw new ContentError(`${gameId} is not a valid id`)
    gameId = ObjectId(gameId)

    validate.string(userId)
    validate.string.notVoid('id', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)
    userId = ObjectId(userId)

    return (async () => {
        const game = await Game.findById(gameId)
        if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

        const { currentPlayer } = game

        if (userId.toString() !== game.players[currentPlayer].user.toString())
            throw new CredentialsError(`Is not the ${userId} turn. Can't play the card`)
        
        game.players[currentPlayer].lifePoints--

        game.currentPlayer = (game.currentPlayer + 1) % 2

        await game.save()
        return game.currentPlayer
    })()
}