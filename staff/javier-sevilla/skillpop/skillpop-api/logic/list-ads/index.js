const {  errors: { NotFoundError, ContentError } } = require('skillpop-util')
const {  models: { Ad } } = require('skillpop-data')

module.exports = function (query) {

    return (async () => {
        const ads = await Ad.find({ $or:[ { "title" : {$regex : `.*${query}*`}}, {"description" : {$regex : `.*${query}*`}}]})
        
        if (!ads) throw new NotFoundError(`ads with query ${query} not found`)

        ads.forEach(ad => {
            ad.id = ad._id.toString()
            delete ad._id

            ad.user = ad.user._id.toString()
        })
        return ads

    })()
}