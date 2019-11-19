require('dotenv').config()
const { env : { DB_URL_TEST } } = process
const { expect } = require('chai')
const { database , models : { Category , User , Task } } = require('data')
const { formatDate , random : { boolean } } = require('utils')
const bcrypt = require('bcryptjs')
const retrieveCategories = require('.')

describe('logic - retrieve categories' , ()=>{
    before( ()=> database.connect(DB_URL_TEST))

    let userId

    beforeEach(async ()=>{
        name1 = `category-${Math.random()}`
        name2 = `category-${Math.random()}`
        name3 = `category-${Math.random()}`
        name4 = `category-${Math.random()}`
        name5 = `category-${Math.random()}`

        username = `username-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        description1 = `description-${Math.random()}`
        description2 = `description-${Math.random()}`
        description3 = `description-${Math.random()}`
        description4 = `description-${Math.random()}`
        description5 = `description-${Math.random()}`

        status = boolean()
        date = formatDate(new Date())
        
        await Category.deleteMany()
        await User.deleteMany()

        const user = await User.create({ username , email , password : await bcrypt.hash(password,10)})
        userId = user.id

        const task1 = await new Task({ description : description1 , status , date })
        const task2 = await new Task({ description : description2 , status , date })
        const task3 = await new Task({ description : description3 , status , date })
        const task4 = await new Task({ description : description4 , status , date })
        const task5 = await new Task({ description : description5 , status , date })

        const category1 = await new Category({ name : name1 , owner : userId })
        const category2 = await new Category({ name : name2 , owner : userId })
        const category3 = await new Category({ name : name3 , owner : userId })
        const category4 = await new Category({ name : name4 , owner : userId })
        const category5 = await new Category({ name : name5 , owner : userId })
        
        category1.tasks.push(task1)
        category1.tasks.push(task2)
        category1.tasks.push(task3)
        category1.tasks.push(task4)
        category1.tasks.push(task5)
        await category1.save()
        
        category2.tasks.push(task1)
        category2.tasks.push(task2)
        category2.tasks.push(task3)
        category2.tasks.push(task4)
        category2.tasks.push(task5)
        await category2.save()
        
        category3.tasks.push(task1)
        category3.tasks.push(task2)
        category3.tasks.push(task3)
        category3.tasks.push(task4)
        category3.tasks.push(task5)
        await category3.save()
        
        category4.tasks.push(task1)
        category4.tasks.push(task2)
        category4.tasks.push(task3)
        category4.tasks.push(task4)
        category4.tasks.push(task5)
        await category4.save()
        
        category5.tasks.push(task1)
        category5.tasks.push(task2)
        category5.tasks.push(task3)
        category5.tasks.push(task4)
        category5.tasks.push(task5)
        await category5.save()
    })

    it('should succeed on correct data' , async()=>{
        const categories = await retrieveCategories(userId)

        expect(categories).to.exist

        expect(categories.length).to.equal(5)
        expect(categories[0]).to.equal(name1)
        expect(categories[1]).to.equal(name2)
        expect(categories[2]).to.equal(name3)
        expect(categories[3]).to.equal(name4)
        expect(categories[4]).to.equal(name5)
    })

    it('should fail on unexisting user' , async()=> {
        userId = '5d5d5530531d455f75da9fF9'
        try{
            await retrieveCategories(userId)
        }catch({ message }){
            expect(message).to.equal('user does not exist')
        }
    })

    it('should fail on empty user id', () => 
        expect(() => retrieveCategories("")).to.throw('user id is empty or blank')
    )

    after( database.disconnect())
})