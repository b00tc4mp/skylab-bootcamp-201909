const fs = require('fs')
const { argv } = process

//************* with flags into methos ****************** */
/* conts text = fs.readFileSync(process.argv[2], { encoding: 'utf8' })
console.log(text) */


//************* with .toString() ****************** */
const text = fs.readFileSync(argv[2]).toString()
const textSplited = text.split('\n')

console.log(textSplited.length - 1)