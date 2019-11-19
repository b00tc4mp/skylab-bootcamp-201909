import utils from 'utils'
const { validate } = utils

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function(category , description){
    validate.string(category , "category")
    validate.string(description , "description")

    return(async()=>{
        const response = await fetch(`${REACT_APP_API_URL}/tasks` , {
            method: 'POST',
            headers: {'authorization' : `bearer ${this.__token__}` , 'content-type' : 'application/json'},
            body: JSON.stringify({ category , description })
        })
        
        if(response.status !== 201){
            const { error } = await response.json()
            throw new Error (error)
        }else{
            return await response.json()
        }
    })()
}