const { validate, arrayShuffle, errors: { NotFoundError, ContentError } } = require('baam-util')
const { ObjectId, models: { Card } } = require('baam-data')

module.exports = function (size) {
    validate.number(size)
    if (size <= 0) throw new ContentError('please, size must be greater than 0')

    return (async () => {
        let cards = await Card.find().lean()
        if (cards.length === 0) throw new NotFoundError(`there are no cards at Database!`)

        cards.shuffle()

        size = size < cards.length ? size : cards.length

        cards = cards.slice(0, size)

        return cards.map(
            ({ _id, name, description, image, price, col, effect, effectValue, target }) => { debugger; return { id: _id.toString(), name, description, image, price, col, effect, effectValue, target }})
    })()
}