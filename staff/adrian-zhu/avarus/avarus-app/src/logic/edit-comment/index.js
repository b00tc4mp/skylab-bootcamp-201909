import call from '../../utils/call'
const { validate, errors: { CredentialsError, NotFoundError } } = require('avarus-util')
const API_URL = process.env.REACT_APP_API_URL

/**
 *
 * edit-user
 * 
 * @param {token} string
 * @param {email} string
 * @param {password} string
 * @param {verifiedPassword} string
 * 
 */


export default  function (commentId, newBody) {

    validate.string(commentId)
    validate.string.notVoid('commentId', commentId)

    if(newBody){

        validate.string(newBody)
        validate.string.notVoid('newBody', newBody)

    }

    return (async () => {
        
        const res = await call(`${API_URL}/comments`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({commentId, newBody })
        })

        if (res.status === 200)  return
        
        if (res.status === 400) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()

}