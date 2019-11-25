const { Schema } = require ('mongoose')
const card = require('./card')

module.exports = new Schema ({
    name: {
        type: String,
        required: true
    }
})