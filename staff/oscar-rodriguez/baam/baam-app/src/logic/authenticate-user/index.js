const { validate, errors: { CredentialsError } } = require('baam-util')
const API_URL = process.env.REACT_APP_API_URL


module.exports = function (nickname, password) {
    validate.string(nickname)
    validate.string.notVoid('nickname', nickname)
    validate.string(password)
    validate.string.notVoid('password', password)

    return (async () => {
        
    })()
}
