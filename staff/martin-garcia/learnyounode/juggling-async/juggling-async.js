const http = require('http')
const { BufferList } = require('bl')
const bl = new BufferList()
const { argv: [, , ...urls] } = process
const auxArr = []
let count = 1

urls.forEach((url, index) => {
    http.get(url, response => {
        response.setEncoding('utf8')
        response.on('data', (data) => {
            bl.append(data)
        })

        response.on('end', () => {
            if (index === count) {
                console.log('index' + index)
                console.log('count' + count)
                auxArr[index] = bl.toString()
                count++
            }
            count === urls.length // && auxArr.forEach(ele => console.log(ele))
                //else count++ 

            //auxArr.length === urls.length && auxArr.forEach(ele => console.log(ele))
        })

    }).on('error', console.error)
})