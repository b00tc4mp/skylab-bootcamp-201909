const { validate, errors: { NotFoundError, ContentError } } = require('skillpop-util')
const { ObjectId, models: { User, Ad } } = require('skillpop-data')

module.exports = function (idUser, idAd, title, description, price) {
    validate.string(idUser)
    validate.string.notVoid('id', idUser)
    if (!ObjectId.isValid(idUser)) throw new ContentError(`${idUser} is not a valid id`)
    
    validate.string(idAd)
    validate.string.notVoid('idAd', idAd)
    if (!ObjectId.isValid(idAd)) throw new ContentError(`${idAd} is not a valid id`)

    validate.string(title)
    validate.string.notVoid('title', title)

    validate.string(description)
    validate.string.notVoid('description', description)

    validate.number(price)

    return (async () => {
        const user = await User.findById(idUser)

        if (!user) throw new NotFoundError(`user with id ${idUser} not found`)

        const ad = await Ad.findById(idAd)

        if (!ad) throw new NotFoundError(`ad with id ${idAd} not found`)

        title && (ad.title = title)
        description && (ad.description = description)
        price && (ad.price = price)

        ad.lastAccess = new Date
        ad.date = new Date

        await ad.save()
        
    })()
}