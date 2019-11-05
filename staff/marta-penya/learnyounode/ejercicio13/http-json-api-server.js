const http = require('http')

const { argv: [, , portNumber] } = process

const server = http.createServer(function callback (request, response) { 
    const { method, url } = request

    if(method === 'GET'){
        if(url.startsWith('/api/parsetime')){

        } else if (url.startsWith('/api/unixtime')){

        } else response.end('Sorry, buddy, I do not have this endpoint')

    } else response.end('I only work with GET, buddy :P')

 

})
server.listen(Number(portNumber))


req.url