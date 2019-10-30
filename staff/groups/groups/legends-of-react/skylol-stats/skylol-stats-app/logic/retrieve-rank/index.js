function retrieveRank(encriptedId, callback) {
    
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    call('GET', undefined, 'https://skylabcoders.herokuapp.com/proxy?url=https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + encriptedId + '?api_key=' + 'RGAPI-e37053db-c5d7-4914-b52a-2c9ad00bd9a4', undefined, function (rank) {
        if (rank.error)
            callback(new Error(rank.error))
        else {
                callback(undefined, rank)
            }
        }
    )}

