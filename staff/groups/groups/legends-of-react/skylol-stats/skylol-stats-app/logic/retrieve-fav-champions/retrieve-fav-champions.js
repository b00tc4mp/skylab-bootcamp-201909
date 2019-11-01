/**
 * Returns the favorite champions saved by the user
 * 
 * @param {String} id id of the user logged in
 * @param {String} token Token of the user logged in to retrieve user information and get fav champions
 * @param {Function} callback Expression that will return results
 * 
 * @returns returns Array with objects into objects of each favourite champion saved by the user and the information of each champion to render them
 * 
 */

function retrieveFavChampions(id, token, callback) {
    validate.string(id)
    validate.string.notVoid('id', id)
    validate.string(token)
    validate.string.notVoid('token', token)
    validate.function(callback)

    call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result => {
        if (result.error) return callback(new Error(result.error))

        const { data: { favs = [] } } = result

        let counter = 0, error

        if (favs.length)
            for (let i = 0; i < favs.length && !error; i++) {
                call('GET', undefined, `http://ddragon.leagueoflegends.com/cdn/9.21.1/data/en_US/champion/${favs[i]}.json`, undefined, result2 => {
                    if (result2.error) return callback(new Error(result2.error))
                    else {
                        result2 = Object.values(result2.data)
                        result2[0].icon = `https://ddragon.leagueoflegends.com/cdn/9.21.1/img/champion/${result2[0].image.full}`
                        result2[0].link = `http://ddragon.leagueoflegends.com/cdn/9.21.1/data/en_US/champion/${result2[0].id}.json`
                        result2[0].isFav = true

                        favs[i] = result2

                        if (++counter === favs.length) callback(undefined, favs)
                    }
                })
            }
        else callback (undefined, favs)
    })
}

