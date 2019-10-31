function retrieveMasteries(encriptedId, callback) {
    validate.string(encriptedId)
    validate.string.notVoid('encriptedId', encriptedId)
    validate.function(callback)

    call('GET', undefined, 'https://skylabcoders.herokuapp.com/proxy?url=https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/' + encriptedId + '?api_key=' + 'RGAPI-bdd9804b-3c57-4771-a115-29636cc6d157', undefined, function (result) {
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