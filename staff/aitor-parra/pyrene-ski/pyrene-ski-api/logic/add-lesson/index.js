const { validate, errors: { NotFoundError, ContentError } } = require('pyrene-ski-util')
const { ObjectId, models: { User, Team, Lesson } } = require('pyrene-ski-data')

module.exports = function(userId, date, timeStart, timeEnd) {

    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)
    
/*     validate.string(teamId)
    validate.string.notVoid('teamId', teamId)
    if (!ObjectId.isValid(teamId)) throw new ContentError(`${teamId} is not a valid id`) */

    validate.string(date)
    validate.string.notVoid('date', date)

/*     validate.date(date)
    validate.date.notVoid('date', date) */
    
    validate.string(timeStart)
    validate.string.notVoid('timeStart', timeStart)

    validate.string(timeEnd)
    validate.string.notVoid('timeEnd', timeEnd)
    
    return (async() => { 

        const user = await User.findById(userId)

        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

/*         const team = await Team.findById(teamId)

        if (!team) throw new NotFoundError(`user with id ${teamId} not found`)

        const lesson = await Lesson.create({ user: userId, team: teamId, date, timeStart, timeEnd }) */

        const lesson = await Lesson.create({ user: userId, date, timeStart, timeEnd })

        user.lessons.push(lesson) //intento pushear a array lessons del user
        
        await user.save()

        return lesson.id

    })()
}
