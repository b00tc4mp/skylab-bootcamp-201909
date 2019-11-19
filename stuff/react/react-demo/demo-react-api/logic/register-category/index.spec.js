require('dotenv').config()
const { env : { DB_URL_TEST } } = process
const { expect } = require('chai')
const bcrypt = require('bcryptjs')
const { database , models : { Category , User } } = require('data')
const registerCategory = require('.')

describe('logic - register category' , ()=>{
    before( () => database.connect(DB_URL_TEST))

    let userId

    beforeEach(async ()=>{
        category = `category-${Math.random()}`

        username = `username-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        await Category.deleteMany()
        await User.deleteMany()

        const user = await User.create({username , email , password : await bcrypt.hash(password,10)})
        userId = user.id
    })

    it('should succeed on correct data' , async ()=>{
        
        await registerCategory(category , userId)
        const retrievedCategory = await Category.findOne({ $and : [{ name : category } , { owner : userId }]})
        
        expect(retrievedCategory.name).to.equal(category)
        expect(retrievedCategory.owner.toString()).to.equal(userId)
        expect(retrievedCategory.tasks).to.exist
        expect(retrievedCategory.tasks.length).to.equal(0)
    })

    it('should fail on unexisting user' , async()=>{
        userId = '5d5d5530531d455f75da9fF9'
        try{
            await registerCategory(category , userId)
        }catch({ message }){
            expect(message).to.equal("user doesn't exist")
        }
    })

    it('should fail on already existing category for current user' , async()=>{
        await Category.create({ name : category , owner : userId })
        try{
            await registerCategory(category , userId)
        }catch({ message }){
            expect(message).to.equal('category already exists')
        }
    })

    it('should fail on empty category', () => 
        expect(() => registerCategory("" , userId)).to.throw('category is empty or blank')
    )

    it('should fail on empty user id', () => 
        expect(() => registerCategory(category , "")).to.throw('user id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => registerCategory(category , 123)).to.throw('user id with value 123 is not a string')
    )

    after(database.disconnect())
})
