function registerUser(name, surname, email, summoner, password, callback) {
    validate.string(name)
    validate.string.notVoid('name', name)
    validate.string(surname)
    validate.string.notVoid('surname', surname)
    validate.string(summoner)
    validate.string.notVoid('summoner', summoner)
    validate.string(email)
    validate.string.notVoid('email', email)
    validate.string(password)
    validate.string.notVoid('password', password)
    validate.function(callback)

    call('POST', undefined, 'https://skylabcoders.herokuapp.com/api/user', { name, surname, summoner, username: email, password }, result => {
        result.error ? callback(new Error(result.error)) : callback();
    })
}