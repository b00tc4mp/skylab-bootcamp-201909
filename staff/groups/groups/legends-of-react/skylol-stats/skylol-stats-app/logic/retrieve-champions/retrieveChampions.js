
/**
 * Retrieve info from the API of league of legends of each champion that can be played in the game
 * 
 * @param {String} id id of the user logged in
 * @param {String} token Token of the user logged in
 * @param {String} query the input value introduced to search the champion
 * @param {Function} callback Expression that will return the results
 * 
 * @returns {Array} Array with objects of each champion in the league of legends game
 */

function retrieveChampions(id, token, query, callback) {
    validate.string(id)
    validate.string.notVoid('id', id)
    validate.string(token)
    validate.string.notVoid('token', token)
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
            call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, users => {
                if (users.error) return callback(new Error(users.error))
                
                const { data: { favs = [] } } = users
                result.map(champion => {

                    champion.isFav = favs.includes(champion.id)
                })
                if (query) {
                    
                    query = query.charAt(0).toUpperCase() + query.slice(1)
                    const result2 = []
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].id.includes(query)) {
                            result2.push(result[i])

                        } 
                    } return callback(undefined, result2)
                }
                callback (undefined, result)  
            })
        } 

    })
} 
