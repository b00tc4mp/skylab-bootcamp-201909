const { models : { User } } = require('data')
const { validate } = require('utils')
const bcrypt = require('bcryptjs')

/**
 * Authentica a user by email and password
 * 
 * @param {String} email
 * @param {String} password
 * 
 * @returns {Promise} user id
 */

module.exports = function(email , password){
    validate.string(email , "email")
    validate.email(email , "email")
    validate.string(password , "password")

    return(async ()=>{
        const user = await User.findOne({ email })
        if(!user) throw  new Error('this user does not exist')

        const match = await bcrypt.compare(password , user.password)

        if(!match) throw new Error('wrong credentials')

        return user.id
    })()
}
