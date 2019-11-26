const {Schema} = require('mongoose')

module.exports = new Schema({
name: {
    type: String,
    enum: ['blog', 'instagram']
},
url: {
    type: String
}

})