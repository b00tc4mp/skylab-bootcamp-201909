function registerUser(name, surname, email, password, callback) {
    const favorites = [], rating = []
    validate.string(name)
    validate.string.notVoid('name',name)
    validate.string(surname)
    validate.string.notVoid('surname',surname)
    validate.string(email)
    validate.string.notVoid('e-mail',email)
    validate.string(password)
    validate.string.notVoid('password',password)
    validate.array(favorites)
    validate.array(rating)
    validate.function(callback)

    call('POST', undefined, 'https://skylabcoders.herokuapp.com/api/user', { name, surname, username: email, password, favorites, rating }, result => {
        result.error ? callback(new Error(result.error)) : callback();
    })
}