/**
 * Retrieves the level of the most played characters of a specific user 
 * 
 * @param {String} encriptedId id retrieved by other Api to acces at this Api information 
 * @param {Expression} callback Expression that will return results
 * 
 * @returns {Array} returns and Array of Objects which contains the level of the most played characters of a specific user
 */

function retrieveMasteries(encriptedId, callback){
    validate.string(encriptedId)
    validate.string.notVoid('encriptedId', encriptedId)
    validate.function(callback)


    call('GET', undefined, 'https://skylabcoders.herokuapp.com/proxy?url=https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/' + encriptedId + '?api_key=' + APIKEY, undefined, function (result) {

        if (result.error)
            callback(new Error(result.error))
        else {
            call('GET', undefined, 'http://ddragon.leagueoflegends.com/cdn/9.21.1/data/en_US/champion.json', undefined, function (result2) {
                if (result2.error)
                    callback(new Error(result2.error))
                else {
                    result2 = Object.values(result2.data)
                    
                }
                let masteries = championKey(result, result2)
                callback(undefined, masteries)
            })

        }

    }

    )
};