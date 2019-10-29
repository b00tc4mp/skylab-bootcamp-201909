function retrieveChampion(link, callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    call('GET', undefined, link , undefined, function (result) {
        if (result.error)
            callback(new Error(result.error))
        else{
            
            result = Object.values(result.data)
            
            result.map(champ => {
                champ.icon= `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`
            })
            callback(undefined, result)
        }
    });
}

