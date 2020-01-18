require('dotenv').config()
const express = require('express')
const { argv: [, , port], env: { PORT = port || 8080, DB_URL } } = process
const { name, version } = require('./package.json')
const cors = require('cors')
const { database } = require('baam-data')

const { users, games, cards } = require ('./routes')

const api = express()

api.use(cors())

api.use('/users', users)
api.use('/games', games)
api.use('/cards', cards)

database
    .connect(DB_URL)
    .then(() => api.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`)))