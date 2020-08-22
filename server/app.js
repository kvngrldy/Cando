const express = require('express')
const app = express();
 const server = require('http').createServer(app)
 const io = require('socket.io')(server)
 const PORT = process.env.PORT || 3001
const cors = require('cors')
const createRoom = require('./helpers/rooms')
const errHandler = require('./middleware/errorHandler')


// const bodyParser = require('body-parser');
const homeRoute = require('./routes/homeRoute');
const axios = require('axios')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.use(homeRoute)

app.use(errHandler)

let rooms = [{
  name: 'bot playground',
  admin: 'Alfred',
  users: [],
  messages: []
}]

io.on('connection', socket => {

  // socket.on('join-room', room => {
  //   socket.join(room)
  // })

  // socket.on('message', ({ room, message }) => {
  //   socket.to(room).emit("message", {
  //     message,
  //     name: 'Budi'
  //   })
  // })

  // socket.on('typing', ({ room }) => {
  //   socket.to(room).emit('typing', 'Someone is typing')
  // })

  // socket.on('stop-typing', ({ room }) => {
  //   socket.to(room).emit('stop-typing')
  // })

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

      let { sender, message } = data

      rooms[roomIndex].messages.push({
        sender,
        message
      })
      //`@alfred Tambah Laptop Sebanyak 30 harganya 500000 gambarnya dari sini https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/laptops/MSI_GS70_2QE_STEALTH_PRO/MSI_GS70_2QE_STEALTH_PRO_L_1.jpg  1`
      let forAlfred = message.split(' ')
      io.sockets.in(data.roomName).emit('room-detail', rooms[roomIndex])
      
      if (forAlfred[0] == '@alfred') {
        forAlfred.splice(0, 1)
         message = forAlfred.join(' ')
         console.log(message, `< ini balasan user`)
         axios({
          method: 'post',
          url: 'http://localhost:3003/',
          data: {
            msg: message
          }
        })
          .then(({ data }) => {
            console.log(data.response, `<<<<`)

            rooms[roomIndex].messages.push({
              sender: 'Alfred',
              message: data.response
            })
          })
          .then(() => {
            io.sockets.in(data.roomName).emit('room-detail', rooms[roomIndex])
          })
          .catch(console.log) 
      }
    })
  })

  socket.on('exit-room', (data) => {
    socket.join(data.roomName, () => {
      const roomIndex = rooms.findIndex(room => room.name === data.roomName)
      const remainUsers = rooms[roomIndex].users.filter(user => user.index !== data.exitUser[0].index)
      rooms[roomIndex].users = remainUsers
      // console.log(rooms, 'ini exit room');
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

//   })

//   socket.on('send-message', (data) => {
//     console.log('masuk socket on Send0Message1');
//     socket.join(data.roomName, () => {
//       console.log('masuk socket on Send-Message2');
//       const roomIndex = rooms.findIndex(room => room.name === data.roomName)

//       const { sender, message } = data

//       rooms[roomIndex].messages.push({
//         sender,
//         message
//       })
//       // console.log(data);
//       io.sockets.in(data.roomName).emit('room-detail', rooms[roomIndex])
//     })
//   })

//   socket.on('exit-room', (data) => {
//     console.log('masuk socket on exit-room1');
//     socket.join(data.roomName, () => {
//       // console.log(data);
//       console.log('masuk socket on exit-room2');
//       const roomIndex = rooms.findIndex(room => room.name === data.roomName)
//       const remainUsers = rooms[roomIndex].users.filter(user => user.index !== data.exitUser[0].index)
//       rooms[roomIndex].users = remainUsers
//       // console.log(rooms, 'ini exit room');
//       if (remainUsers.length === 0) {
//         rooms[roomIndex].messages = []
//       }
//       // console.log(rooms[roomIndex]);
//       io.sockets.in(data.roomName).emit('room-detail', rooms[roomIndex])
//     })
//     socket.leave(data.roomName, () => {
//       io.emit('updated-rooms', rooms)
//     })
//   })

//   socket.on('typing-start', ({ name, room }) => {
//     console.log('masuk socket on typing-start');
//     socket.join(room, () => {
//       // console.log(name);
//       io.sockets.in(room).emit('typing-start', name)
//     })
//   })

//   socket.on('typing-stop', _ => {
//     console.log('masuk socket on typing-stop');
//     socket.broadcast.emit('typing-stop')
//   })
// })

// if (process.env.NODE_ENV != 'test') {
//   server.listen(PORT, (req, res) => {
//     console.log(`listening to port: ${PORT}`)
//   })
// }


// app.listen(PORT, (req, res) => {
//   console.log(`listening to port :${PORT}`)
// })


