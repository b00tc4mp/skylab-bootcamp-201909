// Write an HTTP server that serves the same text file for each request it  
// receives.  
 
// Your server should listen on the port provided by the first argument to  
// your program.  
 
// You will be provided with the location of the file to serve as the second  
// command-line argument. You must use the fs.createReadStream() method to  
// stream the file contents to the response.  
 
const http = require('http')
const fs = require('fs')

const { argv: [, , portNumber, file] } = process


const server = http.createServer(function callback (request, response) { 
    response.writeHead(200, { 'content-type': 'text/plain' })
    var readStream = fs.createReadStream(file)
    readStream.pipe(response)
    //fs.createReadStream(file).pipe(response)
})
server.listen(Number(portNumber))



// //callback from create server :  Where the two arguments are objects representing the HTTP request and the  
//   corresponding response for this request. request is used to fetch properties, such as the header and query-string from the request while response is for sending data to the client, both headers and body
// Both request and response are also Node streams! Which means that you can use the streaming abstractions to send and receive data if they suit your use-case. 

// The fs core module also has some streaming APIs for files. You will need  
//   to use the fs.createReadStream() method to create a stream representing  
//   the file you are given as a command-line argument. The method returns a  
//   stream object which you can use src.pipe(dst) to pipe the data from the  
//   src stream to the dst stream. In this way you can connect a filesystem  
//   stream with an HTTP response stream. 

//src.pipe(dst); is the same as saying source.pipe(destination); same as saying fileStream.pipe(httpResponseStream)

//respuesta oficial
// 'use strict'
// const http = require('http')
// const fs = require('fs')

// const server = http.createServer(function (req, res) {
//   res.writeHead(200, { 'content-type': 'text/plain' })

//   fs.createReadStream(process.argv[3]).pipe(res)
// })

// server.listen(Number(process.argv[2]))

//res.writeHead(200, { 'content-type': 'text/plain' }), explicación: 
//Means Write Header of Response

// The first argument of the res.writeHead() method is the status code, 200 means that all is OK, 404 is page not found, the second argument is an object containing the response headers. Sends a response header to the request. 

// The status code is a 3-digit HTTP status code, like 404. The last argument, headers, are the response headers. Optionally one can give a human-readable statusMessage as the second argument.

// ejemplo:  res.writeHead(200, {'Content-Type': 'text/plain'});