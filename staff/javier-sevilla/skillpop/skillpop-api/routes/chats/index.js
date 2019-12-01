const { Router } = require('express')
const { createChat, removeChat, registerChats, retrieveChat, retrieveChats, addMessage } = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('skillpop-util')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.post('/:idUser', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { id, params: { idUser } } = req

        createChat(id, idUser)
            .then(id => res.status(201).json({ id }))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})





module.exports = router