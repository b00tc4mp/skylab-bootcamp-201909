const { Router } = require('express')
const { addComment, retrieveComments } = require('../../logic')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError } } = require('gamerex-util')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.post('/:gameId', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { params: { gameId }, id, body: { body } } = req

        addComment(gameId, id, body)
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

router.get('/:gameId', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { params: { gameId } } = req

        retrieveComments(gameId)
            .then(comments => res.json(comments))
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