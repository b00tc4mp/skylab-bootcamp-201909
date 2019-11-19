require('dotenv').config()
const { env : { DB_URL_TEST } } = process
const { expect } = require('chai')
const { database , models : { Category , User , Task} } = require('data')
const { formatDate , random : { boolean } } = require('utils')
const bcrypt = require('bcryptjs')
const retrieveCategory = require('.')

describe('logic - retreive category' , ()=>{
    before(()=> database.connect(DB_URL_TEST))

    let categoryId , userId

    beforeEach(async ()=>{
        name = `category-${Math.random()}`

        username = `username-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        description = `description-${Math.random()}`
        status = boolean()
        date = formatDate(new Date())
        
        await Category.deleteMany()
        await User.deleteMany()

        const user = await User.create({ username , email , password : await bcrypt.hash(password,10)})
        userId = user.id

        const task = await new Task({ description , status ,date })

        const category = await new Category({ name , owner : userId })
        categoryId = category.id
        category.tasks.push(task)
        await category.save()
    })
    
    it('should succeed on correct data' , async ()=>{
        const retrievedCategory = await retrieveCategory(categoryId)

        expect(retrievedCategory.id).to.equal(categoryId)
        expect(retrievedCategory.name).to.equal(name)
        expect(retrievedCategory.owner.toString()).to.equal(userId)
        expect(retrievedCategory.tasks).to.exist
        expect(retrievedCategory.tasks.length).to.equal(1)
        expect(retrievedCategory.tasks[0].description).to.equal(description)
        expect(retrievedCategory.tasks[0].status).to.equal(status)
        expect(retrievedCategory.tasks[0].date).to.equal(date)
    })

    it('should fail on unexsiting category' , async()=>{
        categoryId = '5d5d5530531d455f75da9fF9'
        try{
            await retrieveCategory(categoryId)
        }catch({ message }){
            expect(message).to.equal('category does not exist')
        }
    })

    it('should fail on empty category id', () => 
        expect(() => retrieveCategory("")).to.throw('category id is empty or blank')
    )
    
    it('should fail on wrong cagtegory id type', () => 
        expect(() => retrieveCategory(123)).to.throw('category id with value 123 is not a string')
    )

    after(database.disconnect())
})