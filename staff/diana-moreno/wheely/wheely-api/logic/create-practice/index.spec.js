require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const createPractice = require('.')
const { random } = Math
const { database, models: { User, Practice, Student, Instructor, Feedback } } = require('wheely-data')
/*const moment = require('moment')
const now = moment().format('MMMM Do YYYY, h:mm:ss a')*/

describe('logic - book a practice', () => {
  before(() => database.connect(TEST_DB_URL))

  let studentId, instructorId, name, surname, email, password, role, price, status, date, practId, credits, student

  beforeEach(async () => {
    // create an student
    name = `j-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    password = `password-${random()}`
    role = 'student'

    await Promise.all([User.deleteMany(), Practice.deleteMany()])

    let student = await User.create({ name, surname, email, password, role })
    student.profile = new Student()
    student.profile.credits = 3
    credits = 3

    await student.save()
    studentId = student.id

    // create an instructor
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    password = `password-${random()}`
    role = 'instructor'

    let instructor = await User.create({ name, surname, email, password, role })
    instructor.profile = new Instructor()
    await instructor.save()
    instructorId = instructor.id

    // practice's features
    price = 1
    status = 'pending'
    date = new Date()

  })

  it('should succeed when student has credits', async () => {
    // calculate the newCredits the student should have after doing a reservation
    student = await User.findOne({ _id: studentId, role: 'student' })
    let newCredits = student.profile.credits - 1

    const practiceId = await createPractice(instructorId, studentId, date)
    expect(practiceId).to.exist
    expect(practiceId).to.be.a('string')
    expect(practiceId).to.have.length.greaterThan(0)

    const practice = await Practice.findById(practiceId)

    expect(practice).to.exist
    expect(practice.date).to.exist
    expect(practice.date).to.be.instanceOf(Date)
    expect(practice.date.getTime()).to.equal(date.getTime())
    expect(practice.status).to.equal(status)
    expect(practice.date).to.exist
    expect(practice.price).to.equal(price)
    expect(practice.instructorId.toString()).to.equal(instructorId)
    expect(practice.studentId.toString()).to.equal(studentId)
    expect(practice.feedback).to.equal(undefined)

    // retrieve the student to check how many credits he has after doing a reservation and if the practice is saved in his profile
    student = await User.findOne({ _id: studentId, role: 'student' })

    expect(student.profile.credits).to.equal(newCredits)
    expect(student.profile.practices[0]).to.equal(practiceId)

    // retrieve the instructor to check if the practice and the student has been saved in his profile
    instructor = await User.findOne({ _id: instructorId, role: 'instructor' })

    expect(instructor.profile.students[0]).to.equal(studentId)
    expect(instructor.profile.practices[0]).to.equal(practiceId)
  })

  describe('logic - when user has no credits', () => {
    beforeEach(async () => {
      // create an student
      name = `j-${random()}`
      surname = `surname-${random()}`
      email = `email-${random()}@mail.com`
      password = `password-${random()}`
      role = 'student'

      await Promise.all([User.deleteMany(), Practice.deleteMany()])

      let student = await User.create({ name, surname, email, password, role })
      student.profile = new Student()

      await student.save()
      studentId = student.id


      // create an instructor
      name = `name-${random()}`
      surname = `surname-${random()}`
      email = `email-${random()}@mail.com`
      password = `password-${random()}`
      role = 'instructor'

      let instructor = await User.create({ name, surname, email, password, role })
      instructor.profile = new Instructor()
      await instructor.save()
      instructorId = instructor.id

      // practice's features
      price = 1
      status = 'pending'
      date = new Date()

    })

    it('should fail when user has no credits available', async () => {
      try {
        await createPractice(instructorId, studentId, date)
        throw Error('should not reach this point')

      } catch (error) {
        expect(error).to.exist
        expect(error.message).to.exist
        expect(typeof error.message).to.equal('string')
        expect(error.message.length).to.be.greaterThan(0)
        expect(error.message).to.equal(`user has no credits`)
      }
    })
  })

  describe('when practice already exists', () => {
    beforeEach(async () => {
      // create an student
      name = `name-${random()}`
      surname = `surname-${random()}`
      email = `email-${random()}@mail.com`
      password = `password-${random()}`
      role = 'student'

      await Promise.all([User.deleteMany(), Practice.deleteMany()])

      const student = await User.create({ name, surname, email, password, role })
      student.profile = new Student()
      student.profile.credits = 3
      await student.save()
      studentId = student.id

      // create an instructor
      name = `name-${random()}`
      surname = `surname-${random()}`
      email = `email-${random()}@mail.com`
      password = `password-${random()}`
      role = 'instructor'

      const instructor = await User.create({ name, surname, email, password, role })
      instructor.profile = new Instructor()
      await instructor.save()
      instructorId = instructor.id

      // practice's features
      price = 1
      status = 'pending'
      date = new Date()

    })
    beforeEach(async () => {
      date = new Date("Wed, 27 July 2016 13:30:00")
/*      let reservation = await Reservation.create({ instructorId, studentId })*/
      practice = await Practice.create({ date, instructorId, studentId })

      practiceId = practice.id
    })

    it('should fail on already existing practice', async () => {
      date = new Date("Wed, 27 July 2016 13:30:00")
      // we try to create a new practice with the same data which is imposible
      try {
        let practiceSaved = await Practice.findById(practiceId)
        expect(practiceSaved).to.exist

        await createPractice(instructorId, studentId, date)
        throw Error('should not reach this point')

      } catch (error) {
        expect(error).to.exist
        expect(error.message).to.exist
        expect(typeof error.message).to.equal('string')
        expect(error.message.length).to.be.greaterThan(0)
        expect(error.message).to.equal(`practice with date ${date} already exists`)
      }
    })

  })

  after(() => Promise.all([User.deleteMany(), Practice.deleteMany()]).then(database.disconnect))
})
