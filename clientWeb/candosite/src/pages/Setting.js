import React from 'react'
import UserProfile from '../components/UserProfile'
import Sidebar from '../components/Sidebar'

function Setting() {
    return (
        <div className="board-background">
            <div className="board-container">
                <div className="board-display">

                    <Sidebar></Sidebar>

                    <div className="main-content">
                        <div className="main-section">
                            <div className="kanban-section">

                                <UserProfile />

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Setting
