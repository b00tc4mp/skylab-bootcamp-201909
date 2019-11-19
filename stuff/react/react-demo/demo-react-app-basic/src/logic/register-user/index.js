import utils from 'utils'

const { validate } = utils

const REACT_APP_API_URL = process.env.REACT_APP_API_URL
/**
 * Register a tutor
 * 
 * @param {string} username 
 * @param {string} email 
 * @param {string} password 
 * @param {string} repassword 
 * 
 * @returns {Promise}
 */

export default function (username , email, password , repassword) {
    
    validate.string(username, 'username')
    validate.string(email, 'email')
    validate.email(email, 'email')
    validate.string(password, 'password')
    validate.string(repassword, 'repassword')
    
    if(password !== repassword) throw new Error ("passwords don't match")

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ username , email, password })
        })
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            return await response.json()
        }   
    })()
}