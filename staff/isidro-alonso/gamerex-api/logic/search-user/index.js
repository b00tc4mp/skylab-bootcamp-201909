const { validate, errors: { NotFoundError, ContentError } } = require('gamerex-util')
const { ObjectId, models: { User } } = require('gamerex-data')

module.exports = function (query) {
    validate.string(query)
    validate.string.notVoid('query', query)

    return (async () => {

        const users = await User.find({"username": {$regex : `.*${query}*`}}).lean()

        if (users.length === 0) throw new NotFoundError(`user ${query} not found`)

        return users
    })()
}
