const call = require('../../utils/call')
const { validate, errors: { CredentialsError } } = require('pyrene-ski-util')
//const { env: { REACT_APP_API_URL: API_URL } } = process
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (username, password) {
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)

	return (async () => {
        const res = await call(`${API_URL}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })

		if (res.status === 200) return JSON.parse(res.body).token
        
        if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}

/* 
const { validate, errors: { CredentialsError } } = require('pyrene-ski-util')

const { models: { User } } = require('pyrene-ski-data')

module.exports = function (username, password) {
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)

    return (async () => {
        const user = await User.findOne({ username, password })

        if (!user) throw new CredentialsError('wrong credentials')

        user.lastAccess = new Date

        await user.save()

        return user.id
    })()
}
 */