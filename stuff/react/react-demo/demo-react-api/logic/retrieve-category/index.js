const { models : { Category , User } } = require('data')
const { validate } = require('utils')

/**
 * Register a user
 * 
 * @param {String} categoryId
 * 
 * @returns {Promise} empty object
 */

 module.exports = function(categoryId){
     validate.string(categoryId , "category id")

     return(async ()=>{
        const category = await Category.findOne({ _id : categoryId } , {__v:0} ).lean()
        
        if(!category) throw new Error('category does not exist')

        category.id = category._id.toString()
        delete category._id

        return category
     })()
 }