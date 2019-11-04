//   You must write a module file (mymodule.js) to do most of the work. The  
//   module must export a single function that takes three arguments: the  
//   directory name, the element extension string and your callback function,  
//   in that order. Don't alter the element extension string in any way before  
//   passing it to your module.  

const path = require('path')
const fs = require('fs')



module.exports = function(directory, filter, callback){
    fs.readdir(directory, (error, list) => {
        if(error) return callback(error) 
        else{ 
            result = list.filter(element => {
                return path.extname(element) === '.' + filter
        })}
        callback(null, result) 
    }) 
}


//solución oficial


// 'use strict'
// const fs = require('fs')
// const path = require('path')

// module.exports = function (dir, filterStr, callback) {
//   fs.readdir(dir, function (err, list) {
//     if (err) {
//       return callback(err)
//     }

//     list = list.filter(function (file) {
//       return path.extname(file) === '.' + filterStr
//     })

//     callback(null, list)
//   })
// }

