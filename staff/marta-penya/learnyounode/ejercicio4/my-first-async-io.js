const fs = require('fs')

let array = process.argv[2]

// const text = fs.readFile(array).toString().split('\n')

// result = text.length -1
// console.log(result)


function linesCounter() {
  fs.readFile(array, (error, array) =>  {
    console.log(array.toString().split('\n').length-1)
      
    })
}

linesCounter()

//resultado oficial

// 'use strict'
//     const fs = require('fs')
//     const file = process.argv[2]
    
//     fs.readFile(file, function (err, contents) {
//       if (err) {
//         return console.log(err)
//       }
//       // fs.readFile(file, 'utf8', callback) can also be used
//       const lines = contents.toString().split('\n').length - 1
//       console.log(lines)
//     })
