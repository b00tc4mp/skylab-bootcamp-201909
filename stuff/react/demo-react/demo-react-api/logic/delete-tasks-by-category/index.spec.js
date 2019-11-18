require('dotenv').config()
const { env : { DB_URL_TEST} } = process
const { expect } = require('chai')
const bcrypt = require('bcryptjs')
const { database , models : { Task , User } } = require('data')
const { formatDate , random : { boolean } } = require('utils')
const deleteTasksByCategory = require('.')

describe("logic - delete tasks by category" , ()=>{

    before( ()=> database.connect(DB_URL_TEST))
    
    let category ,  currentDate , taskId1 , taskId2 , taskId3

    let description1 , status1
    let description2 , status2
    let description3 , status3 

    let username , email , password , userId

    beforeEach( async ()=> {
        category = `category-${Math.random()}`

        description1 = `description1-${Math.random()}`
        description2 = `description2-${Math.random()}`
        description3 = `description3-${Math.random()}`

        status1 = boolean()
        status2 = boolean()
        status3 = boolean()
        
        currentDate = formatDate(new Date())

        username = `username-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        
        await User.deleteMany()
        await Task.deleteMany()

        const user = await User.create({ username , email , password : await bcrypt.hash(password,10) })
        userId = user.id

        const task1 = await Task.create({ category , description : description1 , status : status1 , date : currentDate , owner : userId})
        taskId1 = task1.id

        const task2 = await Task.create({ category , description : description2 , status : status2 , date : currentDate , owner : userId})
        taskId2 = task2.id

        const task3 = await Task.create({ category , description : description3 , status : status3 , date : currentDate , owner : userId})
        taskId3 = task3.id
    })

    it("should succeed on correct data" , async()=>{
        const result = await deleteTasksByCategory(userId , category)
        expect(result.n).to.equal(3)
        expect(result.ok).to.equal(1)
    })

    it("should fail on unexisting user" , async()=>{
        userId = "5d93b2a49c43b325d860835b"
        try{
            await deleteTasksByCategory( userId , category)
        }catch({ message }){
            expect(message).to.equal("user does not exist")
        }
    })

    it("should fail on unexisting category" , async()=>{
        category = `category-${Math.random()}`
        try{
            await deleteTasksByCategory( userId , category)
        }catch({ message }){
            expect(message).to.equal("category does not exist")
        }
    })

    it('should fail on empty task category', () => 
        expect(() => deleteTasksByCategory(userId , "")).to.throw('category is empty or blank')
    )

    after(database.disconnect())
})