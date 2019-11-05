const fs = require('fs')
const { argv } = process

fs.readFile(argv[2], (err, data) => {
    if (err) throw err
    else {
        const textSplited = data.toString().split('\n')
        console.log(textSplited.length - 1)
    }
})