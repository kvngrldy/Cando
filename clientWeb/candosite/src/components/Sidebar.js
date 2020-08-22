
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import logo from '../assets/logo.png'

function Sidebar() {

    let history = useHistory()

    function goToPage(page) {
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
                    <div >
                        <h2 onClick={() => goToPage('/room')} className="room-text">MEETING ROOM 1</h2>
                    </div>
                    <div>
                        <h2 onClick={() => goToPage('/room')} className="room-text">MEETING ROOM 2</h2>
                    </div>
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
