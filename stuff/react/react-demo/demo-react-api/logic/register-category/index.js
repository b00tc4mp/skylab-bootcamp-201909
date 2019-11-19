const { models : { Category , User } } = require('data')
const { validate } = require ('utils')

/**
 * Register a user
 * 
 * @param {String} category
 * @param {String} userId
 * 
 * @returns {Promise} empty object
 */

module.exports = function(name , userId){
    validate.string(name , "category")
    validate.string(userId , "user id")

    return(async ()=>{
        debugger
        const user = await User.findById(userId)
        if(!user) throw new Error ("user doesn't exist")

        const currentCategory = await Category.findOne({name , owner : userId})
        if(currentCategory) throw new Error ('category already exists')

        await Category.create({name, owner : userId , tasks : []})

        // const newCategory = await Category.create({name : category , owner : userId , tasks : []})
        // return newCategory.id
    })()
}