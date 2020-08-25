import React from 'react'

function OnlineMember({ user }) {
    return (
        <div className="online">

            <img className="profile-picture" alt="" src={localStorage.imageUrl} />
            <div className="name-dot">
                <p className="name">{user.name}</p>
                <div className="dot"></div>
            </div>
        </div>
    )
}

export default OnlineMember
