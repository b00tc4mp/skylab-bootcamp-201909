const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function(taskId){
    return(async()=>{
        const response = await fetch(`${REACT_APP_API_URL}/tasks/${taskId}` , {
            method: 'DELETE'
        })
        if(response.status !== 200){
            const { error } = await response.json()
            throw new Error (error)
        }else{
            return await response.json()
        }
    })()
}
