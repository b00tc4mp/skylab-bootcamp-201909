const { Schema, ObjectId } = require('mongoose')
const Comment = require('./comment')
const { validators: { isEmail } } = require('skillpop-util')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
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
    favs: {
        type: [ObjectId], 
        require: true,
        ref: 'Ads'
    },
    comments: [Comment],
    lastAccess: {
        type: Date
    }
})