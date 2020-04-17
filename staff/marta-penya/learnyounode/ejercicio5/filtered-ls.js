const fs = require('fs')
const path = require('path')

fs.readdir(process.argv[2], (error, list) => {
    result = list.forEach(filename => {
        if(path.extname(filename) === '.' + process.argv[3]){
            console.log(filename)
        }})
}) 


//   The fs.readdir() method takes a pathname as its first argument and a  
//   callback as its second. The callback signature is:  
   
//      function callback (err, list) { /* ... */ }  
   
//   where list is an array of filename strings.  
  
// var path = require('path');
// //Return the extension:
// var ext = path.extname('/Users/Refsnes/demo_path.js');
// console.log(ext) -> .js

//resultado oficial

// 'use strict'
// const fs = require('fs')
// const path = require('path')

// const folder = process.argv[2]
// const ext = '.' + process.argv[3]

// fs.readdir(folder, function (err, files) {
//   if (err) return console.error(err)
//   files.forEach(function (file) {
//     if (path.extname(file) === ext) {
//       console.log(file)
//     }
//   })
// })

