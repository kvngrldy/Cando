// Semangat the pake bcrypt js ya
const express = require('express')
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const PORT = process.env.PORT || 3001
const cors = require('cors')
const createRoom = require('./helpers/rooms')

const errHandler = require('./middleware/errorHandler')
const bodyParser = require('body-parser');
const homeRoute = require('./routes/homeRoute');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(homeRoute)

app.use(errHandler)

let rooms = createRoom()

io.sockets.on('connection', socket => {

  socket.on('echo', function (msg, callback) {
    callback = callback || function () { };
    socket.emit('echo', msg)
    callback(null, "Done.")
  })



  socket.on('get-rooms', () => {
    // console.log(rooms);
    io.emit('updated-rooms', rooms)
  })
  socket.on('create-room', (data) => {
    socket.join(data)
    const newRoom = {
      name: data.roomName,
      admin: data.admin,
      users: [],
      messages: []
    }
    rooms.push(newRoom)
    // console.log(rooms);
    io.emit('updated-rooms', rooms)
  })
  socket.on('join-room', (data) => {
    // console.log(socket.id, data);
    socket.join(data.roomName, () => {
      const roomIndex = rooms.findIndex(room => room.name === data.roomName)
      // console.log(rooms[roomIndex].users);
      rooms[roomIndex].users.push({
        name: data.username,
        index: !rooms[roomIndex].users.length ? 0 : rooms[roomIndex].users[rooms[roomIndex].users.length - 1].index + 1
      })
      // console.log(rooms, 'ini join room');
      io.sockets.in(data.roomName).emit('room-detail', rooms[roomIndex])
      io.emit('updated-rooms', rooms)
    })

  })

  socket.on('send-message', (data) => {
    socket.join(data.roomName, () => {
      const roomIndex = rooms.findIndex(room => room.name === data.roomName)

      const { sender, message } = data

      rooms[roomIndex].messages.push({
        sender,
        message
      })
      // console.log(data);
      io.sockets.in(data.roomName).emit('room-detail', rooms[roomIndex])
    })
  })

  socket.on('exit-room', (data) => {
    socket.leave(data.roomName, () => {
      const roomIndex = rooms.findIndex(room => room.name === data.roomName)
      const remainUsers = rooms[roomIndex].users.filter(user => user.index !== data.exitUser[0].index)
      rooms[roomIndex].users = remainUsers
      // console.log(rooms, 'ini exit room');
      if (remainUsers.length === 0) {
        rooms[roomIndex].messages = []
      }

      io.sockets.in(data.roomName).emit('room-detail', rooms[roomIndex])
      io.emit('updated-rooms', rooms)
    })
  })

  socket.on('typing-start', ({ name, room }) => {
    // console.log(data);
    // console.log(name, room);
    socket.join(room, () => {
      // console.log(name);
      io.sockets.in(room).emit('typing-start', name)
    })
  })

  socket.on('typing-stop', _ => {
    socket.broadcast.emit('typing-stop')
  })
})



if (process.env.NODE_ENV != 'test') {
  server.listen(PORT, (req, res) => {
    console.log(`listening to port: ${PORT}`)
  })
}
// else {
//     app.listen(port, (req, res) => {
//         console.log(`listening to port: ${port}`)
//     })
// }

module.exports = { app, server }