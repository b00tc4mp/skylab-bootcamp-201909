const {Schema} = require('mongoose')
//const { validators: { isEmail } } = require('tasks-util')

module.exports = new Schema ({
users : {
    type: Array
},

messages : [Message]

})