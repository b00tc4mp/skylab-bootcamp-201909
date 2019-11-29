const { validate, errors: { NotFoundError, ContentError, ConflictError, CantAttackError } } = require('baam-util')
const { ObjectId, models: { Card, Game, Shoot } } = require('baam-data')

module.exports = function (gameId, playerId, cardId) {

    validate.string(gameId)
    validate.string.notVoid('id', gameId)
    if (!ObjectId.isValid(gameId)) throw new ContentError(`${gameId} is not a valid id`)
    gameId = ObjectId(gameId)

    validate.string(playerId)
    validate.string.notVoid('id', playerId)
    if (!ObjectId.isValid(playerId)) throw new ContentError(`${playerId} is not a valid id`)
    playerId = ObjectId(playerId)

    validate.string(cardId)
    validate.string.notVoid('id', cardId)
    if (!ObjectId.isValid(cardId)) throw new ContentError(`${cardId} is not a valid id`)
    cardId = ObjectId(cardId)

    return (async () => {

        const game = await Game.findById(gameId)
        if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

        const { currentPlayer } = game
        const enemy = (currentPlayer + 1) % 2

        let { hand, tempZone, discards, lifePoints, attack } = game.players[currentPlayer]

        const handIndex = hand.findIndex(cardId.toString())
        if (handIndex < 0) throw new ConflictError(`${playerId} doesn't own the card ${cardId} on his hand`)

        const card = await Card.findById(cardId).lean()
        if (!card) throw new NotFoundError(`card with id ${cardId} not found`)

        const { effectValue, effect } = card

        if (playerId.toString() !== id.toString())
            throw new CredentialsError(`Is not the ${playerId} turn. Can't play the card`)

        await Shoot.create({ userId: playerId, cardId, date: new Date })
        hand.splice(handIndex, 1)

        switch (effect) {
            case 'DEFEND': game.players[currentPlayer].defense = effectValue; break;
            case 'HEAL': lifePoints += effectValue; break;
            case 'BLOCK':
                if (duration > 0) discards.push(tempZone.card)
                tempZone.card = cardId
                tempZone.duration = effectValue
                game.players[enemy].attack = 0
                break;
            case 'ATTACK':
                if (attack <= 0) throw new CantAttackError(`you are blocked and can't attack`)

                if ((effectValue - game.players[enemy].defense) > 0)
                    game.players[enemy].lifePoints -= (effectValue - game.players[enemy].defense)
                else game.players[enemy].defense -= effectValue

                if (game.players[enemy] === 0) {
                    game.status = 'END'
                    game.winner = currentPlayer
                    await game.save()
                    return
                }
                break;
            default: throw new Error(`WTF?! can't recognize the card effect`)
            // 'DISCARD', 'TIEF', 'SHOW', 'RECOVER' could be more programable accions to do
        }

        const { duration } = tempZone
        if (duration > 0) {
            duration--
            if (duration === 0) {
                discards.push(tempZone.card)
                tempZone.card = null
            }
        }

        //END OF TURN
        if (hand.length === 0) {
            game.status = 'END'
            if (lifePoints > game.players[enemy].lifePoints) game.winner = currentPlayer
            else if (lifePoints < game.players[enemy].lifePoints) game.winner = enemy
            else game.winner = -1
        }
        else currentPlayer = (currentPlayer + 1) % 2

        await Game.save()
    })()
}