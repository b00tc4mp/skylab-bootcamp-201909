const { validate, errors: { ConflictError } } = require('gamerex-util')
const { models: { User } } = require('gamerex-data')

module.exports = function (username, location, email, password) {
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(location)
    validate.string.notVoid('location', location)
    validate.string(email)
    validate.string.notVoid('e-mail', email)
    validate.email(email)
    validate.string(password)
    validate.string.notVoid('password', password)

    return (async () => {
        const user = await User.findOne({ username })

        if (user) throw new ConflictError(`user with username ${username} already exists`)

        await User.create({ username, location, email, password })
    })()
}
