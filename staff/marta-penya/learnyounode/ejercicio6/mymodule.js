//   You must write a module file (mymodule.js) to do most of the work. The  
//   module must export a single function that takes three arguments: the  
//   directory name, the filename extension string and your callback function,  
//   in that order. Don't alter the filename extension string in any way before  
//   passing it to your module.  
const path = require('path')


module.exports = function(directory, filter, callback){
    fs.readdir(directory, (error, list) => {
        if(error) return console.error(error) 
        else{ 
            result = list.forEach(filename => {
            if(path.extname(filename) === filter){
                console.log(filename)
            }
        })}
        callback(null, data) 
    }) 
}



// function bar (callback) {  
//     foo(function (err, data) {  
//       if (err) { return callback(err) } // early return  
    
//       // ... no error, continue doing cool things with `data`  
    
//       // all went well, call callback with `null` for the error argument  
    
//       callback(null, data)  
//     })  
//   } 


//You must accept a directory, a filter and a callback.
