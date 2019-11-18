const { models : { Task } } = require('data')
const { validate } = require('utils')

module.exports = function(taskId){
    validate.string(taskId , "task id")

    return( async ()=>{
        const task = await Task.findById(taskId)
        
        if(!task) throw new Error ("task does not exist")
        debugger
        await Task.deleteOne({ _id : taskId })
    })()
}