const { validate } = require('utils')
const { models : { User }} = require('data')
const bcrypt = require('bcryptjs')

/**
 * Register a user
 * 
 * @param {String} username
 * @param {String} email
 * @param {String} password
 * 
 * @returns {Promise} empty object
 */

module.exports = function(username , email , password){
    validate.string(username , "username")
    validate.string(email , "email")
    validate.email(email , "email")
    validate.string(password , "password")

    return(async ()=> {
        const user = await User.findOne({ email })

        if(user) throw new Error('this email is already registered')

        const hash = await bcrypt.hash(password,10)

        await User.create({ username , email ,password : hash })

        return {}
    })()
}