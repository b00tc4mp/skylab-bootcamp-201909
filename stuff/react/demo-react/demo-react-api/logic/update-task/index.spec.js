require('dotenv').config()
const { env : { DB_URL_TEST } } = process
const { database , models : { Task , User} } = require('data')
const { formatDate , random : { boolean } } = require('utils')
const { expect } = require ('chai')
const bcrypt = require('bcryptjs')
const updateTask = require('.')

describe("logic - update task" , ()=>{
    before(()=> database.connect(DB_URL_TEST))
    
    let category , description , status , currentDate , taskId
    let username , email , password , userId
    let body

    beforeEach(async ()=>{
        category = `category-${Math.random()}`
        description = `description-${Math.random()}`
        status = boolean()
        currentDate = formatDate(new Date())

        username = `username-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        body =  {
            category: `description-${Math.random()}`,
            description: `description-${Math.random()}`,
            status: boolean()
        }
        
        await User.deleteMany()
        await Task.deleteMany()

        const user = await User.create({ username , email , password : await bcrypt.hash(password,10) })
        userId = user.id

        const task = await Task.create({ category , description , status , date : currentDate , owner : userId })
        taskId = task.id
    })

    it("should succeed on correct data" , async ()=>{
        await updateTask(taskId , body)

        const task = await Task.findById(taskId)
        expect(task.category).to.equal(body.category)
        expect(task.description).to.equal(body.description)
        expect(task.status).to.equal(body.status)
        expect(task.date).to.equal(currentDate)
        expect(task.owner.toString()).to.equal(userId)
    })

    it("should fail on unexisting task" , async()=>{
        taskId = '5d5d5530531d455f75da9fF9'
        try{
            await updateTask(taskId , body)
        }catch({ message }){
            expect(message).to.equal("task does not exist")
        }
    })

    it('should fail on empty task id', () => 
        expect(() => updateTask("" , body)).to.throw('task id is empty or blank')
    )
    
    it('should fail on wrong task id type', () => 
        expect(() => updateTask(123 , body)).to.throw('task id with value 123 is not a string'))
})
