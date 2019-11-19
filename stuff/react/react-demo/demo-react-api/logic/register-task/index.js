const { models : { User , Category , Task } } = require('data')
const { validate , formatDate } = require('utils')

/**
 * Register a user
 * 
 * @param {String} categoryId
 * @param {String} description
 * 
 * @returns {Promise} 
 */

module.exports = function(categoryId , description){
    validate.string(categoryId , "category")
    validate.string(description , "task")

    return (async ()=> {
        const category = await Category.findById(categoryId)
        if(!category) throw new Error('category does not exist')
        
        const task = await new Task({ description , status: false , date: formatDate(new Date())})
        category.tasks.push(task)
        await category.save()
    })()
}