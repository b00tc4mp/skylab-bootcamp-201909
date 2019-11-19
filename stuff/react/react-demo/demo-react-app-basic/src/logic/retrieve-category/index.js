const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * retrieves all tasks for a user
 * 
 * @returns{Promise}
 */

export default function(){
    return( async ()=> {
        const categories = await fetch(`${REACT_APP_API_URL}/category` , {
            method: 'GET',
            headers : {'authorization' : `bearer ${this.__token__}`}
        })
        if(categories.status !== 200){
            const { error } = await categories.json()
            throw new Error (error)
        }
        else{
            const { categories } = await categories.json()
            debugger
            return categories
        }
    })()
}