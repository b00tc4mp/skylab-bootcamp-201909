require('dotenv').config()
const { validate, errors: { NotFoundError, ContentError }  } = require('skillpop-util')
const { ObjectId, models: { User, Ad } } = require('skillpop-data')
const fs = require('fs')
const path = require('path')

/**
* Saves wish image.
* 
* @param {ObjectId} id of user
* @param {ObjectId} adId id of adId
* @param {Stream} file data of the image
* @param {Sting} filename name of the image
*
* @returns {Promise} - user.  
*/


module.exports = function (id, adId, file, filename) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    validate.string(adId)
    validate.string.notVoid('adId', adId)
    if (!ObjectId.isValid(adId)) throw new ContentError(`${adId} is not a valid id`)

    return (async () => {
        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const ad = Ad.findById(adId)        
        if (!ad) throw new NotFoundError(`ad with id ${adId} not found`)
        
        const dir = `./data/users/${id}/ads/${adId}`
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, {recursive: true}, err => {})
        }
        let saveTo = path.join(__dirname, `../../data/users/${id}/ads/${adId}/${filename}.png`)
        return file.pipe(fs.createWriteStream(saveTo))            
    })()
}