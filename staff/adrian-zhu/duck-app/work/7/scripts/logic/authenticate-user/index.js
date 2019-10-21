function authenticateUser(email, password, callback) {
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    // pasar username: email => manu ! 
    call('POST', 'https://skylabcoders.herokuapp.com/api/auth', { username: email, password }, result => {
        if (result.error){
            callback(new Error(result.error)) // ESTE SPAN DE ERROR SI HAY ERROR
        }else {
            const { data: { id, token } } = result // SI NO HAY ERROR ME DE EL RESULTADO CON ID Y TOKEN

            callback(undefined, { id, token }) // UNDEFINED = ERROR , RESULTS = ID Y TOKEN
        }
    })
}

