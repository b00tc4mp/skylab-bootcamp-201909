require('dotenv').config()
const { validate, errors: { NotFoundError, ContentError }  } = require('gamerex-util')
const { ObjectId, models: { User, Game } } = require('gamerex-data')
const fs = require('fs')
const path = require('path')
/**
* Saves wish image.
*
* @param {ObjectId} id of user
* @param {ObjectId} gameId id of gameId
* @param {Stream} file data of the image
* @param {Sting} filename name of the image
*
* @returns {Promise} - user.
*/
module.exports = function (id, gameId, file, filename) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)
    validate.string(gameId)
    validate.string.notVoid('game id', gameId)
    if (!ObjectId.isValid(gameId)) throw new ContentError(`${gameId} is not a valid id`)

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const game = Game.findById(gameId)

        if (!game) throw new NotFoundError(`ad with id ${gameId} not found`)

        const dir = `./data/users/${id}/games/${gameId}`

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, {recursive: true}, err => {})
        }

        let saveTo = path.join(__dirname, `../../data/users/${id}/games/${gameId}/${filename}.png`)

        return file.pipe(fs.createWriteStream(saveTo))
    })()
}