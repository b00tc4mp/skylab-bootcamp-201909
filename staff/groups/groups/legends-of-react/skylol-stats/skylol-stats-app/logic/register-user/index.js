/**
 * Registers the user with the parametres provided 
 * 
 * @param {String} name the name that the user wants to be registered
 * @param {String} surname the surname that the user wants to be registered
 * @param {String} summoner the summoner that the user wants to be registered
 * @param {String} email the email that the user wants to be registered
 * @param {String} password the password that the user wants to be registered
 * @param {Function} callback expression that will return the result of register user
 * 
 * @return {String} returns an error if the status is KO
 */

function registerUser(name, surname, summoner, email, password, callback) {
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