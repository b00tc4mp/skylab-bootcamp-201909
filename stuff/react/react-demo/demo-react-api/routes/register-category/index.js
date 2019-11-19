const logic = require('../../logic')

module.exports = function(req , res){
    const { body : { name } , userId} = req

    try{
        logic.registerCategory(name , userId)
        .then( () => res.status(201).json({ message : 'category correctly registered'}))
        .catch(({ message }) => res.status(400).json({ error : message}))
    }catch({ message }){
        res.status(400).json({ error : message })
    }
}