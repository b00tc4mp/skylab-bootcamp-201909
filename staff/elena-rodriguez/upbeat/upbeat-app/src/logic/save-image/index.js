require('dotenv').config()
const { validate } = require('upbeat-util')
const API_URL = process.env.REACT_APP_API_URL
/**
* Saves user profile image.
* 
* @param {String} token
* @param {Stream} file
* @param {Sting} filename 
*
* @returns {Promise} - user.  
*/
module.exports = function (token, image) {
    validate.string(token)
    validate.string.notVoid('token', token)
    let fData = new FormData()
    fData.append('image', image);
    debugger
    return (async () => {
        const res = await fetch(`${API_URL}/users/profile`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}`},
            body: fData
        })
        debugger
        if (res.status === 200) return 
        throw new Error(JSON.parse(res.body).message)
    })()
}