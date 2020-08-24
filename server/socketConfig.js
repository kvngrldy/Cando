// const http = require('./bin/http')
const createRoom = require('./helpers/rooms')
const io = require('socket.io')()
const axios = require('axios')
let rooms = createRoom()

// const createRoom = require('./helpers/rooms')
// const server = require('http').createServer()
// const io = require('socket.io')(http)
// const axios = require('axios')
// const PORT = process.env.PORT || 3001
// let rooms = createRoom()




io.on('connection', socket => {

    socket.on('message', function (msg) {

        io.emit('message', msg)

    })


    socket.on('get-rooms', () => {

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
        socket.join(data.roomName, () => {
            const roomIndex = rooms.findIndex(room => room.name === data.roomName)

            rooms[roomIndex].users.push({
                name: data.username,
                index: !rooms[roomIndex].users.length ? 0 : rooms[roomIndex].users[rooms[roomIndex].users.length - 1].index + 1
            })

            rooms[roomIndex].messages.unshift({
                sender: 'Bot',
                message: `${data.username} has joined the room`,
                imageUrl: 'https://vignette.wikia.nocookie.net/hitchhikers/images/7/70/Rubberduck.jpg/revision/latest?cb=20190126010351'
            })

            io.sockets.in(data.roomName).emit('room-detail', rooms[roomIndex])
            io.emit('updated-rooms', rooms)

        })

    })



    socket.on('send-message', (data) => {
        socket.join(data.roomName, () => {
            const roomIndex = rooms.findIndex(room => room.name === data.roomName)
            // console.log(data, `<<<<<<<<`)
            let { sender, message, imageUrl } = data

            rooms[roomIndex].messages.unshift({
                sender,
                message,
                imageUrl
            })
            let forAlfred = message.split(' ')
            io.sockets.in(data.roomName).emit('room-detail', rooms[roomIndex])

            if (forAlfred[0] == '@alfred') {
                forAlfred.splice(0, 1)
                forAlfred.push(data.roomName)
                message = forAlfred.join(' ')
                
                console.log(message, `< ini balasan user`)
                axios({
                    method: 'post',
                    url: 'http://localhost:3001/data/alfredatyourservice',
                    data: {
                        msg: message
                    }
                })
                    .then(({ data }) => {
                        console.log(data, `<<<<`)

                        rooms[roomIndex].messages.unshift({
                            sender: 'Alfred',
                            imageUrl: 'https://i.pinimg.com/564x/8a/72/b6/8a72b661a6aa5084a691a27320d7577d.jpg',
                            message: data.response
                        })
                    })
                    .then(() => {
                        io.sockets.in(data.roomName).emit('room-detail', rooms[roomIndex])
                        io.emit('add-alfred-notif')
                        io.broadcast.emit('update-data')
                    })
                    .catch(console.log)
            }


        })
    })

    socket.on('exit-room', (data) => {
        socket.join(data.roomName, () => {
            // console.log(data);
            const roomIndex = rooms.findIndex(room => room.name === data.roomName)
            const remainUsers = rooms[roomIndex].users.filter(user => user.index !== data.exitUser[0].index)
            rooms[roomIndex].users = remainUsers
            // console.log(data, '<<<<<<<<<<<<<<<<<<,ini exit room');

            rooms[roomIndex].messages.unshift({
                sender: 'Bot',
                message: `${data.exitUser[0].name} has left room`,
                imageUrl: 'https://s3.envato.com/files/263450170/LP_06.jpg'
            })
            
            if (rooms[roomIndex].name !== 'roomForAll') {
                if (remainUsers.length === 0) {
                    rooms[roomIndex].messages = []
                }
            }
            // console.log(rooms[roomIndex]);
            io.sockets.in(data.roomName).emit('room-detail', rooms[roomIndex])
        })
        socket.leave(data.roomName, () => {
            io.emit('updated-rooms', rooms)
        })
    })

    socket.on('typing-start', ({ name, room }) => {
        socket.join(room, () => {
            // console.log(name);
            io.sockets.in(room).emit('typing-start', name)
        })
    })

    socket.on('typing-stop', _ => {
        socket.broadcast.emit('typing-stop')
    })

    socket.on('update-data', _ => {
        socket.broadcast.emit('update-data')
    })

    socket.on('add-alfred-notif', _ => {
       socket.broadcast.emit('add-alfred-notif')
    })
})



module.exports = io