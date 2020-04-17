const call = require('../../utils/call')
const { validate, errors: { CredentialsError, NotFoundError, ConflictError } } = require('gamerex-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (token, gameId, title, platform, sell, exchange, favourite) {
    validate.string(token)
    validate.string.notVoid('token', token)

    validate.string(gameId)
    validate.string.notVoid('game id', gameId)

    if (title) {
        validate.string(title)
        validate.string.notVoid('title', title)
    }
    if (platform) {
        validate.string(platform)
        validate.string.notVoid('platform', platform)
    }

    return (async () => {
        const res = await call(`${API_URL}/games/${gameId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, platform, sell, exchange, favourite })
        })

        if (res.status === 200) return

        if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)

        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        if (res.status === 409) throw new ConflictError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}
