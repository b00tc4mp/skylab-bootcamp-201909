function retrieveMasteries(encriptedId, callback){
    if (typeof encriptedId !== 'string') throw new TypeError(encriptedId + ' is not a string')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

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