const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * retrieves all tasks for a user
 * 
 * @returns{Promise}
 */

export default function(){
    return( async ()=> {
        const responses = await fetch(`${REACT_APP_API_URL}/category` , {
            method: 'GET',
            headers : {'authorization' : `bearer ${this.__token__}`}
        })
        if(responses.status !== 200){
            const { error } = await responses.json()
            throw new Error (error)
        }
        else{
            const { categories } = await responses.json()
            
            return categories
        }
    })()
}