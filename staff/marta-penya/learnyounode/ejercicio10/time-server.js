const net = require('net')
const strftime = require('strftime') 
const { argv: [, , portNumber] } = process


const server = net.createServer( function listener (socket) { 
   
    socket.end(strftime('%Y-%m-%d %H:%M')+ '\n')
    
} )
server.listen(Number(portNumber))



//we only need to write data and then close the socket.

// not required in browsers
    // console.log(strftime('%B %d, %Y %H:%M:%S')) // => April 28, 2011 18:21:08
    // console.log(strftime('%F %T', new Date(1307472705067))) // => 2011-06-07 18:51:45

    // "2013-07-06 17:42"

    //https://github.com/samsonjs/strftime 

//respuesta oficial

// 'use strict'
// const net = require('net')

// function zeroFill (i) {
//   return (i < 10 ? '0' : '') + i
// }

// function now () {
//   const d = new Date()
//   return d.getFullYear() + '-' +
//     zeroFill(d.getMonth() + 1) + '-' +
//     zeroFill(d.getDate()) + ' ' +
//     zeroFill(d.getHours()) + ':' +
//     zeroFill(d.getMinutes())
// }

// const server = net.createServer(function (socket) {
//   socket.end(now() + '\n')
// })

// server.listen(Number(process.argv[2]))
