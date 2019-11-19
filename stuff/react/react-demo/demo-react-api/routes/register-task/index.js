const logic = require('../../logic')

module.exports = function(req , res){
    const { body : { description } , params : { categoryId } } = req

    try{
        logic.registerTask(categoryId , description)
            .then( () => res.status(201).json({ message : "task correctly registered" }))
            .catch(({ message }) => res.status(400).json({ error : message }))
    }catch({ message }){
        res.status(400).json({ error : message })
    }
}