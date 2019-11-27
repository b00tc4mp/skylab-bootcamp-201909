require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { ObjectId, database, models: { User, Game, Player } } = require('baam-data')
const { random, floor } = Math
const createGame = require('.')

describe.only('logic - create game', () => {

    before(() => database.connect(TEST_DB_URL))

    let players = []
    let users = []

    let player1, player2

    beforeEach(async () => {
        await Promise.all([Game.deleteMany(), Player.deleteMany()])
        for (let i = 0; i < 5; i++) {

            let name = `name-${random()}`
            let surname = `surname-${random()}`
            let email = `email-${random()}@mail.com`
            let nickname = `nickname-${random()}`
            let password = `password-${random()}`

            let user = await User.create({ name, surname, email, nickname, password })

            users.push(user)

            let newPlayer = {
                user: user.id.toString(),
                lifePoints: 5,
                hand: [],
                tempZone: null,
                discards: [],
                modifier: false,
                attack: 1,
                defense: 0
            }

            let player = await Player.create(newPlayer)

            players.push(player)
        }


        player1 = floor(random() * 5)
        player2 = floor(random() * 5)
        while (player1 === player2) player2 = floor(random() * 5)
        users = [users[player1].nickname, users[player2].nickname]
        player1 = players[player1]._id.toString()
        player2 = players[player2]._id.toString()
    })


    it('should create a game with two valid players', async () => {

        const gameId = await createGame(player1, player2)

        const game = await Game.findById(gameId)
        expect(game).to.exist
        expect(game.players).to.be.an.instanceOf(Array)
        expect(game.players.length).to.equal(2)
        expect(game.players[0]._id.toString()).to.equal(player1)
        expect(game.players[1]._id.toString()).to.equal(player2)
        expect(game.currentPlayer).to.be.a('number')
        expect([0, 1]).to.include(game.currentPlayer)

        expect(game.players[0].user.nickname).to.exist
        expect(game.players[0].user.nickname).to.equal(users[0].nickname)

        expect(game.players[1].user.nickname).to.exist
        expect(game.players[1].user.nickname).to.equal(users[1].nickname)
    })
    after(() => Promise.all([Game.deleteMany(), Player.deleteMany()])
        .then(database.disconnect))
})