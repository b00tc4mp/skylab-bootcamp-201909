const http = require('http')

const urls = process.argv.slice(2)

urls.forEach(doRequest)

let results = []
let count = 0

function doRequest (url, index) {
  var result = ''
  http.get(url, onGet)

  function onGet (res) {
    res.setEncoding('utf8')
    res.on('data', (data) => {
      result += data
    })

    res.on('end', () => {
      results[index] = result
      count++

      if (count === urls.length) {
        results.forEach((item) => console.log(item))
      }
    })

    res.on('error', (err) => console.error(err))
  }
}
