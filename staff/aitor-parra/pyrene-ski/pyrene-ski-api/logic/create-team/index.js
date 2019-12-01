const { validate, errors: { NotFoundError, ContentError } } = require('pyrene-ski-util')
const { ObjectId, models: { User, Team } } = require('pyrene-ski-data')

module.exports = function(id, teamName, teamEmail, teamPhone, teamActivity) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    validate.string(teamName)
    validate.string.notVoid('teamName', teamName)

    validate.string(teamEmail)
    validate.string.notVoid('teamEmail', teamEmail)

    validate.string(teamPhone)
    validate.string.notVoid('teamPhone', teamPhone)

    validate.string(teamActivity)
    validate.string.notVoid('teamActivity', teamActivity)

    return (async () => {

        const user = await User.findById(id)

        if(!user) throw new NotFoundError(`user with id ${id} not found`)

        const team = await Team.create({ user: id, teamName, teamEmail, teamPhone, teamActivity })

        return team.id
    }) ()
}
