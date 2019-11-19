const { models : { Category , User } } = require('data')
const { validate } = require('utils')

/**
 * Register a user
 * 
 * @param {String} userId
 * 
 * @returns {Promise} empty object
 */

 module.exports = function(userId){
    validate.string(userId , 'user id')

    return(async () => {
        const user = await User.findById(userId)
        if(!user) throw new Error('user does not exist')

        const currentCategories = await Category.find({ owner : userId }, {__v:0}).lean()
        return currentCategories
    })()
 }