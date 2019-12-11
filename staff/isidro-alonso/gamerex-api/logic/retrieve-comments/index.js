const { ObjectId, models: { User, Game, Comment } } = require('gamerex-data')
const { validate, errors: { ContentError, NotFoundError } } = require('gamerex-util')

module.exports = function (gameId, id) {
    validate.string(gameId)
    validate.string.notVoid('game id', gameId)

    validate.string(id)
    validate.string.notVoid('user id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const game = await Game.findById(gameId)

        if (!game) throw new NotFoundError(`game with id ${gameId} not found`)

        // const comments = await Comment.find().populate("User").lean()

        const comments = await Comment.find().lean()

        if (!comments) return ''

        let commentList = []

        comments.forEach(comment => {
            if (gameId === comment.game.toString()) {
                // comment.id = comment._id.toString()
                // delete comment._id
                // comment.user = comment.user.toString()
                // commentList.push(comment)
                commentList.push(`${comment.user}: ${comment.body} on ${comment.date}`) //${comment.user}
            }
        })

        // console.log(comments.user)

        // await comments.save()

        // const { user, body, date } = comments.toObject()

        // return comments //{ user, body, date }

        return commentList

    })()
}