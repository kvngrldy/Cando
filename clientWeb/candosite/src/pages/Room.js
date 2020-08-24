import React, { useState, useEffect } from 'react'
import socket from '../config/socket'
import { useHistory } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import ChatBoard from '../components/ChatBoard'
import { useSelector } from 'react-redux'

function Room() {
  const [roomData, setRoomData] = useState([])
  const [chats, setChats] = useState([])
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [typingNames, setTypingNames] = useState('')
  const history = useHistory()




  socket.on('room-detail', (roomDetail) => {
    setRoomData(roomDetail)

    // console.log(roomDetail, `detail`)

  })

  useEffect(() => {
    setChats(roomData.messages)

  }, [roomData])



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
    if (data !== localStorage.name) {
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
    <div className="board-background">
      <div className="board-container">
        <div className="board-display">
          <Sidebar roomData={roomData}></Sidebar>
          <div className="chat-section">
            <ChatBoard roomData={roomData} chats={chats} ></ChatBoard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Room
