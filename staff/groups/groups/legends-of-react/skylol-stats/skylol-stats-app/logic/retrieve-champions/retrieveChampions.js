
function retrieveChampions(query, callback) {
    validate.function(callback)


    call('GET', undefined, `http://ddragon.leagueoflegends.com/cdn/9.21.1/data/en_US/champion.json`, undefined, function (result) {
        if (result.error)
            callback(new Error(result.error))
        else {
            result = Object.values(result.data)
            result.map(champion => {
                champion.icon = `https://ddragon.leagueoflegends.com/cdn/9.21.1/img/champion/${champion.image.full}`
                champion.link = `http://ddragon.leagueoflegends.com/cdn/9.21.1/data/en_US/champion/${champion.id}.json`
            })
            if (query) {
                query = query.charAt(0).toUpperCase() + query.slice(1)
                const result2 = []
                for (let i = 0; i < result.length; i++) {
                    if (result[i].id.includes(query)) {
                        result2.push(result[i])
                        callback(undefined, result2)
                    }
                    else callback(new Error(result.error), undefined)
                }
            } else callback(undefined, result)
        }
    });
}