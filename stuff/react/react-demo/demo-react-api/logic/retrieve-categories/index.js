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

        const currentCategories = await Category.find({ owner : userId }).lean()
        const categories = currentCategories.map(category => category.name) 

        return categories
    })()
 }