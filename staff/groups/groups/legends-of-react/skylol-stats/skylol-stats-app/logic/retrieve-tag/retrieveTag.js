function retrieveTag(tag, callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    call('GET', undefined, `http://ddragon.leagueoflegends.com/cdn/9.21.1/data/en_US/champion.json`, undefined, function (result) {
        if (result.error)
            callback(new Error(result.error))
        else{
            result = Object.values(result.data)
            result.map(champion => {
                champion.icon = `https://ddragon.leagueoflegends.com/cdn/9.21.1/img/champion/${champion.image.full}`
                champion.link = `http://ddragon.leagueoflegends.com/cdn/9.21.1/data/en_US/champion/${champion.id}.json`
            })

            const result2 = []
            for (let i=0; i<result.length; i++) {
                if(result[i].tags.includes(tag)) {
                    result2.push(result[i])
                    callback(undefined, result2)
                }
            }
            
        }
        
    });
}