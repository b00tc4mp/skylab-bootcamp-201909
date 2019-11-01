/**
 * Authenticates the identity of the user by their email and password
 * 
 * @param {String} email the email that the user was registered in
 * @param {String} password the password that the user was registered in
 * @param {Function} callback  expression that will return the result of authenticate user
 * @return {String} returns the id and token of the user
 */

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