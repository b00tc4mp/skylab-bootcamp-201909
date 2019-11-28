const { model } = require('mongoose')
const { user, comment, ad } = require('./schemas')

module.exports = {
    User: model('User', user),
    Comment: model('Comment', comment),
    Ad: model('Ad', ad)
}