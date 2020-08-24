import React from 'react'

function ChatBubble({ chat }) {

    return (
        <>
            {chat.sender == 'Bot' ? <div className="comment-bot ml-3 my-2 user-chat">




                <strong><p>{chat.message}</p></strong>


            </div> : chat.sender != localStorage.name ? <div className="comment ml-3 mt-2 mb-3 user-chat">
                    <div className="avatar-comment" href="#">
                        <img
                            src={chat.imageUrl}
                            width="35"
                            height="35"
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
                </div> : <div className="comment-self mr-3 mt-2 mb-3 user-chat">
                    
                    <div className="ini-test">
                        <div className="username-self">
                            <h6>{chat.sender}</h6>
                        </div>
                        <div className="comment-content-self">
                            <p>{chat.message}</p>
                        </div>
                    </div>
                    <div className="avatar-comment-self" href="#">
                        <img
                            src={chat.imageUrl}
                            width="35"
                            height="35"
                            alt="Profile Avatar"

                            style={{ borderRadius: '50%' }}
                        />
                    </div>
                </div>}

        </>


    )
}

export default ChatBubble
