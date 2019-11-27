const call = require('../../utils/call')
const { validate, errors: { NotFoundError, CredentialsError } } = require('gamerex-util')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (token, title, platform, sell, exchange, favourite) {
    console.log('pasa por create game app')
    validate.string(token)
    validate.string.notVoid('token', token)

    validate.string(title)
    validate.string.notVoid('title', title)

    validate.string(platform)
    validate.string.notVoid('platform', platform)

    console.log('pasa los validates 1')

    return (async () => {
        const res = await call(`${API_URL}/games`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, platform, sell, exchange, favourite })
        })

        if (res.status === 201) return JSON.parse(res.body).id

        if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}
