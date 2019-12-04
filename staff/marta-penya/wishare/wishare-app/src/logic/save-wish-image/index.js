require('dotenv').config()
const { validate } = require('wishare-util')
const { ObjectId, models: { User } } = require('wishare-data')
const call = require('../../utils/call')


/**
* Saves wish image.
* 
* @param {String} token of user
* @param {ObjectId} wishId id of wish
* @param {Stream} file data of the image
* @param {Sting} filename name of the image
*
* @returns {Promise} - user.  
*/


module.exports = function (token, wishId, file, filename) {
    validate.string(token)
    validate.string.notVoid('token', token)
    
    validate.string(wishId)
    validate.string.notVoid('wishId', wishId)
    
    return (async () => {
            const resImage = await call(`${API_URL}/upload/${wishId}`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            })
            if (resImage.status === 201) return   

    })()
}

