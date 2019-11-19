const logic = require('../../logic')

module.exports = function(req , res){
    const { userId , params : { category } } = req

    try{logic.retrieveTasksByCategory(userId , category)
        .then( tasks => res.status(200).json({ message : "category correctly retrieved" , tasks }))
        .catch(({ message }) => res.status(404).json({ error : message }))
    }catch({ message }){
        res.status(404).json({ error : message })
    }
}