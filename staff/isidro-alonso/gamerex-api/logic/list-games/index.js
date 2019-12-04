const { validate, errors: { NotFoundError, ContentError } } = require('gamerex-util')
const { ObjectId, models: { Game } } = require('gamerex-data')

module.exports = function () {

    return (async () => {

        const games = await Game.find().lean()

        return games
    })()
}
