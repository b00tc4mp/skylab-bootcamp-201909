require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const chai = require('chai')
const { expect } = chai
const chaiSubset = require('chai-subset')
chai.use(chaiSubset)
const { random, floor } = Math
const retrieveGame = require('.')
const { errors: { NotFoundError, ContentError } } = require('baam-util')
const { ObjectId, database, models: { User, Game , Player} } = require('baam-data')

describe('logic - retrieve game', () => {

    before(() => database.connect(TEST_DB_URL))

    let userId, gameId, playerId

    beforeEach(async () => {
        await Promise.all([Game.deleteMany()])

        let name = `name-${random()}`
        let surname = `surname-${random()}`
        let email = `email-${random()}@mail.com`
        let nickname = `nickname-${random()}`
        let password = `password-${random()}`

        const user = await User.create({ name, surname, email, nickname, password })

        userId = user.id

        const newPlayer1 = new Player({
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

        const newPlayer2 = new Player({
            user: ObjectId(),
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
            players: [newPlayer1, newPlayer2],
            shots: [],
            currentPlayer: floor(random() * 2)
        }

        const game = await Game.create(newGame)
        playerId = game.players[0].id
        gameId = game.id

    })

    it('should return the game status on valid userId, which is in the game', async () => {
        const game = await retrieveGame(gameId, playerId)

        expect(game).to.exist
        expect(game.id).to.equal(gameId)
        expect(game.players).to.containSubset([{id: playerId}])

        expect(game.shoots).to.be.an.instanceOf(Array)
        expect(game.currentPlayer).to.be.a('number')
        expect([0,1]).to.include(game.currentPlayer)

    })

    it('should fail on valid playerId, which is NOT in the game', async () => {
        const wrong = ObjectId().toString()
        try {
            await retrieveGame(gameId, wrong)
            throw Error('should not reach this poing')
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`${wrong} can't get info from a game where is not joined`)
        }
    })

    it('should fail on wrong game id', async () => {
        const wrong = '012345678901234567890123'

        try {
            await retrieveGame(wrong, playerId)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`game with id ${wrong} not found`)
        }
    })

    it('should fail on incorrect type and content', () => {
        expect(() => retrieveGame(1)).to.throw(TypeError, '1 is not a string')
        expect(() => retrieveGame(true)).to.throw(TypeError, 'true is not a string')
        expect(() => retrieveGame([])).to.throw(TypeError, ' is not a string')
        expect(() => retrieveGame({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => retrieveGame(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => retrieveGame(null)).to.throw(TypeError, 'null is not a string')

        expect(() => retrieveGame('')).to.throw(ContentError, 'gameId is empty or blank')
        expect(() => retrieveGame(' \t\r')).to.throw(ContentError, 'gameId is empty or blank')

        expect(() => retrieveGame(gameId, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => retrieveGame(gameId, true)).to.throw(TypeError, 'true is not a string')
        expect(() => retrieveGame(gameId, [])).to.throw(TypeError, ' is not a string')
        expect(() => retrieveGame(gameId, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => retrieveGame(gameId, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => retrieveGame(gameId, null)).to.throw(TypeError, 'null is not a string')

        expect(() => retrieveGame(gameId, '')).to.throw(ContentError, 'playerId is empty or blank')
        expect(() => retrieveGame(gameId, ' \t\r')).to.throw(ContentError, 'playerId is empty or blank')
    })
    after(() => Promise.all([User.deleteMany(), Game.deleteMany()]).then(database.disconnect))
})