require('dotenv').config()
const { validate, errors: { NotFoundError, ContentError }  } = require('gamerex-util')
const { ObjectId, models: { User } } = require('gamerex-data')
const fs = require('fs')
const path = require('path')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        let goTo = path.join(__dirname, `../../data/users/${id}/profile.png`)
        return fs.createReadStream(goTo)         
    })()
}