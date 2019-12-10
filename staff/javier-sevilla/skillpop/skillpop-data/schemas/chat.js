const { Schema, ObjectId } = require('mongoose')
const Message = require('./message')

module.exports =  new Schema({
    users: {
        type: [ObjectId], 
        require: true,
        ref: 'User'
        },
    nameDestUser: {
        type: String,
        required: true
    },
    messages: [Message],
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastAccess: {
        type: Date
    }
})
