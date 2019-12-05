require('dotenv').config()
const { env: { DB_URL_TEST } } = process
//const { expect } = require('chai')
const addLesson = require('.')
const { random } = Math
const { database, models: { User, Team, Lesson } } = require('pyrene-ski-data')

describe('logic - add lesson', () => {
    before(() => database.connect(DB_URL_TEST))

    let userId, name, surname, email, username, password, role = "admin", date, timeStart, timeEnd, team, activity

    beforeEach(async () => {debugger
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`
        role = "admin"

        await Promise.all([User.deleteMany(), Lesson.deleteMany()])

        const user = await User.create({ name, surname, email, username, password, role })
        
        userId = user.id
        
/*      const team = await Lesson.create({ teamName, teamEmail, teamPhone, teamActivity })

        teamId = team.id  teamId,*/

        date = `date-${random()}`
        timeStart = `timeStart-${random()}`
        timeEnd = `timeEnd-${random()}`
        team = `team-${random()}`
        activity = `activity-${random()}`
    })

    it('should succeed on correct user and lesson data', async () => { 
        const lessonId = await addLesson(userId, date, timeStart, timeEnd, team, activity)

        expect(lessonId).to.exist
        expect(lessonId).to.be.a('string')
        expect(lessonId).to.have.length.greaterThan(0)

        const lesson = await Lesson.findById(lessonId)

        expect(lesson).to.exist
        expect(lesson.user.toString()).to.equal(userId)
        expect(lesson.date).to.equal(date)
        expect(lesson.timeStart).to.equal(timeStart)
        expect(lesson.timeEnd).to.equal(timeEnd)
        expect(lesson.team).to.equal(team)
        expect(lesson.activity).to.equal(activity)

    })

    after(() => Promise.all([User.deleteMany(), Lesson.deleteMany()]).then(database.disconnect)) 
})