const { validate, errors: { ContentError, NotFoundError, ConflictError } } = require('baam-util')
const { ObjectId, models: { User, Player, Game } } = require('baam-data')
const { random, floor } = Math
const mongoose = require('mongoose')

module.exports = function (userId, gameId) {
    validate.string(userId)
    validate.string.notVoid('id', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`wrong id: ${userId} must be a string of 12 length`)
    userId = ObjectId(userId)

    validate.string(gameId)
    validate.string.notVoid('id', gameId)
    if (!ObjectId.isValid(gameId)) throw new ContentError(`wrong id: ${gameId} must be a string of 12 length`)
    gameId = ObjectId(gameId)

    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw new NotFoundError('user not found')

        const game = await Game.findById(gameId)
        if (!game) throw new NotFoundError('game not found')

        if (game.players[0].user.toString() === userId.toString()) throw new ConflictError ("can't join same user 2 times")
        const newPlayer = new Player ({
            user: user._id,
            lifePoints: 5,
            hand: [],
            tempZone: null,
            discards: [],
            modifier: false,
            attack: 1,
            defense: 0,
            lastAccess: new Date
        })

        game.players.push(newPlayer)
        await game.save()
    })()
}