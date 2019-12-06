const call = require('../../utils/call')
const { validate, errors: { NotFoundError, CredentialsError } } = require('skillpop-util')
// const { env: { REACT_APP_API_URL: API_URL } } = process
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (query) {
    debugger

    return (async () => {
        const res = await call(`${API_URL}/ads/search/${query}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })

        if (res.status === 200) {
            const ads = JSON.parse(res.body)

            ads.forEach(ad => {
                ad.date = new Date(ad.date)

                ad.lastAccess = new Date(ad.lastAccess)
            })

            return ads
        }
    })()
}