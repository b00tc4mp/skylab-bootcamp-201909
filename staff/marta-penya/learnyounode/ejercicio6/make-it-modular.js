const mymodule = require('./mymodule.js')

const { argv: [, , directory, filter] } = process

// const directory = process.argv[2]
// const filter = process.argv[3]


mymodule(directory, filter, (error, list) => {
    if (error) return console.error(error)
    else{    
       list.forEach(file => console.log(file))            
    }
})
         

//solución oficial

// 'use strict'
// const filterFn = require('./solution_filter.js')
// const dir = process.argv[2]
// const filterStr = process.argv[3]

// filterFn(dir, filterStr, function (err, list) {
//   if (err) {
//     return console.error('There was an error:', err)
//   }

//   list.forEach(function (file) {
//     console.log(file)
//   })
// })
