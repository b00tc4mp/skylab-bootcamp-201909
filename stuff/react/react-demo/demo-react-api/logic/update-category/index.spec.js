require('dotenv').config()
const { env : { DB_URL_TEST } } = process
const { expect } = require('chai')
const bcrypt = require('bcryptjs')
const { database , models : { Category , User , Task} } = require('data')
const { formatDate , random : { boolean } } = require('utils')
const updateCategory = require('.')

describe('logic - update category' , ()=>{
    before( ()=> database.connect(DB_URL_TEST))

    let categoryId , userId

    beforeEach(async ()=>{
        name = `category-${Math.random()}`
        updateName = `updateCategory-${Math.random()}`
        
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

    it('should succeed on correct data' , async()=>{
        await updateCategory(categoryId , updateName)

        const retrievedCategory = await Category.findById(categoryId)
        expect(retrievedCategory.name).to.equal(updateName)
    })

    it('should fail on unexisting category' , async ()=>{
        categoryId = '5d5d5530531d455f75da9fF9'
        try{
            await updateCategory(categoryId , updateName)
        }catch({ message }){
            expect(message).to.equal('category does not exist')
        }
    })
    
    it('should fail on empty category id', () => 
        expect(() => updateCategory("" , updateName)).to.throw('category id is empty or blank')
    )
    
    it('should fail on empty name', () => 
        expect(() => updateCategory(categoryId , "")).to.throw('category name is empty or blank')
    )
  
    after( database.disconnect())
})