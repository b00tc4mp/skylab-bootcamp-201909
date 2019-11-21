import utils from 'utils'

const { validate } = utils

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Updates a student
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} birthdate 
 * @param {string} healthcard 
 * 
 * @returns {Promise}
 */

export default function(taskId , category , description ,status){

    validate.string(taskId, 'taskId')
    validate.string(category, 'category')
    validate.string(description, 'description')
    validate.boolean(status, 'status')

    const data = {category , description ,status}

    return(async () =>{
        const response = await fetch(`${REACT_APP_API_URL}/tasks/${taskId}` , {
            method: 'PATCH',
            headers: { 'content-type' : 'application/json' },
            body: JSON.stringify(data)
        })
        if(response.status !== 200){
            const { error } = await response.json()
            throw new Error(error)
        }else{
            return await response.json()
        }
    })()
}