const net = require('net')
console.log(process.argv)
const port = process.argv[2] 
const server = net.createServer((socket)=> {
    const date = new Date,
    year = date.getFullYear(),
    month = date.getMonth(), // empieza en 0
    day = date.getDate(), // devuelve día del mes, empieza en 1
    hours = date.getHours(),
    inutes = date.getMinutes()
    socket.end()

})
server.listen(port)