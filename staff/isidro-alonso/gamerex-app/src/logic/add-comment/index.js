const call = require('../../utils/call')
const { validate, errors: { NotFoundError, CredentialsError } } = require('gamerex-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (token, gameId, body) {
    validate.string(token)
    validate.string.notVoid('token', token)

    validate.string(gameId)
    validate.string.notVoid('gameId', gameId)

    validate.string(body)
    validate.string.notVoid('body', body)

    return (async () => {
        const res = await call(`${API_URL}/comments/${gameId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ body })
        })

        if (res.status === 201) return JSON.parse(res.body).id

        if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}
