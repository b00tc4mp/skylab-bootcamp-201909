const { validate, errors: { NotFoundError, ContentError, ConflictError } } = require('baam-util')
const { ObjectId, models: { Card , Game} } = require('baam-data')

module.exports = function (gameId, userId, hand) {
    validate.string(gameId)
    validate.string.notVoid('id', gameId)
    if (!ObjectId.isValid(gameId)) throw new ContentError(`${gameId} is not a valid id`)
    gameId = ObjectId(gameId)

    validate.string(userId)
    validate.string.notVoid('id', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)
    userId = ObjectId(userId)

    validate.array(hand)
    if (hand.length !== 5) throw new ConflictError('hand must have 5 cards to play')
    hand.forEach(card => {
        if (!ObjectId.isValid(card)) throw new ConflictError('hand must have 5 cards to play')
    })

    return (async () => {

        const cards = await Card.find({'_id' : { $in : hand}}).lean()
        if (cards.length !== 5) throw new ConflictError('hand must have 5 cards to play')
        
        const game = await Game.findById(gameId)
        if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

        player = game.players.find(player => player.user.toString() === userId.toString())
        if (!player) throw new NotFoundError(`user with id ${userId} not found`)
        player.hand = hand.slice()

        await game.save()
    })()
}