const net = require('net')

const port = process.argv[2]

const server = net.createServer((socket) => {
  const date = new Date()

  socket.write(formatDate(date))
  socket.end('\n')
})

function formatDate (date) {
  let month = d2(date.getMonth() + 1)
  let day = d2(date.getDate())
  let hours = d2(date.getHours())
  let minutes = d2(date.getMinutes())

  return `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}`
}

function d2 (number) {
  if (number < 10) {
    number = `0${number}`
  }

  return number
}

server.listen(port)
