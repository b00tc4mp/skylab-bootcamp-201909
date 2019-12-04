const call = require('../../utils/call')
const { validate, errors: { ConflictError } } = require('gamerex-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (token) {
    validate.string(token)
    validate.string.notVoid('token', token)

    return (async () => {
        const res = await call(`${API_URL}/upload`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }//, //'Authorization': `Bearer ${token}`
            //body: JSON.stringify({ username, location, email, password })
        })

        if (res.status === 201) return
        
        if (res.status === 409) throw new ConflictError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}