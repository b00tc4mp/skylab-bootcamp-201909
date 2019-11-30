const { validate, errors: { NotFoundError, ContentError } } = require('upbeat-util')
const { ObjectId, models: { User } } = require('upbeat-data')

module.exports = function (id, instru) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`user with id ${id} not found`)
        
    
        instru.forEach(ele => user.format.instruments.push(ele) )
        
    

        await User.updateOne({_id:id},{format: user.format.instruments})
        
    })()
}