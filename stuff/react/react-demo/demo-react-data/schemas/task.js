
const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = new Schema({
    description:{
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})