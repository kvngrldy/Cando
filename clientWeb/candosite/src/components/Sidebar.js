
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import logo from '../assets/logo.png'

import socket from '../config/socket'


function Sidebar({roomData}) {
    //INGAT DISABLE BUTTON KLAU UDAH MASUK
    const [rooms, setRooms] = useState([])
    let history = useHistory()
    
    useEffect(() => {
        socket.emit('get-rooms')
    }, [])
    
    socket.on('updated-rooms', (rooms) => {
        setRooms(rooms)
    })

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
    
    function joinRoom(roomName) {
        // console.log(`mau join di ${roomName}`);

        const payload = {
          roomName,
          username: localStorage.name
        }
        socket.emit('join-room', payload)
        history.push(`/room/${roomName}`)
    }

    function goToPage(page) {
        const payload = {
            roomName: roomData.name,
            exitUser: roomData.users.filter(user => user.name === localStorage.name)
            
          }
        socket.emit('exit-room', payload)
        history.push(page)
    }

    useEffect(() => {
        checkAuthentication()
    }, [])

    async function checkAuthentication() {
        let data = await localStorage.getItem('token')
        if (!data || data === null) {
            history.push('/login')
        }
    }

    function logout(event) {
        event.preventDefault()
        localStorage.removeItem('token')
        history.push("/login")
        const payload = {
            roomName: roomData.name,
            exitUser: roomData.users.filter(user => user.name === localStorage.name)
            
          }
        socket.emit('exit-room', payload)
    }

    return (
        <div className="board-sidebar">
            <div className="icon-sidebar">
                <Image src={logo} fluid />
            </div>
            <div className="menu-sidebar mx-4" style={{ height: '90%' }}>
                <div className="chatroom-menu mb-5">
                    <div className="menu-title">
                        <p className="text-muted">YOUR CHATROOM</p>
                    </div>
                    {
                        rooms && rooms.map((room, index) => (
                            <div key={index}>
                                <h2 onClick={() => joinRoom(room.name)} className="room-text">{room.name}</h2>
                            </div>
                        ))
                    }
                     
                </div>
                <div className="kanban-menu">
                    <div className="menu-title">
                        <p className="text-muted">TASKBOARD</p>
                    </div>
                    <div>
                        <h2 onClick={() => goToPage('/')} className="room-text">KANBAN</h2>
                    </div>
                </div>
                <div className="logout-menu">

                    <button onClick={(event) => logout(event)} className="logout-btn">LOGOUT</button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
