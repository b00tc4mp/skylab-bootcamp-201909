const { validate } = require('utils')
const { models : { Task , User } } = require('data')

/**
 * Retrieves all tasks by user and category
 * 
 * @param {String} userId
 * @param {String} category
 * 
 * @returns {Promise} an object array with tasks data { id , category , description , status , date }
 */

 module.exports = function(userId , category){
     
    validate.string(userId , "user id")
    validate.string(category , "category")

    return( async ()=> {

        const user = await User.findById(userId)
        if(!user) throw new Error ("user does not exist")

        const retrievedCategory = await Task.findOne({ category })
        if(!retrievedCategory) throw new Error ("category does not exist")

        return await Task.deleteMany( { $and : [{ owner: userId } , { category } ] } )
    })()
 }