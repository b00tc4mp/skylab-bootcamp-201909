const { models : { Category } } = require('data')
const { validate } = require('utils')

/**
 * Register a user
 * 
 * @param {String} categoryId
 * @param {String} name
 * 
 * @returns {Promise} empty object
 */

 module.exports = function(categoryId , name){
     validate.string(categoryId , 'category id')
     validate.string(name , 'category name')

     return(async()=>{
        const retrievedCategory = await Category.findById(categoryId)
        
        if(!retrievedCategory) throw new Error ('category does not exist')
        
        await Category.updateOne({_id : categoryId} , { $set : {name} })
     })()
 }