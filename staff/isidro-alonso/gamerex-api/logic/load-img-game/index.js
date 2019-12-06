require('dotenv').config()
const { validate } = require('gamerex-util')
const fs = require('fs')
const path = require('path')

module.exports = function (gameId) {
    validate.string(gameId)
    validate.string.notVoid('game id', gameId)

    return (async () => {

        let goTo = path.join(__dirname, `../../data/games/${gameId}/gameimage.png`)
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