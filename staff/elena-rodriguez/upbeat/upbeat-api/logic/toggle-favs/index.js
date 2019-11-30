const { validate, errors: { NotFoundError, ContentError } } = require('upbeat-util')
const { ObjectId, models: { User } } = require('upbeat-data')

module.exports = function (userId, musicianId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)
    validate.string(musicianId)
    validate.string.notVoid('musicianId', musicianId)
    if (!ObjectId.isValid(musicianId)) throw new ContentError(`${musicianId} is not a valid id`)

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)
        
        const favIndex = user.favs.indexOf(musicianId)

        if (favIndex === -1) {
            user.favs.push(musicianId)
        } else (
            user.favs.splice(favIndex, 1)
            )
        
        await user.save()
        
    })()
}