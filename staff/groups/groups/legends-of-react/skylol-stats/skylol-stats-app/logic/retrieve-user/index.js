function retrieveUser(id, token, callback) {
    validate.string(id)
    validate.string.notVoid('id', id)
    validate.string(token)
    validate.string.notVoid('token', token)
    validate.function(callback)

    call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result => {
        result.error ? callback(new Error(result.error)) : callback(undefined, result.data)
    })
}