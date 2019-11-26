const { Schema } = require('mongoose')
const Comment = require('./comments')
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
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    favs: {
        type: [ObjectId], 
        require: true,
        ref: 'Ads'
    },
    comments: [Comment],
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