function authenticateUser(email, password, callback) {
    validate.string(email)
    validate.string.notVoid('email', email)
    validate.string(password)
    validate.string.notVoid('password', password)
    validate.function(callback)
   
    call('POST', undefined, 'https://skylabcoders.herokuapp.com/api/auth', { username: email, password }, result => {
        result.error ? callback(new Error(result.error)) : callback(undefined, result.data)
    })
}