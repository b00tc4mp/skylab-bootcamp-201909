const { ObjectId, models: { User, ExperienceItem } } = require('theatera-data')
const { validate, errors: { ContentError, NotFoundError } } = require('theatera-util')

module.exports = function(userId, experienceId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    validate.string(experienceId)
    validate.string.notVoid('experienceId', experienceId)
    if (!ObjectId.isValid(experienceId)) throw new ContentError(`${experienceId} is not a valid id`)

    return (async() => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)
        const experience = await User.findOne({ "experience._id": ObjectId(experienceId) }, { "experience.$": 1 })
        if (!experience) throw new NotFoundError(`user does not have experience with id ${experienceId}`)


        const arr = await user.experience.filter(ele => ele.id !== experienceId)
        user.experience = arr
        await user.save()

        return experienceId
    })()
}