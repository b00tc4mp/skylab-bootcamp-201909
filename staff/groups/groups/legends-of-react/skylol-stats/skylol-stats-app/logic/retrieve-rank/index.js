function retrieveRank(encriptedId, callback) {
    validate.string(encriptedId)
    validate.string.notVoid('encriptedId', encriptedId)
    validate.function(callback)

    call('GET', undefined, 'https://skylabcoders.herokuapp.com/proxy?url=https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + encriptedId + '?api_key=' + 'RGAPI-bdd9804b-3c57-4771-a115-29636cc6d157', undefined, function (rank) {
        if (rank.error)
            callback(new Error(rank.error))
        else {
                callback(undefined, rank)
            }
        }
    )}

