let sum = 0
for (let a = 2; a < process.argv.length; a++) {
    sum += parseFloat(process.argv[a])
}

console.log(sum)