const call = require('../../utils/call')
const { validate, errors: { NotFoundError, CredentialsError } } = require('gamerex-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (token) {
    validate.string(token)
    validate.string.notVoid('token', token)

    // validate.string(userId)
    // validate.string.notVoid('user id', userId)

    return (async () => {
        const res = await call(`${API_URL}/games/getgames`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
            // const res = await call(`${API_URL}/users/${userId}`, {
            //     method: 'GET',
            //     headers: {
            //         'Authorization': `Bearer ${token}`
            //     }

        })

        if (res.status === 200) {
            const games = JSON.parse(res.body)

            games.forEach(game => {

                game.lastAccess = new Date(game.lastAccess)
            })

            return games
        }

        if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}