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
                                <div className="chat-online-box">
                                    <div className="chat-online">
                                        <h2>MEETING ROOM</h2>
                                    </div>
                                    <div className="people-box">
                                        <div className="online">
                                            <img className="profile-picture" alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvyDUUx4x7Iu6xetTkfi_LwDDzfNnJDn-S0Q&usqp=CAU" />
                                            <p className="name">Gregorius Eldwin Pradipta</p>
                                        </div>
                                        <div className="online">
                                            <img className="profile-picture" alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvyDUUx4x7Iu6xetTkfi_LwDDzfNnJDn-S0Q&usqp=CAU" />
                                            <p className="name">Kevin Geraldy</p>
                                        </div>
                                        <div className="online">
                                            <img className="profile-picture" alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvyDUUx4x7Iu6xetTkfi_LwDDzfNnJDn-S0Q&usqp=CAU" />
                                            <p className="name">Theodorus Arie Sugiharto</p>
                                        </div>
                                        <div className="online">
                                            <img className="profile-picture" alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvyDUUx4x7Iu6xetTkfi_LwDDzfNnJDn-S0Q&usqp=CAU" />
                                            <p className="name">Roy Willis</p>
                                        </div>
                                        <div className="online">
                                            <img className="profile-picture" alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvyDUUx4x7Iu6xetTkfi_LwDDzfNnJDn-S0Q&usqp=CAU" />
                                            <p className="name">Handana Williyantoro</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="chat-division">
                                    <div className="chat-app-box">
                                        
                                    </div>
                                    <div className="chat-bar-box">
                                        <div className="chat-bar">
                                        <div className="chat">
                                            <input className="textbox" type="text" placeholder="Enter message here..." />
                                            <button className="send" >SEND</button>
                                        </div>
                                        </div>
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
