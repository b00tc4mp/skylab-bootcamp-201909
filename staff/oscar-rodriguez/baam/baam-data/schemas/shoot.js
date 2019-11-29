const {Schema, ObjectId} = require ('mongoose')
module.exports = new Schema ({
    userId: {
        type: ObjectId,
        ref: 'Player'
    },
    cardId: {
        type: ObjectId,
        ref: 'Card'
    },
    date: Date
})