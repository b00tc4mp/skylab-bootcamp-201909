const TEST_DB_URL = process.env.REACT_APP_TEST_DB_URL
const TEST_SECRET = process.env.REACT_APP_TEST_SECRET
const { random, floor } = Math
const retrieveGame = require('.')
const { errors: { NotFoundError, ContentError } } = require('baam-util')
const { ObjectId, database, models: { User, Game , Player} } = require('baam-data')
const jwt = require('jsonwebtoken')

describe('logic - retrieve game', () => {

    beforeAll(() => database.connect(TEST_DB_URL))

    let gameId, token, userId, playerId

    beforeEach(async () => {
        await Promise.all([Game.deleteMany()])

        let name = `name-${random()}`
        let surname = `surname-${random()}`
        let email = `email-${random()}@mail.com`
        let nickname = `nickname-${random()}`
        let password = `password-${random()}`

        const user = await User.create({ name, surname, email, nickname, password })

        userId = user.id

        token = jwt.sign({sub: userId}, TEST_SECRET)

        const newPlayer1 = new Player({
            user: user._id,
            lifePoints: 5,
            hand: [ObjectId().toString(),ObjectId().toString()],
            tempZone: {card: ObjectId().toString(), duration: random()},
            discards: [ObjectId().toString(),ObjectId().toString()],
            modifier: false,
            attack: 1,
            defense: 0,
            lastAccess: new Date()
        })
        playerId = newPlayer1.id
        const newPlayer2 = new Player({
            user: ObjectId(),
            lifePoints: 5,
            hand: [ObjectId().toString(),ObjectId().toString()],
            tempZone: null,
            discards: [ObjectId().toString(),ObjectId().toString()],
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
        gameId = game.id

    })

    it('should return the game status on valid userId, which is in the game', async () => {
        const game = await retrieveGame(gameId, token)

        expect(game).toBeDefined()
        expect(game.id).toBe(gameId)
        expect(game.players[0]).toMatchObject({id: playerId})

        expect(game.shoots).toBeInstanceOf(Array)
        expect(typeof game.currentPlayer).toBe('number')
        expect([0,1]).toContain(game.currentPlayer)

    })

    it('should fail on valid playerId, which is NOT in the game', async () => {
        const wrong = ObjectId().toString()

        const badToken = jwt.sign ({sub:wrong}, TEST_SECRET)

        try {
            await retrieveGame(gameId, badToken)
            throw Error('should not reach this poing')
        } catch (error) {
            expect(error).toBeDefined()
            expect(error.message).toBe(`${wrong} can't get info from a game where is not joined`)
        }
    })

    it('should fail on wrong game id', async () => {
        const wrong = '012345678901234567890123'

        try {
            await retrieveGame(wrong, token)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(NotFoundError)
            expect(error.message).toBe(`game with id ${wrong} not found`)
        }
    })

    it('should fail on incorrect type and content', () => {
        expect(() => retrieveGame(1)).toThrow(TypeError, '1 is not a string')
        expect(() => retrieveGame(true)).toThrow(TypeError, 'true is not a string')
        expect(() => retrieveGame([])).toThrow(TypeError, ' is not a string')
        expect(() => retrieveGame({})).toThrow(TypeError, '[object Object] is not a string')
        expect(() => retrieveGame(undefined)).toThrow(TypeError, 'undefined is not a string')
        expect(() => retrieveGame(null)).toThrow(TypeError, 'null is not a string')
        

        expect(() => retrieveGame('')).toThrow(ContentError, 'gameId is empty or blank')
        expect(() => retrieveGame(' \t\r')).toThrow(ContentError, 'gameId is empty or blank')

        expect(() => retrieveGame(gameId, 1)).toThrow(TypeError, '1 is not a string')
        expect(() => retrieveGame(gameId, true)).toThrow(TypeError, 'true is not a string')
        expect(() => retrieveGame(gameId, [])).toThrow(TypeError, ' is not a string')
        expect(() => retrieveGame(gameId, {})).toThrow(TypeError, '[object Object] is not a string')
        expect(() => retrieveGame(gameId, undefined)).toThrow(TypeError, 'undefined is not a string')
        expect(() => retrieveGame(gameId, null)).toThrow(TypeError, 'null is not a string')
        

        expect(() => retrieveGame(gameId, '')).toThrow(ContentError, 'playerId is empty or blank')
        expect(() => retrieveGame(gameId, ' \t\r')).toThrow(ContentError, 'playerId is empty or blank')
    })
    afterAll(() => Promise.all([User.deleteMany(), Game.deleteMany()]).then(database.disconnect))
})