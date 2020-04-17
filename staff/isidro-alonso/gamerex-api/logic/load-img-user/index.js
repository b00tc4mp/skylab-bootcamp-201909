require('dotenv').config()
const { validate } = require('gamerex-util')
const fs = require('fs')
const path = require('path')

module.exports = function (userId) {
    validate.string(userId)
    validate.string.notVoid('user id', userId)

    return (async () => {

        let goTo = path.join(__dirname, `../../data/users/${userId}/profile.png`)
        try {
            if (fs.existsSync(goTo)) {
                return fs.createReadStream(goTo)
            } else {
                const defaultImage = path.join(__dirname, `../../data/nodata.png`)
                return fs.createReadStream(defaultImage)
            }
        } catch (error) {
        }   
    })()
}