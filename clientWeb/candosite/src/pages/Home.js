import React, { useState,  useEffect } from 'react'
import { useHistory } from 'react-router-dom'

function Home() {

    useEffect(() => {
        checkAuthentication()
    }, [])

    let history = useHistory()

    function goToPage(page) {
        history.push(page)
    }

    async function checkAuthentication() {
        let data = await localStorage.getItem('token')
        if(!data || data === null){
            history.push('/login')
        }
    }

    function logout(event){
        event.preventDefault()
        localStorage.removeItem('token')
        history.push("/login")
    }

    return (
        <div className="board-background">
            <div className="board-container">
                <div className="board-display">
                    <div className="board-sidebar">
                        <div className="title-section">
                            <h2 className="room-title">CANDO</h2>
                        </div>
                        <div style={{ height: '90%' }}>
                            <div style={{ marginTop: '20%' }} className="room-section">
                                <h2 onClick={() => goToPage('/')} className="room-text">KANBAN</h2>
                            </div>
                            <div className="room-section">
                                <h2 onClick={() => goToPage('/room')} className="room-text">MEETING ROOM 1</h2>
                            </div>
                            <div className="room-section">
                                <h2 onClick={() => goToPage('/room')} className="room-text">MEETING ROOM 2</h2>
                            </div>
                            <div className="room-section">
                                <button onClick={(event) => logout(event)} className="logout-btn">LOGOUT</button>
                            </div>
                        </div>
                    </div>
                    <div className="main-content">
                        <div className="main-section">
                            <div className="kanban-section">
                                <div className="kanban-board">
                                    <div className="kanban-title">
                                        <p>BACKLOG</p>
                                    </div>
                                    <div className="kanban-body">

                                    </div>
                                </div>
                                <div className="kanban-board">
                                    <div className="kanban-title">
                                        <p>DEVELOPMENT</p>
                                    </div>
                                    <div className="kanban-body">

                                    </div>
                                </div>
                                <div className="kanban-board">
                                    <div className="kanban-title">
                                        <p>PRODUCTION</p>
                                    </div>
                                    <div className="kanban-body">

                                    </div>
                                </div>
                                <div className="kanban-board">
                                    <div className="kanban-title">
                                        <p>DONE</p>
                                    </div>
                                    <div className="kanban-body">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
