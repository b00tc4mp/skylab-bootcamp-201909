const { argv: [, , port] } = process
const map = require('through2-map')
const http = require('http')

const server = http.createServer((request, response) => {
    if (request.method !== 'GET') response.end('only GET mate')
    const url = request.url

    if (url.startsWith('/api/parsetime')) {
        const text = url.slice(url.indexOf('=') + 1, url.length)
        let time = {
            "hour": text.slice(12, 14),
            "minute": text.slice(15, 17),
            "second": text.slice(18, 20)
        }
        response.end(JSON.stringify(time))
    } else if (url.startsWith('/api/unixtime')) {
        const text = url.slice(url.indexOf('=') + 1, url.length).slice(0, 10).replace('-', '.').replace('-', '.')
        let unix = { "unixtime": parseInt((new Date(text).getTime() / 1000).toFixed(0)) }

        response.end(JSON.stringify(unix))
    } else {
        response.end('wrong url mate')
    }
    request.pipe(map((chunk) => { return chunk.toString().toUpperCase() })).pipe(response)
})
server.on('error', error => { throw error })
server.listen(port)


/* 
/api/parsetime?iso=2013-08-10T12:10:15.474Z
     
{  
       "hour": 14,  
       "minute": 23,  
       "second": 15  
     }  
    

/api/parsetime?iso=8934579

{ "unixtime": 1376136615474 }   */