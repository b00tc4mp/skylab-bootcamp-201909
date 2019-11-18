require('dotenv').config()
const { env : { DB_URL_TEST } } = process
const bcrypt = require('bcryptjs')
const { expect } = require('chai')
const { database , models : { Task , User } } = require('data')
const { formatDate , random : { boolean } } = require('utils') 
const deleteTask = require('.')

describe("logic - delete task" , ()=>{
    before( ()=> database.connect(DB_URL_TEST))

    let userId , taskId

    beforeEach( async ()=>{

        category = `category-${Math.random()}`
        description = `description-${Math.random()}`
        status = boolean()
        currentDate = formatDate(new Date())

        username = `username-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        
        await User.deleteMany()
        await Task.deleteMany()

        const user = await User.create({ username , email , password : await bcrypt.hash(password,10) })
        userId = user.id

        const task = await Task.create({ category , description , status , date : currentDate , owner : userId})
        taskId = task.id

    })

    it("should succeed on correct data" , async ()=> {
        const result = await deleteTask(taskId)
        expect(result).not.to.exist

        const task = await Task.findById(taskId)
        expect(task).not.to.exist
    })

    it("should fail on unexisting task" , async ()=>{
        taskId= '5d5d5530531d455f75da9fF9'
        
        try{
            await deleteTask(taskId)
        }catch({ message }){
            expect(message).to.equal("task does not exist")
        }
    })

    it('should fail on empty task id', () => 
        expect(() => deleteTask("")).to.throw('task id is empty or blank')
    )
    
    it('should fail on wrong task id type', () => 
        expect(() => deleteTask(123)).to.throw('task id with value 123 is not a string'))
    
    after(database.disconnect())
})