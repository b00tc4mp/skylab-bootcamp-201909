const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL,  REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const modifyUser = require('.')
const { random } = Math
const { errors: { NotFoundError, ContentError } } = require('skillpop-util')
const { database, models: { User } } = require('skillpop-data')
const jwt = require('jsonwebtoken')
require('../../helpers/jest-matchers')
const bcrypt = require('bcryptjs')
const salt = 10

describe('logic - modify user', () => {
    beforeAll(() => database.connect(TEST_DB_URL))

    let id, name, surname, city, address, email, password
    let hash, token

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        city = 'barcelona'
        address = 'calle aribau 15'
        password = `password-${random()}`

        await User.deleteMany()

        hash = await bcrypt.hash(password, salt)
        const user = await User.create({ name, surname, city, address, email, password: hash })
        debugger
        id = user.id

        token = jwt.sign({ sub: id }, TEST_SECRET)
    })

    it('should succeed on correct modify', async () => {
        const newName = 'Paco'
        const newSurname = 'Pil'
        const newcity = 'madrid'
        debugger
        const userOr = await User.findById(id)

        const response = await modifyUser(token, newName, newSurname, newcity, address)
        debugger
        expect(response).toBeUndefined()

        const user = await User.findById(id)

        expect(user).toBeDefined()
        expect(user.name).tobe(newName)
        expect(user.surname).tobe(newSurname)
        expect(user.city).tobe(newcity)
        expect(user.address).tobe(address)

    })
    describe('when wrong id', () => {
        it('should fail on wrong id', async () => {
            const id = '012345678901234567890123'

            const token = jwt.sign({ sub: id }, TEST_SECRET)

            try {
                await modifyUser(token, name, surname, city, address)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(NotFoundError)

                const { message } = error
                expect(message).tobe(`user with id ${id} not found`)
            }
        })
        it('should fail not valid id', async () => {
            const token = '//'

            try {
                await modifyUser(token, name, surname, city, address)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(ContentError)

                const { message } = error
                expect(message).tobe(`${id} is not a valid id`)
            }
        })
    })

    it('should fail on incorrect name, surname, city or address type and content', () => {
        expect(() => modifyUser(1)).tothrow(TypeError, '1 is not a string')
        expect(() => modifyUser(true)).tothrow(TypeError, 'true is not a string')
        expect(() => modifyUser([])).tothrow(TypeError, ' is not a string')
        expect(() => modifyUser({})).tothrow(TypeError, '[object Object] is not a string')
        expect(() => modifyUser(undefined)).tothrow(TypeError, 'undefined is not a string')
        expect(() => modifyUser(null)).tothrow(TypeError, 'null is not a string')

        expect(() => modifyUser('')).tothrow(ContentError, 'token is empty or blank')
        expect(() => modifyUser(' \t\r')).tothrow(ContentError, 'token is empty or blank')

        expect(() => modifyUser(id, 1)).tothrow(TypeError, '1 is not a string')
        expect(() => modifyUser(id, true)).tothrow(TypeError, 'true is not a string')
        expect(() => modifyUser(id, [])).tothrow(TypeError, ' is not a string')
        expect(() => modifyUser(id, {})).tothrow(TypeError, '[object Object] is not a string')


        expect(() => modifyUser(id,name, 1)).tothrow(TypeError, '1 is not a string')
        expect(() => modifyUser(id,name, true)).tothrow(TypeError, 'true is not a string')
        expect(() => modifyUser(id,name, [])).tothrow(TypeError, ' is not a string')
        expect(() => modifyUser(id,name, {})).tothrow(TypeError, '[object Object] is not a string')

        expect(() => modifyUser(id,name, surname, 1)).tothrow(TypeError, '1 is not a string')
        expect(() => modifyUser(id,name, surname, true)).tothrow(TypeError, 'true is not a string')
        expect(() => modifyUser(id,name, surname, [])).tothrow(TypeError, ' is not a string')
        expect(() => modifyUser(id,name, surname, {})).tothrow(TypeError, '[object Object] is not a string')

        expect(() => modifyUser(id,name, surname, city, 1)).tothrow(TypeError, '1 is not a string')
        expect(() => modifyUser(id,name, surname, city, true)).tothrow(TypeError, 'true is not a string')
        expect(() => modifyUser(id,name, surname, city, [])).tothrow(TypeError, ' is not a string')
        expect(() => modifyUser(id,name, surname, city, {})).tothrow(TypeError, '[object Object] is not a string')


    })

    afterAll(() => User.deleteMany().then(database.disconnect))
})
