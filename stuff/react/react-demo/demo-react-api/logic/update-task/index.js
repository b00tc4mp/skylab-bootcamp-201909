const { models : { Task } } = require('data')
const { validate } = require('utils')

/**
 * Register a user
 * 
 * @param {String} taskId
 * @param {Object} body
 * 
 * @returns {Promise} a modified object 
 */

module.exports = function(taskId , body){
    const { category , description , status } = body
    validate.string(taskId , "task id")

    return(async ()=> {
        const task = await Task.findById(taskId)
        if(!task) throw new Error ("task does not exist")

        await Task.updateOne({ _id:taskId } , { $set:{ category , description , status } })
    })()
}