const { errors: { NotFoundError } } = require('upbeat-util')
const { models: { User } } = require('upbeat-data')

module.exports = function (query) {

    return (async () => {
        const instruments = [query]
        const musicians = await User.find(
            { $or: [{ 'username': { $regex: `.*${query}*` } }, { 'instruments': { $in: instruments } }, { 'groups': { $regex: `.*${query}*` } }] }).lean()
        // {$or:[{ 'username' : {$regex : `.*piano*`}},{ 'format.instruments': {$in: ["piano"]}},{ 'format.groups': {$regex : `.*orchestra*`}}]}
        if (!musicians) return musicians

        let results = []
        musicians.forEach(musician => {
            const {username, format: {instruments, groups}} = musician
            musician = {username, instruments, groups}
            results.push(musician)
            
          

        })
        return results

    })()
}



