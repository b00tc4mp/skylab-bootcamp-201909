const {expect } = require ('chai')
require ('dotenv').config()
const { env: { TEST_DB_URL }} = process
const { ObjectId, database, models: {User, Game, Player}} = require ('baam-data')
const { random , floor } = Math
const joinGame = require('.')


describe ('logic - join game', () => {
    before (()=> database.connect(TEST_DB_URL))

    let userId, gameId, nickname, player1

    beforeEach(async ()=>{

        await Promise.all([User.deleteMany(), Game.deleteMany()])

        let name = `name-${random()}`
        let surname = `name-${random()}`
        let email = `name-${random()}@mail.com`
        nickname = `name-${random()}`
        let password = `name-${random()}`

        const user = await User.create ({name, surname, email, nickname, password})

        userId = user.id

        player1 = await User.create ({name: `**-${random()}`, surname: `**-${random()}`, email: `**-${random()}`, nickname: `**-${random()}`, password: `**-${random()}`})

        player1 = player1.id

        const newPlayer = new Player ({
            user: player1,
            lifePoints: 5,
            hand: [],
            tempZone: null,
            discards: [],
            modifier: false,
            attack: 1,
            defense: 0
        })

        const newGame = {
            players: [newPlayer],
            shots: [],
            currentPlayer: floor(random() * 2)
        }

        const game = await Game.create(newGame)

        gameId = game.id
    })


    it ('should add the player into the especified game', async ()=> {
        await joinGame(userId, gameId)

        const game = await Game.findById(gameId)
        expect (game.id).to.equal(gameId)
        expect (game.players.length).to.equal(2)
        expect (game.players[1]).to.exist
        expect (game.players[1].user.toString()).to.equal(userId)
    })

    it('should fail when trying to ad same player two times', async()=>{
        
        try {
            await joinGame(player1, gameId)
            throw new Error ('shouldnt reach this point')
        } catch (error) {
            expect (error).to.exist
            expect (error.message).to.equal("can't join same user 2 times")
        }

    })
    after (()=> Promise.all([User.deleteMany(), Game.deleteMany()])
        .then (database.disconnect))
})