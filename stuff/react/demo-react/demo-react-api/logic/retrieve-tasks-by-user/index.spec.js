require('dotenv').config()
const { env : { DB_URL_TEST} } = process
const { expect } = require('chai')
const bcrypt = require('bcryptjs')
const { database , models : { Task , User } } = require('data')
const { formatDate , random : { boolean } } = require('utils')
const retrieveTasksByUser = require('.')

describe("logic - retrieve tasks by user" , ()=>{

    before( ()=> database.connect(DB_URL_TEST))
    
    let category1 , category2 , category3  
    
    let taskId1 , taskId2 , taskId3
    
    let currentDate

    let description1 , status1
    let description2 , status2
    let description3 , status3 

    let username , email , password , userId

    beforeEach( async ()=> {
        category1 = `category1-${Math.random()}`
        category2 = `category2-${Math.random()}`
        category3 = `category3-${Math.random()}`

        description1 = `description1-${Math.random()}`
        description2 = `description2-${Math.random()}`
        description3 = `description3-${Math.random()}`
        description4 = `description4-${Math.random()}`
        description5 = `description5-${Math.random()}`
        description6 = `description6-${Math.random()}`
        description7 = `description7-${Math.random()}`
        description8 = `description8-${Math.random()}`
        description9 = `description9-${Math.random()}`

        status1 = boolean()
        status2 = boolean()
        status3 = boolean()
        status4 = boolean()
        status5 = boolean()
        status6 = boolean()
        status7 = boolean()
        status8 = boolean()
        status9 = boolean()
        
        currentDate = formatDate(new Date())

        username = `username-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        
        await User.deleteMany()
        await Task.deleteMany()

        const user = await User.create({ username , email , password : await bcrypt.hash(password,10) })
        userId = user.id

        const task1 = await Task.create({ category : category1 , description : description1 , status : status1 , date : currentDate , owner : userId})
        taskId1 = task1.id

        const task2 = await Task.create({ category : category1 , description : description2 , status : status2 , date : currentDate , owner : userId})
        taskId2 = task2.id

        const task3 = await Task.create({ category : category1 , description : description3 , status : status3 , date : currentDate , owner : userId})
        taskId3 = task3.id

        const task4 = await Task.create({ category : category2 , description : description4 , status : status4 , date : currentDate , owner : userId})
        taskId4 = task4.id

        const task5 = await Task.create({ category : category2 , description : description5 , status : status5 , date : currentDate , owner : userId})
        taskId5 = task5.id

        const task6 = await Task.create({ category : category2 , description : description6 , status : status6 , date : currentDate , owner : userId})
        taskId6 = task6.id

        const task7 = await Task.create({ category : category3 , description : description7 , status : status7 , date : currentDate , owner : userId})
        taskId7 = task7.id

        const task8 = await Task.create({ category : category3 , description : description8 , status : status8 , date : currentDate , owner : userId})
        taskId8 = task8.id

        const task9 = await Task.create({ category : category3 , description : description9 , status : status9 , date : currentDate , owner : userId})
        taskId9 = task9.id
    })

    it("should succeed on correct data" , async()=>{
        const retrievedTasks = await retrieveTasksByUser(userId)
        expect(retrievedTasks).to.exist

        expect(retrievedTasks[0].id).to.equal(taskId1)
        expect(retrievedTasks[0].category).to.equal(category1)
        expect(retrievedTasks[0].description).to.equal(description1)
        expect(retrievedTasks[0].status).to.equal(status1)
        expect(retrievedTasks[0].date).to.equal(currentDate)
        
        expect(retrievedTasks[1].id).to.equal(taskId2)
        expect(retrievedTasks[1].category).to.equal(category1)
        expect(retrievedTasks[1].description).to.equal(description2)
        expect(retrievedTasks[1].status).to.equal(status2)
        expect(retrievedTasks[1].date).to.equal(currentDate)
        
        expect(retrievedTasks[2].id).to.equal(taskId3)
        expect(retrievedTasks[2].category).to.equal(category1)
        expect(retrievedTasks[2].description).to.equal(description3)
        expect(retrievedTasks[2].status).to.equal(status3)
        expect(retrievedTasks[2].date).to.equal(currentDate)

        expect(retrievedTasks[3].id).to.equal(taskId4)
        expect(retrievedTasks[3].category).to.equal(category2)
        expect(retrievedTasks[3].description).to.equal(description4)
        expect(retrievedTasks[3].status).to.equal(status4)
        expect(retrievedTasks[3].date).to.equal(currentDate)
        
        expect(retrievedTasks[4].id).to.equal(taskId5)
        expect(retrievedTasks[4].category).to.equal(category2)
        expect(retrievedTasks[4].description).to.equal(description5)
        expect(retrievedTasks[4].status).to.equal(status5)
        expect(retrievedTasks[4].date).to.equal(currentDate)
        
        expect(retrievedTasks[5].id).to.equal(taskId6)
        expect(retrievedTasks[5].category).to.equal(category2)
        expect(retrievedTasks[5].description).to.equal(description6)
        expect(retrievedTasks[5].status).to.equal(status6)
        expect(retrievedTasks[5].date).to.equal(currentDate)

        expect(retrievedTasks[6].id).to.equal(taskId7)
        expect(retrievedTasks[6].category).to.equal(category3)
        expect(retrievedTasks[6].description).to.equal(description7)
        expect(retrievedTasks[6].status).to.equal(status7)
        expect(retrievedTasks[6].date).to.equal(currentDate)
        
        expect(retrievedTasks[7].id).to.equal(taskId8)
        expect(retrievedTasks[7].category).to.equal(category3)
        expect(retrievedTasks[7].description).to.equal(description8)
        expect(retrievedTasks[7].status).to.equal(status8)
        expect(retrievedTasks[7].date).to.equal(currentDate)
        
        expect(retrievedTasks[8].id).to.equal(taskId9)
        expect(retrievedTasks[8].category).to.equal(category3)
        expect(retrievedTasks[8].description).to.equal(description9)
        expect(retrievedTasks[8].status).to.equal(status9)
        expect(retrievedTasks[8].date).to.equal(currentDate)
    })

    it("should fail on unexisting user" , async()=>{
        userId = "5d93b2a49c43b325d860835b"
        try{
            await retrieveTasksByUser( userId)
        }catch({ message }){
            expect(message).to.equal("user does not exist")
        }
    })

    it('should fail on empty user', () => 
        expect(() => retrieveTasksByUser("")).to.throw('user id is empty or blank')
    )

    after(database.disconnect())
})