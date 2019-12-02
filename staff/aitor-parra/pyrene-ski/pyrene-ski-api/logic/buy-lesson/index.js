const { validate, errors: { NotFoundError, ContentError } } = require('pyrene-ski-util')
const { ObjectId, models: { User, Lesson } } = require('pyrene-ski-data')

module.exports = function(userId, date, timeStart, timeEnd, team, activity) {

    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    /*  validate.string(teamId)
        validate.string.notVoid('teamId', teamId)
        if (!ObjectId.isValid(teamId)) throw new ContentError(`${teamId} is not a valid id`) */

    //date = new Date(date)
    
    /*  validate.date(date)
    validate.date.notVoid('date', date) */
    validate.string(date)
    validate.string.notVoid('date', date)

    validate.string(timeStart)
    validate.string.notVoid('timeStart', timeStart)

    validate.string(timeEnd)
    validate.string.notVoid('timeEnd', timeEnd)

    return (async() => {

        const user = await User.findById(userId)

        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        //const date = new Date()


        const lesson = await Lesson.create({ user: userId, date, timeStart, timeEnd, team, activity })

        user.lessontobuy.push(lesson)

        await user.save()

        return lesson.id

    })()
}

