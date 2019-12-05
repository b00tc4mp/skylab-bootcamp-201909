const { validate, errors: { ContentError, NotFoundError } } = require('skillpop-util')
const { ObjectId, models: { Chat, User } } = require('skillpop-data')


module.exports = function(id) {
    validate.string(id)
    validate.string.notVoid('userId', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)


    return (async() => {

        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        await Chat.updateMany({ "users": { $in: [id] } }, { $set: { lastAccess: new Date } })

        const chats = await Chat.find({ "users": { $in: [id] } }, { __v: 0 }).lean()

        chats.forEach(chat => {
            chat.id = chat._id.toString()
            delete chat._id
            chat.messages.forEach(message => {
                message.id = message._id.toString()
                delete message._id
            })
        })

        return chats

    })()
}