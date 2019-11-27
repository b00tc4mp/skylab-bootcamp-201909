const { validate, errors: {ContentError, NotFoundError} } = require('baam-util')
const { ObjectId, models: { User, Player }} = require ('baam-data')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id',id)

    if (!ObjectId.isValid(id)) throw new ContentError(`wrong id: ${id} must be a string of 12 length`)
    id = ObjectId(id)

    return ( async () => {

        const user = await User.findById(id)
        if (!user) throw new NotFoundError('user not found')

        const newPlayer = {
            user: user.id.toString(),
            lifePoints: 5,
            hand: [],
            tempZone: null,
            discards: [],
            modifier: false,
            attack: 1,
            defense: 0
        }

        const player = await Player.create(newPlayer)

        return player._id.toString()
    })()

}