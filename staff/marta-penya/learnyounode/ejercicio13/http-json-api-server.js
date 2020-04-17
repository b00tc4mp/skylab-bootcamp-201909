const http = require('http'),
    url = require('url'),
    { argv: [, , port = 8080] } = process

const server = http.createServer((req, res) => {
    const { method } = req

    if (method === 'GET') {
        debugger

        const { pathname, query: { iso } } = url.parse(req.url, true)

        if (pathname === '/api/parsetime') {
            if (!iso) return res.end('Sorry, buddy, you have forgotten to send me the ISO date .P')

            const date = new Date(iso)

            const hour = date.getHours()
            const minute = date.getMinutes()
            const second = date.getSeconds()

            const json = JSON.stringify({ hour, minute, second })

            res.writeHead(200, { 'Content-Type': 'application/json' })

            res.end(json)
        } else if (pathname === '/api/unixtime') {
            if (!iso) return res.end('Sorry, buddy, you have forgotten to send me the ISO date .P')

            const date = new Date(iso)

            const json = JSON.stringify({ unixtime: date.getTime() })

            res.writeHead(200, { 'Content-Type': 'application/json' })

            res.end(json)
        } else res.end('Sorry, buddy, I do not have this endpoint .P')

    } else res.end('I only work with GET, buddy .P')
})

server.listen(port)

//respuesta oficial

// 'use strict'
// const http = require('http')

// function parsetime (time) {
//   return {
//     hour: time.getHours(),
//     minute: time.getMinutes(),
//     second: time.getSeconds()
//   }
// }

// function unixtime (time) {
//   return { unixtime: time.getTime() }
// }

// const server = http.createServer(function (req, res) {
//   const parsedUrl = new URL(req.url, 'http://example.com')
//   const time = new Date(parsedUrl.searchParams.get('iso'))
//   let result

//   if (/^\/api\/parsetime/.test(req.url)) {
//     result = parsetime(time)
//   } else if (/^\/api\/unixtime/.test(req.url)) {
//     result = unixtime(time)
//   }

//   if (result) {
//     res.writeHead(200, { 'Content-Type': 'application/json' })
//     res.end(JSON.stringify(result))
//   } else {
//     res.writeHead(404)
//     res.end()
//   }
// })
// server.listen(Number(process.argv[2]))
