const logic = require('../../logic')
const jwt = require('jsonwebtoken')
const { env : { JWT_SECRET } } = process

module.exports = function(req , res){
    const { body : { email , password } } = req

    try{
        logic.authenticateUser(email,password)
            .then(id =>{
                const token = jwt.sign({ sub:id } , JWT_SECRET)
                res.status(200).json({ message: "user correctly authenticated" , token})
            })
            .catch(({ message }) => res.status(401).json({ error : message }))
    }catch({ message }){
        res.status(401).json({ error : message })
    }
}