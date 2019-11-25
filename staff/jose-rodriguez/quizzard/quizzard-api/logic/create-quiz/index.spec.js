require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const createQuiz = require('.')
const { random } = Math
const { database, models: { User, Quiz } } = require('quizzard-data')

describe.only('logic - create quiz', () => {
    before(() => database.connect(DB_URL_TEST))

    let id, name, surname, email, username, password, title, description

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([User.deleteMany(), Quiz.deleteMany()])

        const user = await User.create({ name, surname, email, username, password })

        id = user.id

        title = `title-${random()}`
    })

    it('should succeed on correct user and quiz data', async () => {
        const quizId = await createQuiz(id, title)

        expect(quizId).to.exist
        expect(quizId).to.be.a('string')
        expect(quizId).to.have.length.greaterThan(0)

        const quiz = await Quiz.findById(quizId)

        expect(quiz).to.exist
        expect(quiz.user.toString()).to.equal(id)
        expect(quiz.title).to.equal(title)
        expect(quiz.pincode).to.exist
        expect(quiz.pincode).to.be.a('number')
        expect(quiz.rungame).to.equal(false)
        expect(quiz.players).to.exist
        expect(quiz.players).to.be.instanceOf(Array)
        expect(quiz.questions).to.exist
        expect(quiz.questions).to.be.instanceOf(Array)
        
    })



    after(() => Promise.all([User.deleteMany(), Quiz.deleteMany()]).then(database.disconnect))
})