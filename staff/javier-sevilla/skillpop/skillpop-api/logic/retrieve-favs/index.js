const {  validate, errors: { NotFoundError, ContentError } } = require('skillpop-util')
const {  ObjectId, models: { User } } = require('skillpop-data')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        return user.favs

    })()
}