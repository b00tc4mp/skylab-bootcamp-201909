require('dotenv').config()
const { env :{DB_URL_TEST } } = process
const { expect } = require('chai')
const { database , models : { User } } = require('data')
const bcrypt = require('bcryptjs')
const retrieveUser = require('.')

describe("retrieve user" , ()=>{
    before( () => database.connect(DB_URL_TEST))

    let username , email , password , userId

    const { random } = Math

    beforeEach(async()=>{

        username = `username-${random()}`
        email = `email-${random()}@mail.com`
        password = `username-${random()}`

        await User.deleteMany()

        const user = await User.create({ username , email , password : await bcrypt.hash(password,10)})
        userId = user.id
    })

    it('should succeed on correct data' , async()=>{
        const retrievedUser = await retrieveUser(userId)

        debugger

        expect(retrievedUser).to.exist
        expect(retrievedUser.id).to.equal(userId)
        expect(retrievedUser.username).to.equal(username)
        expect(retrievedUser.email).to.equal(email)
    })

    it('should fail on unexisting user' , async()=>{
        userId = '5d5d5530531d455f75da9fF9'
        try{
            await retrieveUser(userId)
        }catch({ message }){
            expect(message).to.equal('user does not exist')
        }
    })

    it('should fail on empty user id', () => 
        expect(() => retrieveUser("")).to.throw('user id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => retrieveUser(123)).to.throw('user id with value 123 is not a string')
    )

    after(database.disconnect())
})