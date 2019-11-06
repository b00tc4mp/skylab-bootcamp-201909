let sum = 0
const { argv: [, , ...arr] } = process
console.log(arr.reduce((a, b) => parseFloat(a) + parseFloat(b)))