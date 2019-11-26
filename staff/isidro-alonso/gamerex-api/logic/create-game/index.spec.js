const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const createTask = require('.')
const { random } = Math
const { database, models: { User, Game } } = require('gamerex-data')
const jwt = require('jsonwebtoken')
require('../../helpers/jest-matchers')

describe('logic - create game', () => {
    beforeAll(() => database.connect(TEST_DB_URL))

    let id, token, username, location, email, password

    beforeEach(async () => {
        username = `username-${random()}`
        location = `location-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`

        await Promise.all([User.deleteMany(), Task.deleteMany()])

        const user = await User.create({ username, location, email, password })

        id = user.id
        token = jwt.sign({ sub: id }, TEST_SECRET)

        title = `title-${random()}`
        description = `description-${random()}`
    })

    it('should succeed on correct user and game data', async () => {
        const taskId = await createTask(token, title, description)

        expect(taskId).toBeDefined()
        expect(taskId).toBeOfType('string')
        expect(taskId).toHaveLengthGreaterThan(0)

        const task = await Task.findById(taskId)

        expect(task).toBeDefined()
        expect(task.user.toString()).toBe(id)
        expect(task.title).toBe(title)
        expect(task.description).toBe(description)
        expect(task.status).toBe('TODO')
        expect(task.date).toBeDefined()
        expect(task.date).toBeInstanceOf(Date)
    })

    //afterAll(() => Promise.all([User.deleteMany(), Task.deleteMany()]).then(database.disconnect))
})
