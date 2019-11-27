const { Schema } = require('mongoose')
const { isEmail } = require('pyrene-ski-util')

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
    phone: {
        type: Number,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        required: true,
    }
})