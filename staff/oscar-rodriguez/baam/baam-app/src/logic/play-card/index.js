const { validate, errors: { NotFoundError, ContentError, ConflictError, CantAttackError, CredentialsError } } = require('baam-util')
const { ObjectId, models: { Card, Game, Shoot } } = require('baam-data')

module.exports = function (gameId, userId, cardId) {

    validate.string(gameId)
    validate.string.notVoid('id', gameId)
    if (!ObjectId.isValid(gameId)) throw new ContentError(`${gameId} is not a valid id`)
    gameId = ObjectId(gameId)

    validate.string(userId)
    validate.string.notVoid('id', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)
    userId = ObjectId(userId)

    validate.string(cardId)
    validate.string.notVoid('id', cardId)
    if (!ObjectId.isValid(cardId)) throw new ContentError(`${cardId} is not a valid id`)
    cardId = ObjectId(cardId)

    return (async () => {

        const game = await Game.findById(gameId)
        if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

        const { currentPlayer } = game
        const enemy = (currentPlayer + 1) % 2

        if (userId.toString() !== game.players[currentPlayer].user.toString())
            throw new CredentialsError(`Is not the ${userId} turn. Can't play the card`)

        const handIndex = game.players[currentPlayer].hand.findIndex(({ _id }) => _id.toString() === cardId.toString())
        if (handIndex < 0) throw new ConflictError(`${userId} doesn't own the card ${cardId} on his hand`)

        const card = await Card.findById(cardId).lean()
        if (!card) throw new NotFoundError(`card with id ${cardId} not found`)

        const { effectValue, effect } = card

        await Shoot.create({ userId, cardId, date: new Date })
        game.players[currentPlayer].hand.splice(handIndex, 1)

        switch (effect) {
            case 'DEFEND':
                game.players[currentPlayer].defense = effectValue
                break
            case 'HEAL':
                game.players[currentPlayer].lifePoints += effectValue
                break
            case 'BLOCK':
                if (game.players[currentPlayer].tempZone.duration >= 0) game.players[currentPlayer].discards.push(game.players[currentPlayer].tempZone.card)

                game.players[currentPlayer].tempZone.card = cardId
                game.players[currentPlayer].tempZone.duration = effectValue
                game.players[enemy].attack = 0
                break
            case 'ATTACK':
                if (!game.players[currentPlayer].attack) throw new CantAttackError(`you are blocked and can't attack`)
                const attackPoints = (effectValue - game.players[enemy].defense)
                if (attackPoints > 0)
                    game.players[enemy].lifePoints -= attackPoints
                else game.players[enemy].defense -= effectValue

                if (!game.players[enemy].lifePoints) {
                    game.status = 'END'
                    game.winner = currentPlayer
                    await game.save()
                    return
                }
                break
            default: throw new Error(`WTF?! can't recognize the card effect`)
            // 'DISCARD', 'TIEF', 'SHOW', 'RECOVER' could be more programable accions to do
        }

        const { duration } = game.players[currentPlayer].tempZone

        if (duration > 0 && effect != 'BLOCK') {
            game.players[currentPlayer].tempZone.duration--
            if (!game.players[currentPlayer].tempZone.duration) {
                game.players[currentPlayer].discards.push(game.players[currentPlayer].tempZone.card)
                game.players[currentPlayer].tempZone.card = null
                game.players[currentPlayer].tempZone.duration = -1

            }
        }

        //END OF TURN
        if (!game.players[currentPlayer].hand.length) {
            game.status = 'END'
            if (game.players[currentPlayer].lifePoints > game.players[enemy].lifePoints) game.winner = currentPlayer
            else if (game.players[currentPlayer].lifePoints < game.players[enemy].lifePoints) game.winner = enemy
            else game.winner = -1
        }
        else
            game.currentPlayer = (game.currentPlayer + 1) % 2

        await game.save()
        return game.players[currentPlayer].currentPlayer
    })()
}