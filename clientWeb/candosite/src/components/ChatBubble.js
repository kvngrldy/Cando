import React from 'react'

function ChatBubble() {
    return (
        <div className="comment ml-3 my-3 user-chat">
            <div className="avatar-comment" href="#">
                <img
                    src="https://miro.medium.com/max/350/1*MccriYX-ciBniUzRKAUsAw.png"
                    width="35"
                    alt="Profile Avatar"
                    title="Anie Silverston"
                    style={{ borderRadius: '50%' }}
                />
            </div>
            <div className="ini-test">
                <div className="username">
                    <h6>User 3</h6>
                </div>
                <div className="comment-content">
                    <p>hehehheh 🤮</p>
                </div>
                
            </div>
        </div>
    )
}

export default ChatBubble
