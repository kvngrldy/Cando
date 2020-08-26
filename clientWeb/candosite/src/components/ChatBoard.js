import React, { useState } from 'react'
import OnlineMember from '../components/OnlineMember'
import ChatBubble from '../components/ChatBubble'
import InputEmoji from "react-input-emoji";
import socket from '../config/socket'

function Chatboard({ roomData, chats }) {
    const [text, setText] = useState("");
    //const [message]
    function handleOnEnter(text) {
        console.log("enter", text);
        const payload = {
            roomName: roomData.name,
            sender: localStorage.name,
            position: localStorage.position,
            message: text,
            imageUrl: localStorage.imageUrl
        }
        socket.emit('send-message', payload)
    }

    return (



        <div className="chat-board" style={{ marginLeft: '4rem' }}>
            <div className="chat-box">
                <div className="chat-online-box">
                    <div className="chat-online">

                        <strong><h3>{roomData.name === 'roomForAll' ? 'All' : roomData.name}</h3></strong>
                    </div>
                    <div className="people-box mx-3">

                        <div className="menu-title mt-4">
                            <p className="text-muted ">IN THIS ROOM</p>
                        </div>
                        <div className="online">
                            <img className="profile-picture" alt="" src="https://i.pinimg.com/564x/8a/72/b6/8a72b661a6aa5084a691a27320d7577d.jpg" />
                            <div className="name-dot">
                                <p className="name">Alfred</p>
                                <div className="dot-orange"></div>
                            </div>
                        </div>
                        {roomData.users && roomData.users.map(user => (
                            <OnlineMember user={user}></OnlineMember>
                        ))}


                    </div>
                </div>
                <div className="chat-division">
                    <div className="chat-app-box">

                        {chats && chats.map((chat) => (
                            <ChatBubble chat={chat} ></ChatBubble>
                        ))}
                        {/* {
                            JSON.stringify(chats)
                        } */}

                        <div className="comment mx-3 my-3">
                            <div className="avatar-comment" href="#">
                                <img
                                    src="https://i.pinimg.com/564x/8a/72/b6/8a72b661a6aa5084a691a27320d7577d.jpg"
                                    width="35"
                                    style={{ borderRadius: '50%' }}
                                    alt="Profile Avatar"
                                    title="Anie Silverston"
                                />
                            </div>
                            <div className="ini-test">
                                <div className="username">
                                    <h6>Alfred</h6>
                                </div>
                                <div className="comment-content">
                                    <p>Welcome to the meetingroom! 🦇</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="chat-bar-box">
                        <div className="chat-bar">
                            <div className="chat">
                                <InputEmoji
                                    value={text}
                                    onChange={setText}
                                    cleanOnEnter
                                    maxLength='500'

                                    onEnter={handleOnEnter}
                                    placeholder="Type a message"
                                    borderColor="dodgerBlue"
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Chatboard
