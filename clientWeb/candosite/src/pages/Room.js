import React, {useEffect} from 'react'

import Sidebar from '../components/Sidebar'
import ChatBoard from '../components/ChatBoard'

function Room() {
    return (
        <div className="board-background">
            <div className="board-container">
                <div className="board-display">
                   <Sidebar></Sidebar>
                    <div className="chat-section">
                        <ChatBoard></ChatBoard>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Room
