const {Schema} = require('mongoose')
const { validators: { isEmail } } = require('tasks-util')

module.exports = new Schema ({
    username: {
        type: String,
        required: true, 
        unique: true
    },
    email: {
        type: String,
        required: true,
        validate: isEmail
    },
    password: {
        type: String,
        required: true,

    },
    lastAccess: {
        type: Date
    },
    profileImage: {
        type: String,
        required: true
    },
    rol:{
        type: String,
        required: true,
        enum: ['solo', 'groups']
    },
    intruments: {
        type: Array
    },
   
    description: {
        type: String
    },

    socialmedia: {
        type: Array
    },
    favs: {
        type: Array
    },
    location: {
        
    }
})