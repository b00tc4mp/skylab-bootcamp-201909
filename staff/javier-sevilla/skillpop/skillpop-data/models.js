const { model } = require('mongoose')
const { user, comment } = require('./schemas')

module.exports = {
    User: model('User', user),
    Comment: model('Comment', comment)
}