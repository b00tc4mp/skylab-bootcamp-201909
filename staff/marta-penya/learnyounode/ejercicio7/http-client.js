const http = require('http')

const { argv: [, , url] } = process

// const url = process.argv[2]

http.get(url, response => {
    response.setEncoding('utf8') //para pasarlo a string y evitar a toString()
    response.on('error', error => {throw error})
    response.on('data', data =>  { console.log(data) })  
})


// respuesta oficial

// 'use strict'
//     const http = require('http')
    
//     http.get(process.argv[2], function (response) {
//       response.setEncoding('utf8')
//       response.on('data', console.log)
//       response.on('error', console.error)
//     }).on('error', console.error)
