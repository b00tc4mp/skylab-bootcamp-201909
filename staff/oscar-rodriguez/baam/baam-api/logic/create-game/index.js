const { validate, errors: { ContentError, NotFoundError } } = require('baam-util')
const { ObjectId, models: { User, Player, Game } } = require('baam-data')
const { random, floor } = Math

module.exports = function (player1, player2) {
    validate.string(player1)
    validate.string.notVoid('player1', player1)
    if (!ObjectId.isValid(player1)) throw new ContentError(`wrong id: ${player1} must be a string of 12 length`)
    player1 = ObjectId(player1)

    validate.string(player2)
    validate.string.notVoid('player2', player2)
    if (!ObjectId.isValid(player2)) throw new ContentError(`wrong id: ${player2} must be a string of 12 length`)
    player2 = ObjectId(player2)

    return (async () => {

        let found1 = await Player.findById(player1).populate('user', 'nickname')
        if (!found1) throw new NotFoundError(`invalid player: ${player1} not found`)
        let found2 = await Player.findById(player2).populate('user', 'nickname')
        if (!found2) throw new NotFoundError(`invalid player: ${player2} not found`)

        const newGame = {
            players: [found1, found2],
            shots: [],
            currentPlayer: floor(random() * 2)
        }

        const game = await Game.create(newGame)
        return game._id.toString()
    })()
}