import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


function OnlineMember({ user }) {
    const userData = useSelector(state => state.userData)

    return (
        <div className="online">
            
            <img className="profile-picture" alt="" src={user.imageUrl} />
            <div className="name-dot">
                <p className="name">{user.name}</p>
                <div className="dot"></div>
            </div>
        </div>
    )
}

export default OnlineMember
