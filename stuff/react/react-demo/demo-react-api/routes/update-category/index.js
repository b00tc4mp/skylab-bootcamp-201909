const logic = require('../../logic')

module.exports = function(req , res){
    const { params : { categoryId } , body : { name } } = req

    try{
        logic.updateCategory(categoryId , name)
        .then( () => res.status(200).json({ message : 'category correctly updated'}))
        .catch(({ message })=> res.status(400).json({ error : message }))
    }catch({ message }){
        res.status(400).json({ error : message })
    }
}