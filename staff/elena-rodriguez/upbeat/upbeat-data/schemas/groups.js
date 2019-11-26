const {Schema} = require('mongoose')

module.exports = new Schema ({
    groups: {
        type: String,
        enum: ['band', 'choir', 'modern-ensemble', 'orchestra', 'classic-chamber'],
        require: true
    }
})