const {Schema, ObjectId} = require ('mongoose')

module.exports = new Schema ({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    hand: [{
        type: ObjectId,
        ref: 'Card'}],
    tempZone: {
        type: ObjectId,
        ref: 'Card'},
    discards: [{
        type: ObjectId,
        ref: 'Card'}],
    lifePoints: Number,
    modifier: Boolean,
    attack: Number,
    defense: Number
})