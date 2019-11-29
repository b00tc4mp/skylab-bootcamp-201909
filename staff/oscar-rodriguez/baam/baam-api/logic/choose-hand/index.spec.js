require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random, floor } = Math
const chooseHand = require('.')
const { errors: { NotFoundError, ContentError, ConflictError } } = require('baam-util')
const { ObjectId, database, models: { Card, User, Game , Player} } = require('baam-data')

describe('logic - choose hand', () => {
    before(() => database.connect(TEST_DB_URL))

    let userId, gameId, hand = [], cards = []

    let description, image, price, col, effect, effectValue, target, name

    beforeEach(async () => {
        await Promise.all([Game.deleteMany(), Card.deleteMany(), User.deleteMany()])
        hand = [], cards = []

        for (let i = 0; i < 10; i++) {
            name = `name-${random()}`
            description = `description-${random()}`
            image = `image-${random()}`
            price = random()
            col = ObjectId().toString()
            effect = `effect-${random()}`
            effectValue = random()
            target = `target-${random()}`
            
            
            const card = await Card.create({ name, description, image, price, col, effect, effectValue, target })
            
            cards.push(card._id)
            i < 5 && hand.push(card.id)
        }
        
        name = `name-${random()}`
        let surname = `surname-${random()}`
        let email = `email-${random()}@mail.com`
        let nickname = `nickname-${random()}`
        let password = `password-${random()}`

        const user = await User.create({ name, surname, email, nickname, password, cards })

        userId = user.id
        cards.forEach(card=>{
            card.id = card._id
            delete card._id
        })

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

        gameId = game.id
    })

    it("should update player's hand with the selected cards", async()=>{
        await chooseHand(gameId, userId, hand)

        const game = await Game.findById(gameId).lean()
        expect (game).to.exist

        expect (game.players[0].hand.length).to.equal(5)
        game.players[0].hand.forEach(card=>
            expect(hand).to.include(card.toString())
        )
    })

    it("should fail when hand size is diferent thant 5 cards", async()=> {
        const wrongHand = hand.slice(0,3)

        try {
            await chooseHand(gameId, userId, wrongHand)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(ConflictError)
            expect(error.message).to.equal(`hand must have 5 cards to play`)
        }
    })

    it('should fail on wrong game id', async () => {
        const game = '012345678901234567890123'

        try {
            await chooseHand(game, userId, hand)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`game with id ${game} not found`)
        }
    })

    it('should fail on wrong user id', async () => {
        const user = '012345678901234567890123'

        try {
            await chooseHand(gameId, user, hand)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${user} not found`)
        }
    })

    it('should fail on incorrect type and content', () => {
        expect(() => chooseHand(1)).to.throw(TypeError, '1 is not a string')
        expect(() => chooseHand(true)).to.throw(TypeError, 'true is not a string')
        expect(() => chooseHand([])).to.throw(TypeError, ' is not a string')
        expect(() => chooseHand({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => chooseHand(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => chooseHand(null)).to.throw(TypeError, 'null is not a string')

        expect(() => chooseHand('')).to.throw(ContentError, 'id is empty or blank')
        expect(() => chooseHand(' \t\r')).to.throw(ContentError, 'id is empty or blank')

        expect(() => chooseHand(gameId,1)).to.throw(TypeError, '1 is not a string')
        expect(() => chooseHand(gameId,true)).to.throw(TypeError, 'true is not a string')
        expect(() => chooseHand(gameId,[])).to.throw(TypeError, ' is not a string')
        expect(() => chooseHand(gameId,{})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => chooseHand(gameId,undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => chooseHand(gameId,null)).to.throw(TypeError, 'null is not a string')

        expect(() => chooseHand(gameId,'')).to.throw(ContentError, 'id is empty or blank')
        expect(() => chooseHand(gameId,' \t\r')).to.throw(ContentError, 'id is empty or blank')

        expect(() => chooseHand(gameId, userId, 1)).to.throw(TypeError, '1 is not a Array')
        expect(() => chooseHand(gameId, userId, true)).to.throw(TypeError, 'true is not a Array')
        expect(() => chooseHand(gameId, userId, 'as')).to.throw(TypeError, ' is not a Array')
        expect(() => chooseHand(gameId, userId, {})).to.throw(TypeError, '[object Object] is not a Array')
        expect(() => chooseHand(gameId, userId, undefined)).to.throw(TypeError, 'undefined is not a Array')
        expect(() => chooseHand(gameId, userId, null)).to.throw(TypeError, 'null is not a Array')
    })

    after (()=> Promise.all([User.deleteMany(), Game.deleteMany(), Player.deleteMany()])
        .then (database.disconnect))
})