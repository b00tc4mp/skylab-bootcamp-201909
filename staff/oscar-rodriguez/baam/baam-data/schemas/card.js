const {Schema, ObjectId} = require ('mongoose')

module.exports = new Schema ({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    collection: {
        type: ObjectId,
        ref: 'Collection',
        required: true
    },
    effect: {
        type: String,
        required: true
    },
    effectValue: {
        type: Number,
        required: true
    },
    target: {
        type: String,
        required: true
    }
})