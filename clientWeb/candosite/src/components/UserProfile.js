import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { editUserData } from '../store/actions/userdataActions'
import { Image, Container, Button } from 'react-bootstrap'

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

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(editUserData(editedUserData))
        setEditStatus(!editStatus)

    }

    return (
        <>
            <Container>
                {
                    editStatus ?
                        <div className="profile-setting">    
                                <div className="profile-card">
                                    <div className="card-center">
                                        <div className="profile-card-header mb-3">
                                            <div>
                                                <Image src={userData.imageUrl} className="setting-profile-img" roundedCircle />
                                            </div>
                                        </div>
                                        <div className="edit-button" >
                                        </div>
                                        <form onSubmit={(event) => handleSubmit(event)}>
                                            <div className="profile-data mt-3">
                                                <div className="profile-data-email">
                                                    <div className="email-text">
                                                        <h6 className="text-muted data-label">Email:</h6>
                                                        <input style={{ border: "0px" }} type="text" value={editedUserData.email} onChange={(event) => setEditedUserData({
                                                            ...editedUserData, email: event.target.value
                                                        })}></input>

                                                    </div>
                                                </div>
                                                <div className="profile-data-email">
                                                    <div className="email-text">
                                                        <h6 className="text-muted data-label">Name:</h6>
                                                        <input style={{ border: "0px" }} className="text-margin-lower" type="text" value={editedUserData.name} onChange={(event) => setEditedUserData({
                                                            ...editedUserData, name: event.target.value
                                                        })}></input>

                                                    </div>
                                                </div>
                                                <div className="profile-data-email mb-2">
                                                    <div className="email-text">
                                                        <h6 className="text-muted data-label">Image URL:</h6>
                                                        <input style={{ border: "0px" }} type="text" value={editedUserData.imageUrl} onChange={(event) => setEditedUserData({
                                                            ...editedUserData, imageUrl: event.target.value
                                                        })}></input>
                                                    </div>
                                                </div>
                                                <div className="submit-button-profile">

                                                    <Button variant="outline-primary" type="submit">Edit</Button>
                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div>
                                <Image src="https://opendoodles.s3-us-west-1.amazonaws.com/selfie.png" className="setting-illustration-img" rounded />
                                </div>
                        </div>
                        :
                        <div className="profile-setting">
                           
                                <div className="profile-card">
                                    <div className="card-center">
                                        <div className="profile-card-header mb-3">
                                            <div>

                                                <Image src={userData.imageUrl} className="setting-profile-img" roundedCircle />
                                            </div>
                                        </div>
                                        <div className="edit-button" onClick={() => gantiEditStatus()}>
                                            <i class="fas fa-pen"></i>
                                        </div>
                                        <div className="profile-data mt-3">
                                            <div className="profile-data-email">
                                                <div className="email-text">
                                                    <h6 className="text-muted data-label">Email:</h6>
                                                    <strong><p className="text-margin-lower">{userData.email}</p></strong>
                                                </div>
                                            </div>
                                            <div className="profile-data-email">
                                                <div className="email-text">
                                                    <h6 className="text-muted data-label">Name:</h6>
                                                    <strong><p className="text-margin-lower">{userData.name}</p></strong>
                                                </div>
                                            </div>
                                            <div className="profile-data-email">
                                                <div className="email-text">
                                                    <h6 className="text-muted data-label">Position:</h6>
                                                    <strong><p className="text-margin-lower">{userData.position}</p></strong>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div>
                                <Image src="https://opendoodles.s3-us-west-1.amazonaws.com/selfie.png" className="setting-illustration-img" rounded />
                                </div>
                        </div>
                }
            </Container>
        </>
    )
}
