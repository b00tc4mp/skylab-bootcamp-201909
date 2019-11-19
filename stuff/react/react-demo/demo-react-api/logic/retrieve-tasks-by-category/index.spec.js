require('dotenv').config()
const { env : { DB_URL_TEST} } = process
const { expect } = require('chai')
const bcrypt = require('bcryptjs')
const { database , models : { Category , Task , User } } = require('data')
const { formatDate , random : { boolean } } = require('utils')
const retrieveTasksByCategory = require('.')

describe.only("logic - retrieve tasks by category" , ()=>{

    before(()=> database.connect(DB_URL_TEST))
    
    let categoryId

    let description1 , status1
    let description2 , status2
    let description3 , status3 

    let username , email , password , userId

    beforeEach( async ()=> {
        name = `category-${Math.random()}`

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
        
        const task1 = await new Task({ description : description1 , status : status1 , date : currentDate})
        const task2 = await new Task({ description : description2 , status : status2 , date : currentDate})
        const task3 = await new Task({ description : description3 , status : status3 , date : currentDate})
        
        const category = await new Category({ name , owner : userId , tasks : [] })
        categoryId = category.id
        
        category.tasks.push(task1)
        category.tasks.push(task2)
        category.tasks.push(task3)
        
        await category.save()
    })

    it("should succeed on correct data" , async()=>{
        const retrievedTasks = await retrieveTasksByCategory(categoryId)
        expect(retrievedTasks).to.exist

        expect(retrievedTasks[0].description).to.equal(description1)
        expect(retrievedTasks[0].status).to.equal(status1)
        expect(retrievedTasks[0].date).to.equal(currentDate)
        
        expect(retrievedTasks[1].description).to.equal(description2)
        expect(retrievedTasks[1].status).to.equal(status2)
        expect(retrievedTasks[1].date).to.equal(currentDate)
        
        expect(retrievedTasks[2].description).to.equal(description3)
        expect(retrievedTasks[2].status).to.equal(status3)
        expect(retrievedTasks[2].date).to.equal(currentDate)
    })

    it("should fail on unexisting user" , async()=>{
        categoryId = "5d93b2a49c43b325d860835b"
        try{
            await retrieveTasksByCategory(categoryId)
        }catch({ message }){
            expect(message).to.equal("category does not exist")
        }
    })

    it('should fail on empty category', () => 
        expect(() => retrieveTasksByCategory("")).to.throw('category id is empty or blank')
    )

    after(database.disconnect())
})