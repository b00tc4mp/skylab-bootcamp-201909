const { validate, errors: { NotFoundError, ContentError, ConflictError } } = require('baam-util')
const { ObjectId, models: { Game } } = require('baam-data')

module.exports = function (gameId, playerId) {
    validate.string(gameId)
    validate.string.notVoid('gameId', gameId)
    if (!ObjectId.isValid(gameId)) throw new ContentError(`${gameId} is not a valid id`)

    validate.string(playerId)
    validate.string.notVoid('playerId', playerId)
    if (!ObjectId.isValid(playerId)) throw new ContentError(`${playerId} is not a valid id`)

    return (async () => {
        const game = await Game.findById(gameId, { '__v': 0 }).lean()
        if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

        if (!game.players.find(player => player._id.toString() === playerId.toString())) throw new ConflictError(`${playerId} can't get info from a game where is not joined`)

        game.players.forEach(player => {
            
            const { hand, tempZone, discards } = player

            player.id = player._id.toString()
            delete player._id

            delete player.user

            hand.forEach(card => {
                card.id = card._id.toString()
                delete card._id
            })

            if (tempZone.card) player.tempZone.card = player.tempZone.card.toString()
            discards.forEach(card => {
                card.id = card._id.toString()
                delete card._id
            })
        })
        game.id = game._id.toString()
        delete game._id

        return game
    })()
}