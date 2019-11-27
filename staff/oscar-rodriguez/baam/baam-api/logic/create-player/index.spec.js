require ('dotenv').config()
const { env: { TEST_DB_URL: TEST_DB_URL } } = process
const { expect } = require('chai')
const createPlayer = require ('.')
const { random } = Math
const { errors: { NotFoundError, ContentError } } = require('../../../baam-util')
const { database, ObjectId, models: { User, Player } } = require('../../../baam-data')


describe('logic - create player', () => {

    before (() => database.connect(TEST_DB_URL))

    let id, name

    beforeEach(async () => {
        await Promise.all([User.deleteMany(), Player.deleteMany()])
        await User.deleteMany()

        name = `name-${random()}`
        let surname = `surname-${random()}`
        let email = `email-${random()}@mail.com`
        let nickname = `nickname-${random()}`
        let password = `password-${random()}`

        const user = await User.create({ name, surname, email, nickname, password })

        id = user.id.toString()
    })

    it ('should create a new player', async () => {
        
        const playerId = await createPlayer(id)

        const player = await Player.findById(playerId).lean()

        const user = await User.findById(player.user)

        expect(player).to.exist
        expect(player.user.toString()).to.equal(id)
        expect(player.lifePoints).to.equal(5)
        expect(player.modifier).to.equal(false)
        expect(player.attack).to.equal(1)
        expect(player.defense).to.equal(0)
        
        expect(user.name).to.equal(name)

    })

    it ('should fail when a non-existing user', async () => {
        const id = ObjectId().toString()
        try {
            await createPlayer (id)
            throw new Error ('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal('user not found')
        }
    })

    it("should fail on invalid id", () =>
        expect(() => createPlayer('wrong').to.throw(ContentError, `wrong id: wrong must be a string of 12 length`))
    )

    it('should fail on incorrect type and content', () => {
        expect(() => createPlayer(1)).to.throw(TypeError, '1 is not a string')
        expect(() => createPlayer(true)).to.throw(TypeError, 'true is not a string')
        expect(() => createPlayer([])).to.throw(TypeError, ' is not a string')
        expect(() => createPlayer({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => createPlayer(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => createPlayer(null)).to.throw(TypeError, 'null is not a string')

        expect(() => createPlayer('')).to.throw(ContentError, 'id is empty or blank')
        expect(() => createPlayer(' \t\r')).to.throw(ContentError, 'id is empty or blank')
    })

    after(() => Promise.all([User.deleteMany(), Player.deleteMany()])
        .then(database.disconnect))
})