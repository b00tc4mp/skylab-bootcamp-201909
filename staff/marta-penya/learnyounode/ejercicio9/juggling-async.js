// const http = require('http')
// const bl = require('bl')

// const { argv: [, , url1, url2, url3] } = process

// http.get(url1, response => {
//     response.pipe(bl((error, data) => {
//       // if(error) return console.log(error)
  
//       data = data.toString()
//       console.log(data)
//       http.get(url2, response => {
//         response.pipe(bl((error, data) => {
//           // if(error) return console.log(error)
      
//           data = data.toString()
//           console.log(data)
//           http.get(url3, response => {
//             response.pipe(bl((error, data) => {
//               // if(error) return console.log(error)
          
//               data = data.toString()
//               console.log(data)
//               }
//             ))
//           })
//           }
//         ))
//       })
//       }
//     ))
//   })


 //oficial result

//  'use strict'
//  const http = require('http')
//  const bl = require('bl')
//  const results = []
//  let count = 0
 
//  function printResults () {
//    for (let i = 0; i < 3; i++) {
//      console.log(results[i])
//    }
//  }
 
//  function httpGet (index) {
//    http.get(process.argv[2 + index], function (response) {
//      response.pipe(bl(function (err, data) {
//        if (err) {
//          return console.error(err)
//        }
 
//        results[index] = data.toString()
//        count++
 
//        if (count === 3) {
//          printResults()
//        }
//      }))
//    })
//  }
 
//  for (let i = 0; i < 3; i++) {
//    httpGet(i)
//  }


