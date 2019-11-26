require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const { argv: [, , port], env: { PORT = port || 8080, DB_URL } } = process
const cors = require('./utils/cors')
const { database } = require('wheely-data')
const { users, practices } = require('./routes')

const api = express()

api.use(cors)
api.options('*', cors, (req, res) => {
  res.end()
})
api.use('/users', users)
api.use('/practices', practices)

database
  .connect(DB_URL)
  .then(() => api.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`)))
