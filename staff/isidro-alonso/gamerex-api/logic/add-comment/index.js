const { ObjectId, models: { User, Game, Comment } } = require('gamerex-data')
const { validate, errors: { ContentError, NotFoundError } } = require('gamerex-util')

module.exports = function(gameId, id, body) {
    validate.string(gameId)
    validate.string.notVoid('game id', gameId)

    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    validate.string(body)
    validate.string.notVoid('body', body)

    return (async() => {

        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const game = await Game.findById(gameId)

        if (!game) throw new NotFoundError(`game with id ${id} not found`)

        const comment = await Comment.create({ game: gameId, user: id, body, date: new Date })

        return comment.id

    })()
}