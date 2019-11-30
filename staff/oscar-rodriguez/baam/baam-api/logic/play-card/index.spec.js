require('dotenv').config()
const { env: { TEST_DB_URL, HAND_LENGTH, INITIAL_PLAYER_LIFE } } = process
const chai = require('chai')
const { expect } = chai
const chaiSubset = require('chai-subset')
chai.use(chaiSubset)
const { random, floor } = Math
const playCard = require('.')
const { errors: { NotFoundError, ContentError, CantAttackError, CredentialsError, ConflictError } } = require('baam-util')
const { ObjectId, database, models: { Card, User, Game, Player } } = require('baam-data')

describe('logic - play card', () => {

    before(() => database.connect(TEST_DB_URL))

    let playerId, gameId, cardId

    beforeEach(async () => {

        await Promise.all([Card.deleteMany(), Game.deleteMany(), User.deleteMany(), Player.deleteMany()])

        let cards = [], hand = []

        /****** CREATE CARDS */
        for (let i = 0; i < 9; i++) {
            let name = `name-${random()}`
            let description = `description-${random()}`
            let image = `image-${random()}`
            let price = random()
            let col = ObjectId().toString()
            let effect = `effect-${random()}`
            let effectValue = random()
            let target = `target-${random()}`

            let card = await Card.create({ name, description, image, price, col, effect, effectValue, target })

            cards.push(card._id)
            cardId = card.id
            i < 4 && hand.push(card.id)
        }

        //****** CREATE USER  */

        let name = `name-${random()}`
        let surname = `surname-${random()}`
        let email = `email-${random()}@mail.com`
        let nickname = `nickname-${random()}`
        let password = `password-${random()}`

        const user = await User.create({ name, surname, email, nickname, password, cards })
        //****** CREATE PLAYERS AND GAME */
        const newPlayer1 = new Player({
            user: user._id,
            lifePoints: parseInt(INITIAL_PLAYER_LIFE),
            hand,
            tempZone: null,
            discards: [],
            modifier: false,
            attack: 1,
            defense: 0,
            lastAccess: new Date()
        })

        playerId = newPlayer1.id

        const newPlayer2 = new Player({
            user: ObjectId(),
            lifePoints: parseInt(INITIAL_PLAYER_LIFE),
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
            currentPlayer: 0
        }

        const game = await Game.create(newGame)

        gameId = game.id
    })

    it('should succed on DEFEND card play', async () => {
        let name = `Defend 2`
        let description = `description-${random()}`
        let image = `image-${random()}`
        let price = random()
        let col = ObjectId().toString()
        let effect = `DEFEND`
        let effectValue = 2
        let target = `target-${random()}`

        const card = await Card.create({ name, description, image, price, col, effect, effectValue, target })
        await card.save()
        const game = await Game.findById(gameId)
        
        game.players[0].hand.push(card.id)
        await game.save()

        await playCard(gameId, playerId, card.id)

        const testGame = await Game.findById(gameId)
        expect(testGame).to.exist
        const [_player] = testGame.players
        expect(_player.defense).to.equal(2)
        expect(_player.hand.length).to.equal(4)

        expect(testGame.currentPlayer).to.equal(1)
    })

    it('should succed on ATTACK card play', async () => {
        let name = `Attack 2`
        let description = `description-${random()}`
        let image = `image-${random()}`
        let price = random()
        let col = ObjectId().toString()
        let effect = `ATTACK`
        let effectValue = 2
        let target = `target-${random()}`

        const card = await Card.create({ name, description, image, price, col, effect, effectValue, target })
        await card.save()
        const game = await Game.findById(gameId)
        
        game.players[0].hand.push(card.id)
        await game.save()

        await playCard(gameId, playerId, card.id)

        const testGame = await Game.findById(gameId)
        expect(testGame).to.exist
        const [_player1,_player2] = testGame.players
        expect(_player2.lifePoints).to.equal(3)
        expect(_player1.hand.length).to.equal(4)

        expect(testGame.currentPlayer).to.equal(1)
    })

    it('should succed on HEAL card play', async () => {
        let name = `Health 2`
        let description = `description-${random()}`
        let image = `image-${random()}`
        let price = random()
        let col = ObjectId().toString()
        let effect = `HEAL`
        let effectValue = 2
        let target = `target-${random()}`

        const card = await Card.create({ name, description, image, price, col, effect, effectValue, target })
        await card.save()
        const game = await Game.findById(gameId)
        
        game.players[0].hand.push(card.id)
        await game.save()

        await playCard(gameId, playerId, card.id)

        const testGame = await Game.findById(gameId)
        expect(testGame).to.exist
        const [_player1] = testGame.players
        expect(_player1.lifePoints).to.equal(7)
        expect(_player1.hand.length).to.equal(4)

        expect(testGame.currentPlayer).to.equal(1)
    })

    it('should succed on BLOCK card play', async () => {
        let name = `Block 2`
        let description = `description-${random()}`
        let image = `image-${random()}`
        let price = random()
        let col = ObjectId().toString()
        let effect = `BLOCK`
        let effectValue = 2
        let target = `target-${random()}`

        const card = await Card.create({ name, description, image, price, col, effect, effectValue, target })
        await card.save()
        const game = await Game.findById(gameId)
        
        game.players[0].hand.push(card.id)
        await game.save()

        await playCard(gameId, playerId, card.id)

        const testGame = await Game.findById(gameId)
        expect(testGame).to.exist

        const [_player1,_player2] = testGame.players

        expect(_player1.tempZone.card).to.exist
        expect(_player1.tempZone.duration).to.equal(2)
        expect(_player2.attack).to.equal(0)

        expect(testGame.currentPlayer).to.equal(1)
    })

    it('should fail on ATTACK when player is BLOCKED', async () => {
        let name = `Attack 2`
        let description = `description-${random()}`
        let image = `image-${random()}`
        let price = random()
        let col = ObjectId().toString()
        let effect = `ATTACK`
        let effectValue = 2
        let target = `target-${random()}`

        const card = await Card.create({ name, description, image, price, col, effect, effectValue, target })
        await card.save()
        const game = await Game.findById(gameId)
        
        game.players[0].hand.push(card.id)
        game.players[0].attack = 0
        await game.save()

        try {
            await playCard(gameId, playerId, card.id)
            throw Error ('should not reach this point')
        } catch(error) {
            expect (error).to.exist
            expect(error).to.be.an.instanceOf(CantAttackError)
            expect (error.message).to.equal(`you are blocked and can't attack`)
        }
    })

    it('should fail on wrong game id', async () => {
        const game = '012345678901234567890123'

        try {
            await playCard(game, playerId, cardId)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`game with id ${game} not found`)
        }
    })

    it('should fail on wrong player id', async () => {
        const player = '012345678901234567890123'

        try {
            await playCard(gameId, player, cardId)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(CredentialsError)
            expect(error.message).to.equal(`Is not the ${player} turn. Can't play the card`)
        }
    })

    it('should fail on wrong card id', async () => {
        const card = '012345678901234567890123'

        try {
            await playCard(gameId, playerId, card)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(ConflictError)
            expect(error.message).to.equal(`${playerId} doesn't own the card ${card} on his hand`)
        }
    })

    it('should fail on incorrect type and content', () => {
        expect(() => playCard(1)).to.throw(TypeError, '1 is not a string')
        expect(() => playCard(true)).to.throw(TypeError, 'true is not a string')
        expect(() => playCard([])).to.throw(TypeError, ' is not a string')
        expect(() => playCard({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => playCard(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => playCard(null)).to.throw(TypeError, 'null is not a string')

        expect(() => playCard('')).to.throw(ContentError, 'id is empty or blank')
        expect(() => playCard(' \t\r')).to.throw(ContentError, 'id is empty or blank')

        expect(() => playCard(gameId,1)).to.throw(TypeError, '1 is not a string')
        expect(() => playCard(gameId,true)).to.throw(TypeError, 'true is not a string')
        expect(() => playCard(gameId,[])).to.throw(TypeError, ' is not a string')
        expect(() => playCard(gameId,{})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => playCard(gameId,undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => playCard(gameId,null)).to.throw(TypeError, 'null is not a string')

        expect(() => playCard(gameId,'')).to.throw(ContentError, 'id is empty or blank')
        expect(() => playCard(gameId,' \t\r')).to.throw(ContentError, 'id is empty or blank')

        expect(() => playCard(gameId, playerId, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => playCard(gameId, playerId, true)).to.throw(TypeError, 'true is not a string')
        expect(() => playCard(gameId, playerId, [])).to.throw(TypeError, ' is not a string')
        expect(() => playCard(gameId, playerId, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => playCard(gameId, playerId, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => playCard(gameId, playerId, null)).to.throw(TypeError, 'null is not a string')

        expect(() => playCard(gameId, playerId, '')).to.throw(ContentError, 'id is empty or blank')
        expect(() => playCard(gameId, playerId, ' \t\r')).to.throw(ContentError, 'id is empty or blank')
    })

    after(() => Promise.all([Card.deleteMany(), User.deleteMany(), Game.deleteMany(), Player.deleteMany()])
        .then(database.disconnect))
})