const {Schema, ObjectId} = require ('mongoose')
module.exports = new Schema ({
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    cardId: {
        type: ObjectId,
        ref: 'Card'
    },
    date: Date
})