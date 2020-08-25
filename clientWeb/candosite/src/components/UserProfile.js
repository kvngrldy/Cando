import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { editUserData } from '../store/actions/userdataActions'

export default function UserProfile() {
    const allData = useSelector(state => state.kanban)
    const history = useHistory()
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userData)
    const [editStatus, setEditStatus] = useState(false)
    const [editedUserData, setEditedUserData] = useState({
        imageUrl: userData.imageUrl,
        email: userData.email,
        name: userData.name,
        token: localStorage.token
    })

    function gantiEditStatus() {
        setEditStatus(!editStatus)
    }

    function backHome() {
        history.push('/')
    }

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(editUserData(editedUserData))
        setEditStatus(!editStatus)

    }

    return (
        <>
            <button onClick={() => backHome()}>Home</button>
            <button onClick={() => gantiEditStatus()}>Click buat Edit</button>
            {
                editStatus ?
                    <div>
                        <form onSubmit={(event) => handleSubmit(event)}>
                            <label>Nama : </label>
                            <input type="text" value={editedUserData.name} onChange={(event) => setEditedUserData({
                                ...editedUserData, name: event.target.value
                            })}></input>
                            <label>Email : </label>
                            <input type="text" value={editedUserData.email} onChange={(event) => setEditedUserData({
                                ...editedUserData, email: event.target.value
                            })}></input>
                            <label>Image Url : </label>
                            <input type="text" value={editedUserData.imageUrl} onChange={(event) => setEditedUserData({
                                ...editedUserData, imageUrl: event.target.value
                            })}></input>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                    :
                    <div>
                        <img src={userData.imageUrl} style={{ height: 100, width: 100 }}></img>
                        <p>{userData.name}</p>
                        <p>{userData.email}</p>
                        <p>{userData.position}</p>
                        <p>{JSON.stringify(allData.todoStatus)}</p>
                    </div>
            }


        </>
    )
}
