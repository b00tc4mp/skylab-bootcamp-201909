const logic = require('../../logic')

module.exports = function(req , res){

    const {  params : {taskId} , body  } = req
    
    try{
        logic.updateTask(taskId , body)
            .then( () => res.status(200).json({ message : "task correctly updated "}))
            .catch(({ message }) => res.status(400).json({ error : message }))

    }catch({ message }){
        res.status(400).json({ error : message })
    }
}