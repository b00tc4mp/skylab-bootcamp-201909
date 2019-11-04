let array = process.argv
let sum = 0
for(let i = 2; i < array.length; i++){
    sum += Number(array[i])
}
console.log(sum)


//resultado oficial

  
// let result = 0
    
// for (let i = 2; i < process.argv.length; i++) {
//   result += Number(process.argv[i])
// }

// console.log(result)