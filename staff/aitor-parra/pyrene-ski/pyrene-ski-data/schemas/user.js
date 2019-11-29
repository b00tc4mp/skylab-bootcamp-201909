const { Schema, ObjectId } = require('mongoose')
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
    role: {
        type: String,
        enum: ['admin', 'client'],
        default: 'client',
        required: true
    },
    lessons: [{
        type: ObjectId,
        ref: 'Lesson'  
    }]
})