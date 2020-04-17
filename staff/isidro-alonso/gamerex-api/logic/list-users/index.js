const { validate, errors: { NotFoundError, ContentError } } = require('gamerex-util')
const { ObjectId, models: { User } } = require('gamerex-data')

module.exports = function () {

    return (async () => {

        const users = await User.find().lean()

        return users
    })()
}
