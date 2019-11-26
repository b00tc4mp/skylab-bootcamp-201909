const {Schema} = require('mongoose')
//const { validators: { isEmail } } = require('upbeat-util')

module.exports = new Schema ({
    username: {
        type: String,
        required: true,    
    },
    email: {
        type: String,
        required: true,
        validate: isEmail,
        unique: true
    },
    password: {
        type: String,
        required: true,

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
    intruments: [{
        type: String,
        enum: ['drums', 'guitar', 'piano', 'violin', 'bass', 'cello', 'clarinet', 'double bass', 'flute', 'oboe', 'saxophone', 'trombone', 'trumpet', 'ukelele', 'viola', 'vocal-soprano', 'vocal-mezzo', 'vocal-contralto', 'vocal-tenor', 'vocal-baritone', 'vocal-bass']
    }],

    groups: {
        type: String,
        required: true,
        enum: ['band', 'choir', 'modern-ensemble', 'orchestra', 'classic-chamber']
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