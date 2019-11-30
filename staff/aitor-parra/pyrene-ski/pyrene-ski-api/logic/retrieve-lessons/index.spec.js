require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const retrieveLessons = require('.')
const { random } = Math
const { database, ObjectId, models: { User, Lesson } } = require('pyrene-ski-data')

describe('logic - retrieve lessons', () => {
    before(() => database.connect(DB_URL_TEST))

    let id, name, surname, email, username, password, role, lessonIds, dates, timeStarts, timeEnds

    beforeEach(async () => { 
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`
        role = 'admin'

        await Promise.all([User.deleteMany(), Lesson.deleteMany()])

        const user = await User.create({ name, surname, email, username, password, role })

        id = user.id

        lessonIds = []
        dates = []
        timeStarts = []
        timeEnds = []
 
        const insertions = []

        for (let i = 0; i < 10; i++) {
            const lesson = {
                user: id,
                date: `date-${random()}`,
                timeStart: `timeStart-${random()}`,
                timeEnd: `timeEnd-${random()}`
            }

            insertions.push(Lesson.create(lesson).then(lesson => lessonIds.push(lesson.id)))

            dates.push(lesson.date)
            timeStarts.push(lesson.timeStart)
            timeEnds.push(lesson.timeEnd)
        }

        for (let i = 0; i < 10; i++)
            insertions.push(Lesson.create({
                user: ObjectId(),
                date: `date-${random()}`,
                timeStart: `timeStart-${random()}`,
                timeEnd: `timeEnd-${random()}`
            }))

        await Promise.all(insertions)
  
    })

    it('should succeed on correct user and lesson data', async () => {
        const lessons = await retrieveLessons(id)

        expect(lessons).to.exist
        expect(lessons).to.have.lengthOf(20)

        lessons.forEach(lesson => {
            expect(lesson.id).to.exist
            expect(lesson.id).to.be.a('string')
            expect(lesson.id).to.have.length.greaterThan(0)
            //expect(lesson.id).be.oneOf(lessonIds)

            expect(lesson.user).to.equal(id)

            expect(lesson.date).to.exist
            expect(lesson.date).to.be.a('string')
            expect(lesson.date).to.have.length.greaterThan(0)
            //expect(lesson.date).be.oneOf(dates)

            expect(lesson.timeStart).to.exist
            expect(lesson.timeStart).to.be.a('string')
            expect(lesson.timeStart).to.have.length.greaterThan(0)
            //expect(lesson.timeStart).be.oneOf(timeStart)

            expect(lesson.timeEnd).to.exist
            expect(lesson.timeEnd).to.be.a('string')
            //expect(lesson.timeEnd).to.have.length.greaterThan(0)
            //expect(lesson.timeEnd).be.oneOf(timeEnds)
        })
    })
            after(() => Promise.all([User.deleteMany(), Lesson.deleteMany()]).then(database.disconnect))

})