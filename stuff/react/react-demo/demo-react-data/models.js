const mongoose = require('mongoose')
const { user , category , task } = require('./schemas')

module.exports = {
    User: mongoose.model('User' , user),
    Category: mongoose.model('Category' , category),
    Task: mongoose.model('Task' , task)
}