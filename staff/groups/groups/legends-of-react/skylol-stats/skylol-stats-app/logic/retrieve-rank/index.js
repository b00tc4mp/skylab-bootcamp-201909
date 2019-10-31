function retrieveRank (encriptedId, callback){
    if (typeof encriptedId !== 'string') throw new TypeError(encriptedId + ' is not a string')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')


    call('GET', undefined, 'https://skylabcoders.herokuapp.com/proxy?url=https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + encriptedId + '?api_key=' + APIKEY, undefined, function (rank) {

        if (rank.error)
            callback(new Error(rank.error))
        else {
                callback(undefined, rank)
            }
        }
    )}

