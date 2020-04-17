/**
 * Saves the favourite champion the user chooses into user information
 * 
 * @param {String} userId the id that was assigned to the user and get by authenticate user
 * @param {String} token the token that was assigned to the user and get by authenticate user
 * @param {String} champId the id of the champion that the user wants to set the favourite property
 * @param {Function} callback Expression that will return the result
 * 
 * @returns {Object} if the status is KO returns an error, else nothing
 */


function toggleFavChamp(userId, token, champId, callback) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    validate.string(token)
    validate.string.notVoid('token', token)
    validate.string(champId)
    validate.string.notVoid('userId', champId)
    validate.function(callback)
    
    call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${userId}`, undefined, users => {
        if (users.error) return callback(new Error(users.error))

        const { data: { favs = [] } } = users

        favs.includes(champId) ? favs.splice(favs.indexOf(champId), 1) : favs.push(champId)

        const body = { favs }

        call('PUT', token, `https://skylabcoders.herokuapp.com/api/user/${userId}`, body, result => {
            result.error ? callback(new Error(result.error)) : callback()
        })
    })
}
