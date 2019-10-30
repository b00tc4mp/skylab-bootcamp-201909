function retrieveMasteries(encriptedId,apikey, callback) {
    debugger
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    call('GET', undefined,'https://skylabcoders.herokuapp.com/proxy?url=https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/' + encriptedId+'?api_key='+apikey, undefined, function (result) {
        if (result.error)
            callback(new Error(result.error))
        // else{

        //     }
        callback(undefined, result)
            
        }
        
)};