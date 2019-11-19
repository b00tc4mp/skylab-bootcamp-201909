require('dotenv').config()
const { env : { DB_URL , PORT } } = process
const { database } = require('data')
const { name , version } = require('./package')

const express = require('express')
const cors = require('cors')
const routes = require('./routes')

database.connect(DB_URL)
    .then(() => {
        const app = express()
        app.use(cors())
        app.use('/api' , routes)    
        app.listen(PORT , ()=> console.log(`${name} ${version} up and running on port ${PORT}`))
    })

process.on('SIGINT' , ()=>{
    console.log(`${name} ${version} shutting down, disconnecting db...`)
    database.disconnect()
    process.exit(0)
})
