require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveUser = require('.')
const { errors: { NotFoundError } } = require('upbeat-util')
const { database, models: { User } } = require('upbeat-data')

describe('logic - retrieve user', () => {
    before(() => database.connect(TEST_DB_URL))

    let id, username, email, password, rol, rols, longitude, latitude
    rols = ['solo','groups']

    beforeEach(async () => {

        username = `username-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        rol = rols[Math.floor(Math.random()*rols.length)]
        longitude = random()
        latitude = random()

        await User.deleteMany()

        const user = await User.create({username, email, password, rol, location: {coordinates: [latitude, longitude]}})

        id = user.id
    })

    it('should succeed on correct user id', async () => {
        const user = await retrieveUser(id)
        debugger
        expect(user).to.exist
        expect(user.id).to.equal(id)
        expect(user.id).to.be.a('string')
        expect(user._id).to.not.exist
        expect(user.username).to.equal(username)
        expect(user.username).to.be.a('string')
        expect(user.email).to.equal(email)
        expect(user.email).to.be.a('string')
        expect(user.password).to.be.undefined
        expect(user.rol).to.be.a('string')
        expect(user.location)
    
    })

    it('should fail on wrong user id', async () => {
        const id = '012345678901234567890123'

        try {
            await retrieveUser(id)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${id} not found`)
        }
    })

    // TODO other cases

    after(() => User.deleteMany().then(database.disconnect))
})
