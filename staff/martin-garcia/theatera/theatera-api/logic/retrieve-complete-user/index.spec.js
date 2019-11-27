require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveSummaryUser = require('.')
const { errors: { NotFoundError } } = require('theatera-util')
const { database, models: { User } } = require('theatera-data')

describe('logic - retrieve-summary-user', () => {
    before(() => database.connect(TEST_DB_URL))

    let id, name, email, password, rol, img, introduction, city, description, skills, experience

    beforeEach(async() => {
        name = `name-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        random() > 0.5 ? rol = 'COMPANY' : rol = 'PERSON'
        introduction = `introduction-${random()}`
        description = `description-${random()}`
        description = description.slice(0, 140)
        city = `city-${random()}`
        skills

        await User.deleteMany()

        if (rol === 'PERSON') {
            const user = await User.create({ name, email, password, rol, introduction })

            id = user.id
        }

        const user = await User.create({ name, email, password, rol, introduction })

        id = user.id
    })

    it('should succeed on correct user id', async() => {
        const user = await retrieveSummaryUser(id)
        let _introduction
        introduction.length > 20 ? _introduction = introduction.slice(0, 20) + '...' : _introduction = introduction


        expect(user).to.exist
        expect(user.id).to.equal(id)
        expect(user.id).to.be.a('string')
        expect(user._id).to.not.exist
        expect(user.name).to.equal(name)
        expect(user.name).to.be.a('string')
        expect(user.password).to.be.undefined
        expect(user.introduction).to.equal(_introduction)
        expect(user.introduction).to.be.a('string')

        debugger

        /* img test? */

    })

    it('should fail on wrong user id', async() => {
        const id = '012345678901234567890123'

        try {
            await retrieveSummaryUser(id)

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