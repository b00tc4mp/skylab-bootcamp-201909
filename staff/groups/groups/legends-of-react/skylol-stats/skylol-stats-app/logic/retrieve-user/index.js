/**
 * retrieves the info of the user to update, delete or read
 * 
 * @param {String} id the id that was assigned to the user and get by authenticate user
 * @param {String} token the token that was assigned to the user and get by authenticate user
 * @param {Function} callback will return the result of retrieveuser
 * 
 * @returns {Object} object with all data saved of the user like favs, name, email
 */

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