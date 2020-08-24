const io = require('socket.io-client')
// const serverIo = require('../server')(3001)
// const server = require('../bin/http')
const server = require('../socketConfig')
server.attach(3010)



describe('Suite of unit tests', function () {

  // let sender;
  // let receiver;
  let socket;

  beforeEach(function (done) {
    // Setup
    socket = io.connect('http://localhost:3010', {
      'reconnection delay': 0
      , 'reopen delay': 0
      , 'force new connection': true
    });

    socket.on('connect', function () {
      console.log('worked...');
      done();
    });
    socket.on('disconnect', function () {
      console.log('disconnected...');
    })


    // receiver = io.connect('http://localhost:3001', {
    //   'reconnection delay': 0
    //   , 'reopen delay': 0
    //   , 'force new connection': true
    // });
    // receiver.on('connect', function () {
    //   console.log('worked...');
    //   done();
    // });
    // receiver.on('disconnect', function () {
    //   console.log('disconnected...');
    // })




    // socket = io.connect('http://localhost:3001', {
    //   'reconnection delay': 0
    //   , 'reopen delay': 0
    //   , 'force new connection': true
    // });

    // socket.on('connect', function () {
    //   console.log('worked...');
    //   done();
    // });
    // socket.on('disconnect', function () {
    //   console.log('disconnected...');
    // })
  });

  afterEach(function (done) {
    // Cleanup
    if (socket.connected) {
      console.log('disconnecting...');
      socket.disconnect();
    } else {
      // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
      console.log('no connection to break...');
    }

    // if (receiver.connected) {
    //   console.log('disconnecting...');
    //   receiver.disconnect();
    // } else {
    //   // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
    //   console.log('no connection to break...');
    // }

    // sender.disconnect()
    // receiver.disconnect()
    done();
  });

  describe('Room tests', function () {

    // test('echo', (done) => {
    //   socket.emit('echo')
    //   socket.on('echo', (data) => {
    //     expect(data).toBe('masuk echo')
    //     done()
    //   })
    // })

    // test('Client Receive Hello World', function (done) {
    //   socket.emit('message', 'Hello World')
    //   socket.on('message', function (msg) {
    //     expect(msg).toBe('Hello World')
    //     done()
    //   })
    // })




    test('get all rooms', (done) => {
      socket.emit('get-rooms')
      socket.on('updated-rooms', (data) => {
        expect(data).toBeInstanceOf(Array)
        done()
      })
    })

    test('create room', (done) => {
      const data = {
        roomName: 'Teknologi Informasi',
        admin: 'admin',
      }

      socket.emit('create-room', data)

      socket.on('updated-rooms', dataRes => {
        expect(dataRes).toBeInstanceOf(Array)
        expect(dataRes[0]).toBeInstanceOf(Object)
        expect(dataRes[0]).toHaveProperty('name')
        expect(dataRes[0]).toHaveProperty('admin')
        expect(dataRes[0]).toHaveProperty('users')
        expect(dataRes[0]).toHaveProperty('messages')
        expect(dataRes[0].name).toBe(data.roomName)
        expect(dataRes[0].admin).toBe(data.admin)
        done()
      })
    })

    test('join in a room', (done) => {
      const data = {
        roomName: 'Teknologi Informasi',
        username: 'Budi'
      }

      socket.emit('join-room', data)

      socket.on('room-detail', dataRes => {
        console.log(dataRes);
        expect(dataRes).toBeInstanceOf(Object)
        expect(dataRes).toHaveProperty('name')
        expect(dataRes).toHaveProperty('admin')
        expect(dataRes).toHaveProperty('users')
        expect(dataRes).toHaveProperty('messages')
        expect(dataRes.name).toBe(data.roomName)
        expect(dataRes.users[0]).toEqual(
          expect.objectContaining({
            name: data.username
          })
        )
        done()
      })
    })

    test('exit from a room', (done) => {
      const data = {
        roomName: 'Teknologi Informasi',
        exitUser: [
          {
            name: 'Budi',
            index: 0
          }
        ]
      }
      socket.emit('exit-room', data)

      socket.on('room-detail', dataRes => {
        expect(dataRes).toBeInstanceOf(Object)
        expect(dataRes).toHaveProperty('name')
        expect(dataRes).toHaveProperty('admin')
        expect(dataRes).toHaveProperty('users')
        expect(dataRes).toHaveProperty('messages')
      })
      socket.on('updated-rooms', dataRes => {
        expect(dataRes).toBeInstanceOf(Array)
        expect(dataRes[0].users).not.toBe(data.exitUser[0].name)
        done()
      })

    })
  })

  describe('Chat tests', function () {
    test('Sending message to the chat', (done) => {
      const data = {
        roomName: 'Teknologi Informasi',
        sender: 'Budi',
        message: 'test message'
      }

      socket.emit('send-message', data)

      socket.on('room-detail', dataRes => {
        expect(dataRes).toBeInstanceOf(Object)
        expect(dataRes).toHaveProperty('name')
        expect(dataRes).toHaveProperty('admin')
        expect(dataRes).toHaveProperty('users')
        expect(dataRes).toHaveProperty('messages')
        expect(dataRes.messages).not.toHaveLength(0);
        expect(dataRes.messages).toBeInstanceOf(Array)
        expect(dataRes.messages[0]).toBeInstanceOf(Object)
        expect(dataRes.messages[0]).toEqual(
          expect.objectContaining({
            sender: data.sender,
            message: data.message
          })
        )
        done()
      })
    })

    test('Show typing message', (done) => {
      let payload = {
        room: 'Teknologi Informasi',
        name: 'Budi'
      }
      socket.emit('typing-start', payload)

      socket.on('typing-start', data => {
        expect(data).toBe(payload.name)
        done()
      })
    })
  })

})


