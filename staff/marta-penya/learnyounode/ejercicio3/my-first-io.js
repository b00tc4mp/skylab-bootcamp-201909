const fs = require('fs')

let array = process.argv[2]

const text = fs.readFileSync(array).toString().split('\n')

result = text.length -1
console.log(result)


//usamos el split para separar, el \n es la condicion con la que queremos separar las lineas, en este caso mediante salto de linea que se representa asi, tostring lo usamos para convertir a formato string y poder usar el split, aplicamos el lenght -1 puesto que el ultimo valor de split ya no tendrá salto de linea pero nos lo contará. El Fs.readfiles pertenece a node y es un metodo para poder leer archivos, process.argv son los argumentos que nos pasarán para los cuales hay que contar los saltos de linea 

//resultado oficial

// 'use strict'
//     const fs = require('fs')
    
//     const contents = fs.readFileSync(process.argv[2])
//     const lines = contents.toString().split('\n').length - 1
//     console.log(lines)
    
    // note you can avoid the .toString() by passing 'utf8' as the
    // second argument to readFileSync, then you'll get a String!
    //
    // fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1
