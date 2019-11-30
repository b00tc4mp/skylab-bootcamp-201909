const call = require('../../utils/call')
const { validate, errors: { CredentialsError, NotFoundError } } = require('gamerex-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (token, gameId) {
    validate.string(token)
    validate.string.notVoid('token', token)

    validate.string(gameId)
    validate.string.notVoid('game id', gameId)

    return (async () => {
        const res = await call(`${API_URL}/games/${gameId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })

        if (res.status === 200) {
            const game = JSON.parse(res.body)

            game.lastAccess = new Date(game.lastAccess)

            return game
        }
        
        if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}