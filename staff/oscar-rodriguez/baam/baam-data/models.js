const { model } = require ('mongoose')
const { user, card, game } = require ('./schemas')

module.exports = {
    User: model ('User', user),
    Card: model ('Card', card),
    Game: model ('Game', game)
}