const { validate, errors: { NotFoundError, ContentError } } = require('gamerex-util')
const { ObjectId, models: { Game } } = require('gamerex-data')

module.exports = function (id) {

    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)
    
    return (async () => {
        const game = await Game.findById(id)



        if (!game) throw new NotFoundError(`game with id ${id} not found`)

        game.lastAccess = new Date

        await game.save()

        const { title, platform, sell, exchange, favourite, lastAccess } = game.toObject()

        return { id, title, platform, sell, exchange, favourite, lastAccess }
    })()
}
