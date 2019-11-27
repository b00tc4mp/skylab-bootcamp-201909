const { Schema } = require('mongoose')
const { validators: { isEmail } } = require('pyrene-ski-util')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: isEmail
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

/*     role: {
        type: String,
        required: true
    }, */
    lastAccess: {
        type: Date
    } 
})