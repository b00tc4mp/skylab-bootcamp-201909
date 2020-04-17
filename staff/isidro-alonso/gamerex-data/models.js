const { model } = require('mongoose')
const { user, game, comment } = require('./schemas')

module.exports = {
    User: model('User', user),
    Game: model('Game', game),
    Comment: model('Comment', comment)
}