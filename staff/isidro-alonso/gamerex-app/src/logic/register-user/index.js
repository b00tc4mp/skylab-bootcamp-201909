const call = require('../../utils/call')
// const { validate, errors: { ConflictError } } = require('tasks-util')
// const { env: { REACT_APP_API_URL: API_URL } } = process
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (username, location, email, password) {
    // validate.string(username)
    // validate.string.notVoid('username', username)
    // validate.string(location)
    // validate.string.notVoid('location', location)
    // validate.string(email)
    // validate.string.notVoid('e-mail', email)
    // validate.email(email)
    // validate.string(password)
    // validate.string.notVoid('password', password)

    return (async () => {
        console.log(username, location, email, password)
        const res = await call(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, location, email, password })
        })

        if (res.status === 201) return
        
        if (res.status === 409) throw new Error //ConflictError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}