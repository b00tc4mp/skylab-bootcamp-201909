const { validate, errors: { ConflictError } } = require('gamerex-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (token, gameId, file) {
    validate.string(token)
    validate.string.notVoid('token', token)

    validate.string(gameId)
    validate.string.notVoid('game id', gameId)

    let formData = new FormData()
    formData.append('file', file)

    return (async () => {

        const res = await fetch(`${API_URL}/games/upload/${gameId}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        })

        if (res.status === 201) return

        if (res.status === 409) throw new ConflictError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}