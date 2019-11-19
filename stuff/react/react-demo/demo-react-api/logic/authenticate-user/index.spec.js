require ('dotenv').config()
const bcrypt = require('bcryptjs')
const { expect } = require('chai')

const { database , models : { User }} = require('data')
const { random } = Math

const authenticateUser = require('.')

const { env : { DB_URL_TEST } } = process

describe("logic - authenticate user" , ()=>{
    
    before( ()=> database.connect(DB_URL_TEST))

    let username , email , password , userId

    beforeEach( async ()=> {
        username = `username-${random()}`
        email = `user-email-${random()}@mail.com`
        password = `password-${random()}`

        await User.deleteMany()

        const user = await User.create({ username , email , password : await bcrypt.hash(password,10)})
        userId = user.id
    })

    it('should succeed on correct data' , async()=>{
        const id = await authenticateUser(email , password)
        expect(id).to.exist
        expect(id).to.equal(userId)
    })

    it('should fail on unexisting user' , async()=>{
        try{
            await authenticateUser("unexisting@mail.com" , password)
        }catch({ message }){
            expect(message).to.equal(`this user does not exist`)
        }
    })
    
    it('should fail on wrong credentials' , async()=>{
        try{
            await authenticateUser(email , '123')
        }catch({ message }){
            expect(message).to.equal("wrong credentials")
        }
    })

    it('should fail on empty email' , () =>
        expect(() => authenticateUser("" , password)).to.throw('email is empty or blank')
    )
    
    it('should fail on wrong email type' , () =>
        expect(() => authenticateUser(123 , password)).to.throw('email with value 123 is not a string')
    )
    
    it('should fail on wrong email format' , () =>
        expect(() => authenticateUser("123@mailcom" , password)).to.throw('email with value 123@mailcom is not a valid e-mail')
    )
    
    it('should fail on empty password' , () =>
        expect(() => authenticateUser(email , "")).to.throw('password is empty or blank')
    )
    
    it('should fail on wrong password wrong' , () =>
        expect(() => authenticateUser(email , 123)).to.throw('password with value 123 is not a string')
    )

    after(database.disconnect())
})