import React, {useState} from 'react'
import OnlineMember from '../components/OnlineMember'
import ChatBubble from '../components/ChatBubble'
import InputEmoji from "react-input-emoji";

function Chatboard() {
    const [text, setText] = useState("");
 
    function handleOnEnter(text) {
      console.log("enter", text);
      
    }

    return (
        <div className="chat-board">
            <div className="chat-box">
                <div className="chat-online-box">
                    <div className="chat-online">
                        <h2>MEETING</h2>
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
                        <OnlineMember></OnlineMember>
                        <OnlineMember></OnlineMember>
                        <OnlineMember></OnlineMember>
                    </div>
                </div>
                <div className="chat-division">
                    <div className="chat-app-box">

                        <ChatBubble ></ChatBubble>
                        <div className="comment mx-3">
                            <div className="avatar-comment" href="#">
                                <img
                                    src="https://miro.medium.com/max/350/1*MccriYX-ciBniUzRKAUsAw.png"
                                    width="35"
                                    alt="Profile Avatar"
                                    title="Anie Silverston"
                                />
                            </div>
                            <div className="ini-test">
                                <div className="username">
                                    <h6>Test User</h6>
                                </div>
                                <div className="comment-content">
                                    <p>hehe</p>
                                </div>

                            </div>
                        </div>
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
                                    onEnter={handleOnEnter}
                                    placeholder="Type a message"
                                    borderColor="dodgerBlue"
                                />
                                {/* <input className="textbox" type="text" placeholder="Say Something..." />

                                <span className="send-button" style={{ fontSize: '35px', color: 'Dodgerblue' }}>
                                    <i class="fas fa-paper-plane"></i>
                                </span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Chatboard
