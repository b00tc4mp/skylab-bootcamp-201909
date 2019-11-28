const { Schema } = require('mongoose')
const { validators: { isEmail } } = require('gamerex-util')

module.exports = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: isEmail
    },
    password: {
        type: String,
        required: true
    },
    lastAccess: {
        type: Date
    }
})