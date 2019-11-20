const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * retrieves all tasks for a user
 * 
 * @returns{Promise}
 */

export default function(){
    return( async ()=> {
        const list = await fetch(`${REACT_APP_API_URL}/users/tasks` , {
            method: 'GET',
            headers : {'authorization' : `bearer ${this.__token__}`}
        })
        if(list.status !== 200){
            const { error } = await list.json()
            throw new Error (error)
        }
        else{
            const { tasks } = await list.json()
            
            return tasks
        }
    })()
}