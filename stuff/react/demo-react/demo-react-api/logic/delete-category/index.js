const { models : { Category } } = require('data')
const { validate } = require('utils')

/**
 * Register a user
 * 
 * @param {String} categoryId
 * 
 * @returns {Promise} empty object
 */

 module.exports = function(categoryId){
     validate.string(categoryId , 'category id')
     
     return(async ()=>{
        const category = await Category.findById(categoryId)
        
        if(!category) throw new Error ('category does not exist')

        return await Category.deleteOne({ _id : categoryId })
     })()
 }