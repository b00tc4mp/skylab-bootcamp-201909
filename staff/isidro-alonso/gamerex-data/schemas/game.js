const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    sell: {
        type: Boolean,
        default: false
    },
    exchange: {
        type: Boolean,
        default: false
    },
    favourite: {
        type: Boolean,
        default: false
    },
    lastAccess: {
        type: Date
    }
})