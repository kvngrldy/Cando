// const http = require('./bin/http')
const createRoom = require('./helpers/rooms')
const io = require('socket.io')()
const axios = require('axios')
let rooms = createRoom()


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
                    url: 'http://localhost:3003/',
                    data: {
                        msg: message
                    }
                })
                    .then(({ data }) => {
                        console.log(data.response, `<<<<`)

                        rooms[roomIndex].messages.unshift({
                            sender: 'Alfred',
                            imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/31BU0Ja-p8L._SY355_.jpg',
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
            rooms[roomIndex].messages.unshift({
                sender: 'Bot',
                message: `${data.exitUser[0].name} has left room`,
                imageUrl: 'https://s3.envato.com/files/263450170/LP_06.jpg'
            })



            if (remainUsers.length === 0) {
                rooms[roomIndex].messages = []
            }

            io.sockets.in(data.roomName).emit('room-detail', rooms[roomIndex])
        })
        socket.leave(data.roomName, () => {
            io.emit('updated-rooms', rooms)
        })
    })

    socket.on('typing-start', ({ name, room }) => {
        socket.join(room, () => {
            io.sockets.in(room).emit('typing-start', name)
        })
    })

    socket.on('typing-stop', _ => {
        socket.broadcast.emit('typing-stop')
    })
})

module.exports = io