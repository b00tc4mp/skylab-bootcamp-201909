const { Schema } = require('mongoose')

module.exports = new Schema({
    team: {
        type: ObjectId,
        required:true

    },
    activity: {
        type: String,
        required: true

    },
    date: {
        type: Date,
        required: true

    },
    timeStart: {
        type: TimeRanges,
        required: true

    },
    timeEnd: {
        type: String,
        required: true
    },
    userCreate: {
        type: ObjectId,
        required: true
    },
    client: {
        type: [Objectid],
        required: true
    }
})