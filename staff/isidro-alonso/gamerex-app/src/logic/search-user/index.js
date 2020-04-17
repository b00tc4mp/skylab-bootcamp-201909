const call = require('../../utils/call')
const { validate, errors: { CredentialsError, NotFoundError } } = require('gamerex-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (token, query) {
    validate.string(token)
    validate.string.notVoid('token', token)

    validate.string(query)
    validate.string.notVoid('query', query)

    return (async () => {
        const res = await call(`${API_URL}/users/search/${query}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })

        if (res.status === 200) {
            const users = JSON.parse(res.body)

            users.lastAccess = new Date(users.lastAccess)

            return users
        }
        
        if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}