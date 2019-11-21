const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * retrieves a user
 * 
 * @returns{Promise}
 */

export default function(){
    return(async ()=>{
        const user = await fetch(`${REACT_APP_API_URL}/users` , {
            method: 'GET',
            headers : {'authorization' : `bearer ${this.__token__}`}
        })
        if(user.status !== 200){
            const { error } = await user.json()
            throw new Error (error)
        }else{
            return await user.json()
        }
    })()
}