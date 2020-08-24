const server = require('./socketConfig')
const http = require('./bin/http')
server.attach(http)






// const createRoom = require('./helpers/rooms')
// const server = require('http').createServer()
// const io = require('socket.io')(http)
// const axios = require('axios')
// const PORT = process.env.PORT || 3001
// let rooms = createRoom()


