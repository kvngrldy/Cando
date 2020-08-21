import React, { useState, useEffect } from 'react'
import socket from '../config/socket'
import { useHistory } from 'react-router-dom'

export default function Home() {
  const [roomName, setRoomName] = useState('')
  const [rooms, setRooms] = useState([])
  const history = useHistory()

  const roomNameChange = (e) => {
    setRoomName(e.target.value)
  }

  useEffect(() => {
    socket.emit('get-rooms')
  }, [])

  function addRoom(e) {
    e.preventDefault()

    let payload = {
      roomName,
      admin: localStorage.name
    }

    // option: masukin room data ke database !!!
    socket.emit('create-room', payload)
    setRoomName('')
  }

  function joinRoom(roomName) {
    // console.log(`mau join di ${roomName}`);
    const payload = {
      roomName,
      username: localStorage.name
    }
    socket.emit('join-room', payload)
    history.push(`/room/${roomName}`)
  }

  socket.on('updated-rooms', (rooms) => {
    setRooms(rooms)
  })

  return (
    <div>
      <p>ini Home</p>
      <div>
        <p>Bikin Room</p>
        <input type="text" value={roomName} onChange={roomNameChange} />
        <input type="button" value="add" onClick={(e) => addRoom(e)} />
      </div>
      <div>
        {
          rooms && rooms.map((room, index) => (
            <div key={index}>
              <p>{room.name}</p>
              <input type="button" value="join" onClick={() => joinRoom(room.name)} />
            </div>
          ))
        }
      </div>
    </div>
  )
}
