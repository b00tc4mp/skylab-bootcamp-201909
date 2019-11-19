const logic = require('../../logic')

module.exports = function(req , res){
    const { userId } = req
    
    try{
        logic.retrieveUser(userId)
            .then(user => res.status(200).json({ message : "user retrieved correctly" , user}))
            .catch(({ message }) => res.status(404).json({ error : message }))
    }catch({ message }){
        res.status(404).json({ error : message })
    }
}