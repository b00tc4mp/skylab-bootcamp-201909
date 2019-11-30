const { validate, errors: { NotFoundError, ContentError } } = require('gamerex-util')
const { ObjectId, models: { User } } = require('gamerex-data')

module.exports = function () {

    return (async () => {

        const users = await User.find().lean()
        console.log(users)

        // users.forEach(user => {
        //     // user.id = user._id.toString()
        //     // delete user._id

        //     user = id
        // })

        return users
    })()
}
