const { validate, errors: { ConflictError } } = require('skillpop-util')
const { models: { User } } = require('skillpop-data')

module.exports = function (name, surname, city, address, email, password) {
    validate.string(name)
    validate.string.notVoid('name', name)
    validate.string(surname)
    validate.string.notVoid('surname', surname)
    validate.string(city)
    validate.string.notVoid('username', city)
    validate.string(address)
    validate.string.notVoid('username', address)
    validate.string(email)
    validate.string.notVoid('e-mail', email)
    validate.email(email)
    validate.string(password)
    validate.string.notVoid('password', password)

    return (async () => {
        const user = await User.findOne({ username })

        if (user) throw new ConflictError(`user with username ${username} already exists`)

        

        await User.create({ name, surname, city, address, email, password })
    })()
}
