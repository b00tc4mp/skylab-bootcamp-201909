const http = require('http')
const bl = require('bl')

const { argv: [, , url] } = process

    
http.get(url, response => {
  response.pipe(bl((error, data) => {
    // if(error) return console.log(error)

    data = data.toString()
    console.log(data.length)
    console.log(data)
    }
  ))
})

// response.pipe(bl(function (err, data) { /* ... */ })) 

// método ‘pipe’. Este método nos permite encadenar diferentes streams para su manipulación por medio de cómputos. Lo que hace es recibir un streams de entrada, realiza una operación sobre dicho stream y devuelve un nuevo stream con dicha transformación.

// http.get(url, response => {
//     response.setEncoding('utf8')
//     response.on('data', data =>  { console.log(data) })  
// })
