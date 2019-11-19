const logic = require('../../logic')

module.exports = function(req , res){
    const { userId } = req

    try{logic.retrieveTasksByUser(userId)
        .then( tasks => res.status(200).json({ message : "tasks correctly retrieved" , tasks }))
        .catch(({ message }) => res.status(404).json({ error : message }))
    }catch({ message }){
        res.status(404).json({ error : message })
    }
}