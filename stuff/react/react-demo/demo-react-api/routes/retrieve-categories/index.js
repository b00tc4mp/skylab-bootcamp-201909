const logic = require('../../logic')

/**
 * Register a user
 * 
 * @param {String} userId
 * 
 * @returns {Promise} empty object
 */

 module.exports = function(req , res){
    const { userId } = req

    try{
        logic.retrieveCategories(userId)
        .then(categories => res.status(200).json({ message : 'categories correctly retrieved' , categories }))
        .catch(({ message }) => res.status(400).json({ error : message }))
    }catch({ message }){
        res.status(400).json({ error : message })
    }
 }