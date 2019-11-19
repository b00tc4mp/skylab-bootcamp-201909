const mongoose = require('mongoose')
const { Schema , Schema : { Types : { ObjectId } } } = mongoose
const taskSchema = require('./task')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    tasks: [taskSchema]
})