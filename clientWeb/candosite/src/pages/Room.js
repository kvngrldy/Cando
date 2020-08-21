import React from 'react'
import { useHistory } from 'react-router-dom'

function Room() {

    let history = useHistory()

    function goToPage(page) {
        history.push(page)
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
                                <button className="logout-btn">LOGOUT</button>
                            </div>
                        </div>
                    </div>
                    <div className="chat-section">
                        <div className="chat-board">
                            <div className="chat-box">
                                <div>
                                    <div className="chat-online">

                                    </div>
                                </div>
                                <div>
                                    <div className="chat">

                                    </div>
                                    <div className="chat-bar">

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

export default Room
