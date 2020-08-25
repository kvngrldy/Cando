
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import logodark from '../assets/logo-dark.png'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import socket from '../config/socket'
import { getKanbanData } from '../store/actions/kanbanActions'


function Sidebar({ roomData }) {
    //INGAT DISABLE BUTTON KLAU UDAH MASUK
    const baseUrl = 'http://localhost:3001'
    const location = useLocation()


    const dispatch = useDispatch()
    const [rooms, setRooms] = useState([])
    let [token, setToken] = useState('')
    let [department, setDepartment] = useState()
    let history = useHistory()
    let [departmentName, setDepartmentName] = useState('')
    let [allUser, setAllUser] = useState('')
    let [allCategory, setAllCategory] = useState('')
    // console.log(department, `<<<`)

    useEffect(() => {
        socket.emit('get-rooms')
    }, [])
    useEffect(() => {
        axios({
            method: 'get',
            url: `${baseUrl}/data/userData`,
            headers: {
                token
            }
        })
            .then(data => {
                setDepartment(data.data.userDept)
            })
            .catch(err => console.log)
    }, [token])

    socket.on('updated-rooms', (rooms) => {
        setRooms(rooms)
    })


    function joinRoom(roomName) {

        if (roomData) {
            const payloadExit = {
                roomName: roomData.name,
                exitUser: roomData.users.filter(user => user.name === localStorage.name)
            }
            socket.emit('exit-room', payloadExit)
        }
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
        else {
            setToken(data)
        }
    }

    function logout(event) {
        event.preventDefault()

        if (roomData) {
            const payload = {
                roomName: roomData.name,
                exitUser: roomData.users.filter(user => user.name === localStorage.name)
            }
            socket.emit('exit-room', payload)
            localStorage.removeItem('token')
            history.push("/login")
        } else {
            localStorage.removeItem('token')
            history.push("/login")
        }

    }

    function departmentDetail(id, roomName) {
        if (roomData) {
            const payload = {
                roomName: roomData.name,
                exitUser: roomData.users.filter(user => user.name === localStorage.name)
            }
            socket.emit('exit-room', payload)
            dispatch(getKanbanData(id, token))

            history.push('/')

        } else {
            dispatch(getKanbanData(id, token))

            history.push('/')
        }
    }
    function userProfile() {
        if (roomData) {
            const payload = {
                roomName: roomData.name,
                exitUser: roomData.users.filter(user => user.name === localStorage.name)
            }
            socket.emit('exit-room', payload)


            history.push('/userProfile')

        } else {
            history.push('/userProfile')
        }

    }

    function adminPage() {
        history.push('/adminPage')
    }

    return (
        <div className="board-sidebar">
            <div className="icon-sidebar">
                <Image src={logodark} fluid />
            </div>


            <div className="menu-sidebar " style={{ height: '90%' }}>
                <div className="chatroom-menu">
                    <div className="menu-title  ml-3">
                        <p className="text-muted">YOUR CHATROOM</p>
                    </div>
                    <div className="div-room-text">
                        <h2 onClick={() => joinRoom('roomForAll')} className="room-text"><i class="far fa-comment-alt"></i> Room for All</h2>
                    </div>
                    {
                        department && department.map((room, index) => (
                            <div className="div-room-text" key={index}>

                                <h2 onClick={() => joinRoom(room.name)} className={location.pathname == `/room/${room.name}` ? 'room-text not-active' : 'room-text'}><i class="far fa-comment-alt"></i> {room.name}</h2>
                            </div>
                        ))
                    }

                </div>


                <div className="kanban-menu">
                    <div className="menu-title  ml-3">
                        <p className="text-muted ">DEPARTEMEN</p>
                    </div>
                    {
                        department && department.map(dept => (
                            <div className="div-room-text">
                                <h2 onClick={() => departmentDetail(dept.id)} className="room-text"><i class="far fa-clipboard"></i> {dept.name}</h2>
                            </div>
                        ))
                    }
                </div>
                <div className="kanban-menu">
                    <div className="menu-title  ml-3">
                        <p className="text-muted ">SETTING</p>
                    </div>
                    <div className="div-room-text">
                        <h2 onClick={() => userProfile()} className="room-text"><i class="far fa-address-card"></i> Profile</h2>
                    </div>
                </div>

                <div className="kanban-menu">
                    <div className="div-room-text">
                        <h2 onClick={(event) => logout(event)} className="room-text"><i class="fas fa-sign-out-alt"></i> Logout</h2>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Sidebar
