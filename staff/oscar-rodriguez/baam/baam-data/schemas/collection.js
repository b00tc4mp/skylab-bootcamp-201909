const { Schema, ObjectId } = require ('mongoose')
const card = require('./card')

module.exports = new Schema ({
    name: {
        type: String,
        required: true
    }
})