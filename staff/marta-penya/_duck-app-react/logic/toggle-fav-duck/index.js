function toggleFavDuck(id, token, duckId, callback) {
    if (typeof id !== 'string') throw new TypeError(id + ' is not a string')
    if (!id.trim().length) throw new ContentError('id is empty or blank')
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    if (!token.trim().length) throw new ContentError('token is empty or blank')
    if (typeof duckId !== 'string') throw new TypeError(duckId + ' is not a string')
    if (!duckId.trim().length) throw new ContentError('duck id is empty or blank')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result => {
        if (result.error) return callback(new Error(result.error))

        const { data: { favs = [] } } = result

        if(favs === undefined) favs = []

        const index = favs.findIndex(fav => fav === duckId)

        index > -1 ? favs.splice(index, 1) : favs.push(duckId)

        call('PUT', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, { favs }, result => { debugger
            result.error ? callback(new Error(result.error)) : callback()
        })
    })
}

//para enviar nuevos datos como favs al usuario lo pasas por el body