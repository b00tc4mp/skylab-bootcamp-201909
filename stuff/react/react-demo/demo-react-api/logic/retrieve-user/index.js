const { models : { User } } = require('data')
const { validate} = require('utils')

/**
 * Retireves a user by id
 * 
 * @param{String} id
 * 
 * @returns {Promise} user
 */

module.exports = function(userId){
    validate.string(userId , "user id")

    return(async ()=>{
        const user = await User.findOne({ _id : userId } , { _id : 0 , __v : 0 , password : 0}).lean()
        
        if(!user) throw new Error('user does not exist')
        
        user.id = userId
        
        return user
    })()
}