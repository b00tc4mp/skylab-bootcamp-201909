const { Schema, ObjectId } = require('mongoose')

module.exports = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    team: {
        type: ObjectId,
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
/*     client: {
        type: Objectid,
        required: true,
        ref: 'User'
    } */
})