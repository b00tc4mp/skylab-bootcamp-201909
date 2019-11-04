const mymodule = require('./mymodule.js')
const directory = process.argv[2]
const filter = '.' + process.argv[3]


mymodule(directory, filter, callback)


