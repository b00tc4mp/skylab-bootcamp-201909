/**
 * Retrieves the level of the ranked games of a specific user 
 * 
 * @param {String} encriptedId id retrieved by other Api to acces at this Api information 
 * @param {Expression} callback Expression that will return the results
 * 
 * @returns {Array} returns and Array of Objects which contains the level of the ranked games of a specific user
 */


function retrieveRank (encriptedId, callback){
    validate.string(encriptedId)
    validate.string.notVoid('encriptedId', encriptedId)
    validate.function(callback)


    call('GET', undefined, 'https://skylabcoders.herokuapp.com/proxy?url=https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + encriptedId + '?api_key=' + APIKEY, undefined, function (rank) {

        if (rank.error)
            callback(new Error(rank.error))
        else {
                callback(undefined, rank)
            }
        }
    )}

