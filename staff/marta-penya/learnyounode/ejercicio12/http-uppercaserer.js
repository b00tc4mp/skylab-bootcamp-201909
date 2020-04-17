// While you're not restricted to using the streaming capabilities of the  
//   request and response objects, it will be much easier if you do.  
   
//   There are a number of different packages in npm that you can use to  
//   "transform" stream data as it's passing through. For this exercise the  
//   through2-map package offers the simplest API.  
   
//   through2-map allows you to create a transform stream using only a single  
//   function that takes a chunk of data and returns a chunk of data. It's  
//   designed to work much like Array#map() but for streams:  
   
//      const map = require('through2-map')  
//      inStream.pipe(map(function (chunk) {  
//        return chunk.toString().split('').reverse().join('')  
//      })).pipe(outStream)  
   
//   In the above example, the incoming data from inStream is converted to a  
//   String (if it isn't already), the characters are reversed and the result  
//   is passed through to outStream. So we've made a chunk character reverser!  
//   Remember though that the chunk size is determined up-stream and you have  
//   little control over it for incoming data.

// Write an HTTP server that receives only POST requests and converts  
// incoming POST body characters to upper-case and returns it to the client.  
 
// Your server should listen on the port provided by the first argument to  
// your program. 

const http = require('http')
const map = require('through2-map')

const { argv: [, , portNumber] } = process

const server = http.createServer(function callback (request, response) { 
    const { method } = request

    if(method === 'POST'){
        let content = ''

        request.on('data', chunk => content += chunk)

        request.on('end', ()=> response.end(content.toUpperCase()))

    } else response.end('I only work with POST, buddy :P')

 

})
server.listen(Number(portNumber))

//respuesta oficial

// 'use strict'
// const http = require('http')
// const map = require('through2-map')

// const server = http.createServer(function (req, res) {
//   if (req.method !== 'POST') {
//     return res.end('send me a POST\n')
//   }

//   req.pipe(map(function (chunk) {
//     return chunk.toString().toUpperCase()
//   })).pipe(res)
// })

// server.listen(Number(process.argv[2]))
