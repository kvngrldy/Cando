import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function UserProfile() {
    const allData = useSelector(state => state.kanban)
    const userData = useSelector(state => state.userData)


    return (
        <>
            {/* <h1>{JSON.stringify(userData.email)}</h1> */}

            <img src={userData.imageUrl} style={{ height: 100, width: 100 }}></img>
            <p>{userData.email}</p>
            <p>{userData.position}</p>
            {/* <p>{JSON.stringify(userData.userDept)}</p> */}
            <p>{JSON.stringify(allData.todoStatus)}</p>

        </>
    )
}
