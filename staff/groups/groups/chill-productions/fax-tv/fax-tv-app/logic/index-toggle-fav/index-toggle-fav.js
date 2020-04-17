function toggleFav(idUser, token, favs, callback) {
    validate.string(idUser)
    validate.string.notVoid('id',idUser)
    validate.string(token)
    validate.typeOf('object',favs)
    validate.string.notVoid('token',token)
    validate.function(callback)
    
    call('PUT', token, `https://skylabcoders.herokuapp.com/api/user/${idUser}`, favs, (result) => {
        result.error ? callback(new Error(result.error)) : callback(undefined, result.status)
    })
}