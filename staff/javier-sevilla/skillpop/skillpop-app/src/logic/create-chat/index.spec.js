const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET  } } = process
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const createChat = require('.')
const { random } = Math
const { errors: { ContentError, NotFoundError } } = require('skillpop-util')
const { ObjectId, database, models: { User, Chat } } = require('skillpop-data')
const bcrypt = require('bcryptjs')
const salt = 10

describe('logic - create chat', () => {
    beforeAll(() => database.connect(TEST_DB_URL))

    let name, surname, city, address, email, password
    let hash, token, id1, id2

    beforeEach(async() => {

        await Promise.all([User.deleteMany(), Chat.deleteMany()]) 

        name = `name-${random()}`
        surname = `surname-${random()}`     
        city = 'barcelona'
        address = 'calle aribau 15'
        email = `email-${random()}@mail.com`
        password = `password-${random()}`       

        hash = await bcrypt.hash(password, salt)

        const user1 = await User.create({ name, surname, city, address, email, password: hash })
        id1 = user1.id

        name = `name-${random()}`
        surname = `surname-${random()}`     
        city = 'barcelona'
        address = 'calle aribau 15'
        email = `email-${random()}@mail.com`
        password = `password-${random()}`

        hash = await bcrypt.hash(password, salt)

        const user2 = await User.create({ name, surname, city, address, email, password: hash })
        id2 = user2.id

    })

    it('should succeed on correct user id', async() => {
        const chatId = await createChat(id1, id2)

        expect(chatId).toBeDefined()
        expect(chatId).toBe('string')

        const chat = await Chat.findById(chatId)

        expect(chat.users.includes(id1)).to.be.true
        expect(chat.users.includes(id2)).to.be.true

        const chatId2 = await createChat(id1, id2)

        expect(chatId2).toBeDefined()
        expect(chatId2).toBe('string')
        expect(chatId2).toBe(chatId)

    })

    it('should fail on wrong user id', async() => {

        const fakeId = ObjectId().toString()
        try {
            const chatId = await createChat(fakeId, id2)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(NotFoundError)
            expect(error.message).toBe(`user with id ${fakeId} not found`)
        }
    })

    it('should fail on wrong user id', async() => {

        const fakeId = ObjectId().toString()
        try {
            const chatId = await createChat(id1, fakeId)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(NotFoundError)
            expect(error.message).toBe(`user with id ${fakeId} not found`)
        }
    })


    it('should fail on incorrect name, surname, email, password, or expression type and content', () => {

        const fakeId = 'sadf'


        expect(() => createChat(1)).toThrow(TypeError, '1 is not a string')
        expect(() => createChat(true)).toThrow(TypeError, 'true is not a string')
        expect(() => createChat([])).toThrow(TypeError, ' is not a string')
        expect(() => createChat({})).toThrow(TypeError, '[object Object] is not a string')
        expect(() => createChat(undefined)).toThrow(TypeError, 'undefined is not a string')
        expect(() => createChat(null)).toThrow(TypeError, 'null is not a string')

        expect(() => createChat('')).toThrow(ContentError, 'userId1 is empty or blank')
        expect(() => createChat(' \t\r')).toThrow(ContentError, 'userId1 is empty or blank')
        expect(() => createChat(fakeId)).toThrow(ContentError, `${fakeId} is not a valid id`)



        expect(() => createChat(id1, 1)).toThrow(TypeError, '1 is not a string')
        expect(() => createChat(id1, true)).toThrow(TypeError, 'true is not a string')
        expect(() => createChat(id1, [])).toThrow(TypeError, ' is not a string')
        expect(() => createChat(id1, {})).toThrow(TypeError, '[object Object] is not a string')
        expect(() => createChat(id1, undefined)).toThrow(TypeError, 'undefined is not a string')
        expect(() => createChat(id1, null)).toThrow(TypeError, 'null is not a string')

        expect(() => createChat(id1, '')).toThrow(ContentError, 'userId2 is empty or blank')
        expect(() => createChat(id1, ' \t\r')).toThrow(ContentError, 'userId2 is empty or blank')
        expect(() => createChat(id1, fakeId)).toThrow(ContentError, `${fakeId} is not a valid id`)

    })


    afterAll(() => Promise.all([User.deleteMany(), Chat.deleteMany()]).then(database.disconnect))
})