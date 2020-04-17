/**
 * Retrieves the tags of the champions that can be played in league of legends
 * 
 * @param {String} tag tags that exists in the game
 * @param {Expression} callback Expression that will return the results
 * 
 * @returns {Array} returns an Array of Objects that contains the different tags that exist in the game corresponding in each champion
 */

function retrieveTag(tag, callback) {
    validate.string(tag)
    validate.string.notVoid('tag', tag)
    validate.function(callback)

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