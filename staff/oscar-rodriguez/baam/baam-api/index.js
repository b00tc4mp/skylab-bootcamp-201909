require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()
const tokenVerifier = require('./helpers/token-verifier')
const jwt = require('jsonwebtoken')
const { name, version } = require('./package.json')
const { argv: [, , port], env: { PORT = port || 8080, DB_URL } } = process
const {registerUser, authenticateUser, retrieveUser } = require ('./logic')
const cors = require('./utils/cors')
const { database } = require('baam-data')
const { errors: { ConflictError } } = require('../baam-util')

const api = express()

api.use(cors)

api.options('*', cors, (req, res) => {
    res.end()
})

api.post('/users', jsonBodyParser, (req, res) => {
    const { body: { name, surname, email, nickname, password } } = req

    try {
        registerUser(name, surname, email, nickname, password)
            .then(() => res.status(201).end())
            .catch(error => {
                const { message } = error

                if (error instanceof ConflictError)
                    return res.status(409).json({ message })
                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }

})

api.post('/auth', jsonBodyParser, (req, res)=> {
    const { body : { nickname, password}} = req

    try {
        authenticateUser(nickname, password)
            .then (id=> {
                const token = jwt.sign({sud: id}, SECRET, {expiresIn: '1d'})
                res.json({token})
            })
            .catch (error => {
                const {message}=error

                if (error instanceof CredentialsError)
                    return res.status(401).json({message})

                res.status(500).json({message})
            })
    } catch ({message}) {
        res.status(400).json({message})
    }
})

api.get('/users', tokenVerifier, (req, res) => {
    try {
        const { id } = req

        retrieveUser(id)
            .then(user => res.json({ user }))
            .catch(error => {
                const { message } = error
                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })
                res.status(500).json({ message })

            })
    } catch ({message}) {
        res.status(400).json({ message })
    }
})

database
    .connect(DB_URL)
    .then(() => api.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`)))