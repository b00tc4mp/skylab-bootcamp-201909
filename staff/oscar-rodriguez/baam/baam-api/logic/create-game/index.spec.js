require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { database, models: { User, Game, Player } } = require('baam-data')
const { random } = Math
const createGame = require('.')

describe('logic - create game', () => {

    before(() => database.connect(TEST_DB_URL))

    let id

    beforeEach(async () => {
        await Promise.all([Game.deleteMany(), Player.deleteMany()])
        let name = `name-${random()}`
        let surname = `surname-${random()}`
        let email = `email-${random()}@mail.com`
        let nickname = `nickname-${random()}`
        let password = `password-${random()}`

        const user = await User.create({ name, surname, email, nickname, password })

        id = user._id.toString()
    })


    it('should create a new game with the first player', async () => {

        const gameId = await createGame(id)

        const game = await Game.findById(gameId)
        expect(game).to.exist
        expect(game.players).to.be.an.instanceOf(Array)
        expect(game.players.length).to.equal(1)
        expect(game.currentPlayer).to.be.a('number')
        expect([0, 1]).to.include(game.currentPlayer)
        
        expect(game.players[0].user.toString()).to.equal(id)

    })
    after(() => Promise.all([Game.deleteMany(), Player.deleteMany()])
        .then(database.disconnect))
})