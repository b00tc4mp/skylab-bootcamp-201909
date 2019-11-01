/**
 * retrieves a champion information like name, image, history, spells of league of legends game
 * 
 * @param {String} id  the id that was assigned to the user and get by authenticate user
 * @param {String} token the token that was assigned to the user and get by authenticate user
 * @param {String} link link given by other function that retrieves the champion information
 * @param {Expression} callback Expression that will return the result
 * 
 * @returns {Array} Array with objects the champion information
 */

function retrieveChampion(id, token, link, callback) {
    // validate.string(link)
    // validate.string.notVoid('link', link)
    // validate.function(callback)

    call('GET', undefined, link, undefined, function (result) {
        if (result.error)
            callback(new Error(result.error))
        else {

            result = Object.values(result.data)
            call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, users => {
                if (users.error) return callback(new Error(users.error))

                const { data: { favs = [] } } = users
                result.map(champ => {

                    champ.isFav = favs.includes(champ.id)
                    champ.icon = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`
                    champ.link = link

                }) 
                callback (undefined, result)

            }) 
        }
    })
}
