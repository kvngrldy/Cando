import React, { useState, useEffect } from 'react'
import socket from '../config/socket'
import { useHistory } from 'react-router-dom'

export default function Room() {
  
  const [roomData, setRoomData] = useState([])
  const [chats, setChats] = useState([])
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [typingNames, setTypingNames] = useState('')
  const history = useHistory()

  socket.on('room-detail', (roomDetail) => {
    setRoomData(roomDetail)
    setChats(roomDetail.messages)
    console.log(roomDetail, `detail`)
    // console.log(roomDetail);
  })

  useEffect (() => {
    console.log('tessssss')
  }, [roomData])

  

  const exitRoom = () => {
    // console.log(roomData);
    const payload = {
      roomName: roomData.name,
      exitUser: roomData.users.filter(user => user.name === localStorage.name)
      // exitUser bisa pertimbangkan pake ID langsung jadi lebih unique
    }

    socket.emit('exit-room', payload)
    socket.emit('typing-stop')
    history.push('/')
  }

  const inputMessage = (e) => {
    setMessage(e.target.value)
    if (message) {
      const payload = {
        name: localStorage.name,
        room: roomData.name
      }
      socket.emit('typing-start', payload)
    } 
    // console.log(message==='');
    if (e.target.value === '') {
      socket.emit('typing-stop')
    }
  }

  socket.on('typing-start', (data) => {
    if(data !== localStorage.name) {
      setIsTyping(true)
      setTypingNames(data)
    }
  })

  socket.on('typing-stop', _ => {
    setIsTyping(false)
  })

  const sendMessage = () => {
    // console.log(message);
    const payload = {
      roomName: roomData.name,
      sender: localStorage.name,
      message
    }
    socket.emit('send-message', payload)
    socket.emit('typing-stop')
    
    setMessage('')
  }


  return (
    <div>
      <p>{roomData.name}</p>
      <input type="button" value="Exit" onClick={() => exitRoom()} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '70%',
          margin: 'auto'
        }}
      >
        <div>
          <label htmlFor="">Joined Users</label>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {
              roomData.users && roomData.users.map((u, index) => (
                <div key={index}>
                  <label htmlFor="">{u.name}</label>
                </div>
              ))
            }
          </div>
        </div>
        <div>
          <div>
            <input type="text" value={message} onChange={inputMessage} />
            <input type="button" value="Send" onClick={() => sendMessage()} />
            {
              isTyping && <p>{typingNames} is typing...</p>
            }
          </div>
          <div>
            {
              // chats && JSON.stringify(chats)
              chats && chats.map((m, index) => (
                <div key={index}>
                  <label htmlFor="">{m.sender}</label>
                  <p>{m.message}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
