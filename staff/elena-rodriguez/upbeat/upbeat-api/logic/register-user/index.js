const { validate, errors: { ConflictError } } = require('upbeat-util')
const { models: { User } } = require('upbeat-data')

module.exports = function (username, email, password, rol, latitude, longitude) {
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(email)
    validate.string.notVoid('e-mail', email)
    validate.email(email)
    validate.string(password)
    validate.string.notVoid('password', password)
    validate.string(rol)
    validate.string.notVoid('rol', rol)
    validate.number(latitude)
    validate.number(longitude)
  
  

    return (async () => {
        const user = await User.findOne({ username })

        if (user) throw new ConflictError(`user with username ${username} already exists`)

        await User.create({ username, email, password, rol, location: {coordinates: [latitude, longitude]}} 
        )
    })()
}
