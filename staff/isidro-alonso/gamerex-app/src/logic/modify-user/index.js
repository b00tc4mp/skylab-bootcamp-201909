const call = require('../../utils/call')
const { validate, errors: { CredentialsError, NotFoundError, ConflictError } } = require('gamerex-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (token, id, username, location, password) {
    validate.string(token)
    validate.string.notVoid('token', token)
    
    validate.string(id)
    validate.string.notVoid('id', id)

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
        const res = await call(`${API_URL}/users/${id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, location, password })
        })

        if (res.status === 200) return

        if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)

        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        if (res.status === 409) throw new ConflictError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}
