require('dotenv').config()
const { env : { DB_URL_TEST} } = process
const { expect } = require ('chai')
const bcrypt = require('bcryptjs')
const { database , models : { Category , User } } = require('data')
const { formatDate } = require('utils')
const registerTask = require('.')

describe("logic - register task" , ()=>{

    before( ()=> database.connect(DB_URL_TEST))

    let description , currentDate
    let username , email , password , userId , categoryId
    
    beforeEach( async ()=> {
        name = `category-${Math.random()}`

        description = `description-${Math.random()}`

        username = `username-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        
        await User.deleteMany()
        await Category.deleteMany()

        const user = await User.create({ username , email , password : await bcrypt.hash(password,10) })
        userId = user.id

        const category = await Category.create({ name , owner : userId , tasks : [] })
        categoryId = category.id
    })


    it('should succeed on correct data ' , async ()=>{
        await registerTask(categoryId , description)

        const retrievedCategory = await Category.findById(categoryId)

        expect(retrievedCategory).to.exist
        expect(retrievedCategory.name).to.equal(name)
        expect(retrievedCategory.owner.toString()).to.equal(userId)
        expect(retrievedCategory.tasks.length).to.equal(1)
        expect(retrievedCategory.tasks[0].description).to.equal(description)
        expect(retrievedCategory.tasks[0].status).to.equal(false)
        expect(retrievedCategory.tasks[0].date).to.equal(formatDate(new Date()))
    })

    it("should fail on unexisting category" , async () => {
        categoryId = '5d5d5530531d455f75da9fF9'
        try{
            await registerTask(categoryId , description)
        }catch({ message }){
            expect(message).to.equal(`category does not exist`)
        }
    })

    it('should fail on empty category' , () =>
        expect(() => registerTask("" , description)).to.throw('category is empty or blank')
    )

    it('should fail on empty task' , () =>
        expect(() => registerTask(categoryId , "")).to.throw('task is empty or blank')
    )

    after(database.disconnect())
})

