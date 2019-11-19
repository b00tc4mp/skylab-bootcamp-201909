const { validate } = require('utils')
const { models : { Task , User } } = require('data')

/**
 * Retrieves all tasks by user 
 * 
 * @param {String} userId
 * @param {String} category
 * 
 * @returns {Promise} an object array with tasks data { id , category , description , status , date }
 */

 module.exports = function(userId){
     
    validate.string(userId , "user id")

    return( async ()=> {
        const user = await User.findById(userId)
        if(!user) throw new Error ("user does not exist")

        const tasks = await Task.find({ owner: userId }).lean()
        
        tasks.forEach(task => {
            task.id = task._id.toString()
            delete task._id
	        delete task.__v
        })

        return tasks
    })()

 }