require('dotenv').config()
const { env : { DB_URL_TEST } } = process
const bcrypt = require('bcryptjs')
const { expect } = require('chai')
const { database , models : { Category , Task , User } } = require('data')
const { formatDate , random : { boolean } } = require('utils') 
const deleteTask = require('.')

describe.only("logic - delete task" , ()=>{
    before( ()=> database.connect(DB_URL_TEST))

    let description1, description2, description3, description4, description5
    let name, status , currentDate
    let categoryId, userId, task1Id, task2Id, task3Id, task4Id, task5Id

    beforeEach( async ()=>{
        name = `category-${Math.random()}`
        status = boolean()
        currentDate = formatDate(new Date())

        description1 = `description1-${Math.random()}`
        description2 = `description2-${Math.random()}`
        description3 = `description3-${Math.random()}`
        description4 = `description4-${Math.random()}`
        description5 = `description5-${Math.random()}`

        username = `username-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        
        await User.deleteMany()
        await Category.deleteMany()

        const task1 = await new Task({ description: description1 , status , date : currentDate})
        task1Id = task1.id

        const task2 = await new Task({ description: description2 , status , date : currentDate})
        task2Id = task2.id

        const task3 = await new Task({ description: description3 , status , date : currentDate})
        task3Id = task3.id

        const task4 = await new Task({ description: description4 , status , date : currentDate})
        task4Id = task4.id

        const task5 = await new Task({ description: description5 , status , date : currentDate})
        task5Id = task5.id

        const user = await User.create({ username , email , password : await bcrypt.hash(password,10) })
        userId = user.id

        const category = await new Category({ name, owner: userId, tasks: [] })
        category.tasks.push(task1)
        category.tasks.push(task2)
        category.tasks.push(task3)
        category.tasks.push(task4)
        category.tasks.push(task5)

        await category.save()
        categoryId = category.id
    })

    it("should succeed on correct data" , async ()=> {
        const result = await deleteTask(categoryId , task5Id)
        expect(result).not.to.exist

        const _category = await Category.findById(categoryId)
        expect(_category.tasks.length).to.equal(4)

        const filteredTasks = _category.tasks.filter(task => task.id === task5Id)
        expect(filteredTasks.length).to.equal(0)
    })

    it("should fail on unexisting category" , async ()=>{
        categoryId= '5d5d5530531d455f75da9fF9'
        
        try{
            await deleteTask(categoryId, task1Id)
        }catch({ message }){
            expect(message).to.equal("category does not exist")
        }
    })

    it("should fail on unexisting task" , async ()=>{
        taskId= '5d5d5530531d455f75da9fF9'
        
        try{
            await deleteTask(categoryId, taskId)
        }catch({ message }){
            expect(message).to.equal("task does not exist")
        }
    })

    it('should fail on empty category id', () => 
        expect(() => deleteTask("", task1Id)).to.throw('category id is empty or blank')
    )
    
    it('should fail on wrong task id type', () => 
        expect(() => deleteTask(123, task1Id)).to.throw('category id with value 123 is not a string'))

    it('should fail on empty task id', () => 
        expect(() => deleteTask(categoryId, "")).to.throw('task id is empty or blank')
    )
    
    it('should fail on wrong task id type', () => 
        expect(() => deleteTask(categoryId, 123)).to.throw('task id with value 123 is not a string'))
    
    after(database.disconnect())
})