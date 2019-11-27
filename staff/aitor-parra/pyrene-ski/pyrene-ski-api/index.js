require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const { registerUser, authenticateUser, retrieveUser } = require('./logic')
const jwt = require('jsonwebtoken')
const { argv: [, , port], env: { SECRET, PORT = port || 8080, DB_URL } } = process
const tokenVerifier = require('./helpers/token-verifier')(SECRET)
const cors = require('./utils/cors')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('pyrene-ski-util')
const { database } = require('pyrene-ski-data')


const api = express()

const jsonBodyParser = bodyParser.json()

api.use(cors)

api.options('*', cors, (req, res) => {
    res.end()
})

api.post('/users', jsonBodyParser, (req, res) => {
    const { body: { name, surname, email, username, password } } = req

    try {
        registerUser(name, surname, email, username, password)
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

api.post('/auth', jsonBodyParser, (req, res) => {
    const { body: { username, password } } = req

    try {
        authenticateUser(username, password)
        .then(id => {
            const token = jwt.sign({ sub: id }, SECRET, { expiresIn: '1d' })

            res.json({ token })
        })
        .catch(error => {
            const { message } = error

            if (error instanceof CredentialsError)
                return res.status(401).json({ message })
            
                res.status(500).json({ message })
        })
    } catch ({ message }) {
        res.status(400).json({ message })
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
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

api.post('/team', tokenVerifier, jsonBodyParser, (req, res) => {
    try {

        createTeam()

    } catch ({}) {

    }

})

api.get('/team', tokenVerifier, (req, res) => {
    try {

        removeTeam()

    } catch ({}) {

    }

})



api.post('/lesson', tokenVerifier, jsonBodyParser, (req, res) => {
    try {

        addLesson()

    } catch ({}) {

    }

})

api.get('/lesson', tokenVerifier, (req, res) => {
    try {

        deleteLesson()

    } catch ({}) {

    }

})

api.get('/listlesson', tokenVerifier, (req, res) => {
    try {

        listLesson()

    } catch ({}) {

    }

})

api.post('/bookleeson', tokenVerifier, (req, res) => {
    try {

        bookLesson()

    } catch ({}) {

    }

})





















