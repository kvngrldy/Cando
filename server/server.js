const http = require('./bin/http')
const createRoom = require('./helpers/rooms')
// const server = require('http').createServer(app)
const io = require('socket.io')(http)
// const PORT = process.env.PORT || 3001
let rooms = createRoom()

io.on('connection', socket => {

    socket.on('echo', function (msg, callback) {
        callback = callback || function () { };
        socket.emit('echo', 'masuk echo')
        callback(null, "Done.")
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
        socket.join(data.roomName, () => {
            // console.log(data);
            const roomIndex = rooms.findIndex(room => room.name === data.roomName)
            const remainUsers = rooms[roomIndex].users.filter(user => user.index !== data.exitUser[0].index)
            rooms[roomIndex].users = remainUsers
            // console.log(rooms, 'ini exit room');
            if (remainUsers.length === 0) {
                rooms[roomIndex].messages = []
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
})
