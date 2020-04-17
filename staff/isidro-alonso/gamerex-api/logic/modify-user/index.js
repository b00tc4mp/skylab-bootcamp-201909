const { validate, errors: { NotFoundError } } = require('gamerex-util')
const { ObjectId, models: { User } } = require('gamerex-data')

module.exports = function (id, username, location, password) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    if (username) {
        validate.string(username)
        validate.string.notVoid('username', username)
    }
    if (location) {
        validate.string(location)
        validate.string.notVoid('location', location)
    }
    if (password) {
        validate.string(password)
        validate.string.notVoid('password', password)
    }

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const update = {}

        username && (update.username = username)
        location && (update.location = location)
        password && (update.password = password)
        
        update.lastAccess = new Date

        await User.updateOne({ _id: ObjectId(id) }, { $set: update })
    })()
}
