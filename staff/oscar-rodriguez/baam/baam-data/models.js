const { model } = require ('mongoose')
const { user, card, collection } = require ('./schemas')

module.exports = {
    User: model ('User', user),
    Card: model ('Card', card),
    Collection: model ('Collection', collection)
}