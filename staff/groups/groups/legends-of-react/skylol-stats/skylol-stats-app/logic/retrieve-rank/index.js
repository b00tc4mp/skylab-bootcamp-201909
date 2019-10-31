function retrieveRank(encriptedId, callback) {
    validate.string(encriptedId)
    validate.string.notVoid('encriptedId', encriptedId)
    validate.function(callback)

    call('GET', undefined, 'https://skylabcoders.herokuapp.com/proxy?url=https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + encriptedId + '?api_key=' + 'RGAPI-6c9d74d1-ad37-40ab-a40c-a23d60297ac7', undefined, function (rank) {
        if (rank.error)
            callback(new Error(rank.error))
        else {
                callback(undefined, rank)
            }
        }
    )}

