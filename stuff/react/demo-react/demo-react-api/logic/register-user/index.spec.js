require ('dotenv').config()
const bcrypt = require('bcryptjs')
const { expect } = require('chai')

const { database , models : { User } } = require('data')

const registerUser = require('.')

const { env : { DB_URL_TEST } } = process


describe("logic - register user" , ()=>{
    
    before( ()=> database.connect(DB_URL_TEST))

    let username , email , password

    beforeEach( async ()=> {
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        
        await User.deleteMany()
    })

    it('should succeed on correct data' , async()=>{
        const result = await registerUser(username ,  email , password)
        expect(result).to.exist

        const user = await User.findOne({ email })
        expect(user.id).to.exist

        expect(user.username).to.equal(username)
        expect(user.email).to.equal(email)
        
        const match = await bcrypt.compare(password,user.password)
        expect(match).to.be.true
    })

    it("should fail on existing user" , async () => {
        await User.create({ username ,  email , password })
        try{
            await registerUser(username ,  email , password)
        }catch({ message }){
            expect(message).to.equal(`this email is already registered`)
        }
    })

    it('should fail on empty user name' , () =>
        expect(() => registerUser("" ,  email , password)).to.throw('username is empty or blank')
    )

    it('should fail on empty email' , () =>
        expect(() => registerUser(username ,  "" , password)).to.throw('email is empty or blank')
    )
    
    it('should fail on wrong email type' , () =>
        expect(() => registerUser(username ,  123 , password)).to.throw('email with value 123 is not a string')
    )
    
    it('should fail on wrong email format' , () =>
        expect(() => registerUser(username ,  "123@mailcom" , password)).to.throw('email with value 123@mailcom is not a valid e-mail')
    )
    
    it('should fail on empty password' , () =>
        expect(() => registerUser(username ,  email , "")).to.throw('password is empty or blank')
    )
    
    it('should fail on wrong password wrong' , () =>
        expect(() => registerUser(username ,  email , 123)).to.throw('password with value 123 is not a string')
    )
    
    after(database.disconnect())
})