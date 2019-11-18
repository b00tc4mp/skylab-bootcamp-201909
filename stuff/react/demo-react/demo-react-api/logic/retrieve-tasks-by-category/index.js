const { validate } = require('utils')
const { models : { Category } } = require('data')

/**
 * Retrieves all tasks by user and category
 * 
 * @param {String} userId
 * @param {String} categoryId
 * 
 * @returns {Promise} an object array with tasks data { id , category , description , status , date }
 */

 module.exports = function(categoryId){
     
    validate.string(categoryId , "category id")

    return( async ()=> {

        const category = await Category.findById(categoryId)
        if(!category) throw new Error ("category does not exist")

        return category.tasks
    })()

 }