const { validate, errors: { ContentError, NotFoundError } } = require('baam-util')
const { ObjectId, models: { User, Player, Game } } = require('baam-data')
const { random, floor } = Math

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`wrong id: ${id} must be a string of 12 length`)
    id = ObjectId(id)

    return (async () => {

        const user = await User.findById(id)
        if (!user) throw new NotFoundError('user not found')

        const newPlayer = new Player ({
            user: user._id,
            lifePoints: 5,
            hand: [],
            tempZone: null,
            discards: [],
            modifier: false,
            attack: 1,
            defense: 0,
            lastAccess: new Date()
        })

        const newGame = {
            players: [newPlayer],
            shots: [],
            currentPlayer: floor(random() * 2)
        }

        const game = await Game.create(newGame)
        return game._id.toString()
    })()
}