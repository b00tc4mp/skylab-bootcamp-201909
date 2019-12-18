const { validate, errors: { NotFoundError } } = require('baam-util')
const API_URL = process.env.REACT_APP_API_URL
const call = require('../utils/call')

//module.exports = function (id) {
export default function (id) {

    validate.string(id)
    validate.string.notVoid('id', id)

    return (async () => {
        const res = await call (`${API_URL}/cards/${id}`, {
            method: 'GET'
        })

        if (res.status === 200) return JSON.parse(res.body)

        if (res.status === 404) throw new NotFoundError (JSON.parse(res.body).message)

        throw new Error (JSON.parse(res.body).message)
    })()
}