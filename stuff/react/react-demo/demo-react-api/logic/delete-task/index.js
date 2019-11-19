const { models : { Category } } = require('data')
const { validate } = require('utils')

module.exports = function(categoryId, taskId){
    validate.string(categoryId , "category id")
    validate.string(taskId , "task id")

    return( async ()=>{
        const category = await Category.findById(categoryId)

        if(!category) throw new Error ('category does not exist')

        const filteredTasks = category.tasks.filter(task => task.id !== taskId)

        if(filteredTasks.length === category.tasks.length) throw new Error ('task does not exist')

        category.tasks = filteredTasks

        await category.save()
    })()
}