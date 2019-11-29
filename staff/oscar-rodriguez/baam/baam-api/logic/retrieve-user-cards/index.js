const { validate, errors: { NotFoundError, ContentError } } = require('baam-util')
const { ObjectId, models: { User, Card} } = require('baam-data')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const user = await User.findById(id).lean()
        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const cards = await Card.find({'_id' : {$in : user.cards}}).populate('cards', 'name description image price col effect effectValue target').lean()

        cards.forEach(card => {
            card.id = card._id.toString()
            delete card._id
        })

        return cards

    })()
}