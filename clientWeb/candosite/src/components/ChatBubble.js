import React from 'react'

function ChatBubble({chat}) {
    return (
        <div className="comment ml-3 my-3 user-chat">
            
            <div className="avatar-comment" href="#">
                <img
                    src="https://miro.medium.com/max/350/1*MccriYX-ciBniUzRKAUsAw.png"
                    width="35"
                    alt="Profile Avatar"
                    
                    style={{ borderRadius: '50%' }}
                />
            </div>
            <div className="ini-test">
                <div className="username">
                    <h6>{chat.sender}</h6>
                </div>
                <div className="comment-content">
                    <p>{chat.message}</p>
                </div>
                
            </div>
        </div>
    )
}

export default ChatBubble
