function retrieveChampion(link, callback) {
    validate.string(link)
    validate.string.notVoid('link', link)
    validate.function(callback)

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

