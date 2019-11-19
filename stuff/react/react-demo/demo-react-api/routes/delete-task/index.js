const logic = require('../../logic')

module.exports = function(req , res){

    const {  params : {taskId} } = req
    
    try{
        logic.deleteTask(taskId)
            .then( () => res.status(200).json({ message : "task correctly deleted "}))
            .catch(({ message }) => res.status(400).json({ error : message }))

    }catch({ message }){
        res.status(400).json({ error : message })
    }
}