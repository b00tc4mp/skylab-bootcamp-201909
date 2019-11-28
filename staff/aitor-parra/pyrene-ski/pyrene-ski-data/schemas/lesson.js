const { Schema } = require('mongoose')

module.exports = new Schema({
    team: {
        type: ObjectId,
        required:true,
        ref: 'Team'

    },
    activity: {
        type: String,
        required: true,
        ref: 'Team'

    },
    date: {
        type: Date,
        required: true

    },
    timeStart: {
        type: String,
        required: true

    },
    timeEnd: {
        type: String,
        required: true
    },
    userCreate: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    client: {
        type: [Objectid],
        required: true,
        ref: 'User'
    }
})