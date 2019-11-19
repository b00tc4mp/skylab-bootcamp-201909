const logic = require('../../logic')

module.exports = function(req , res){
    const { params : {categoryId} } = req

    try{
        logic.deleteCategory(categoryId)
        .then( ()=> res.status(200).json({ message : 'category correctly deleted' }))
        .catch(({ message }) => res.status(400).json({ error : message }))
    }catch({ message }){
        res.status(400).json({ error : message })
    }
}