function toggleFavChamp(userId, token, champId, callback) {
    // if (typeof id !== 'string') throw new TypeError(id + ' is not a string')
    // if (!id.trim().length) throw new ContentError('id is empty or blank')
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    if (!token.trim().length) throw new ContentError('token is empty or blank')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    
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
