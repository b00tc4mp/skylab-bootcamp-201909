const logic = require('../../logic')

module.exports = function(req , res){
    const { userId , body : { category } } = req

    try{logic.deleteTasksByCategory(userId , category)
        .then( () => res.status(200).json({ message : "category correctly deleted" }))
        .catch(({ message }) => res.status(404).json({ error : message }))
    }catch({ message }){
        res.status(404).json({ error : message })
    }
}