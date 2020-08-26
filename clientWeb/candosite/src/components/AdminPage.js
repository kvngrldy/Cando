import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createCategory, deleteCategory, removeUserFromDepartment, addedUserToDepartment } from '../store/actions/kanbanActions'
import { useHistory } from 'react-router-dom'
import socket from '../config/socket'
import { Button, Image } from 'react-bootstrap'


export default function AdminPage(isAdmin) {
    const { departmentId, category, allUser, allUserNonDepartment } = useSelector(state => state.kanban)
    const { email } = useSelector(state => state.userData)
    const token = localStorage.token
    const dispatch = useDispatch()
    const history = useHistory()
    const [categoryName, setCategoryName] = useState('')
    const [deletedCategoryId, setDeletedCategoryId] = useState('')
    const [removedUserFromDept, setRemovedUserFromDept] = useState('')
    const [addedUserFromDept, setAddedUserFromDept] = useState('')
    function handleCategory(e) {
        e.preventDefault()
        let payload = {
            name: categoryName,
            departmentId,
            token
        }

        dispatch(createCategory(payload))
        setCategoryName('')

        socket.emit('update-data')

    }
    function handleDeleteCategory(e) {
        e.preventDefault()
        let payload = {
            token,
            deletedCategoryId,
            departmentId
        }
        // console.log(payload)
        dispatch(deleteCategory(payload))
        // socket.emit('update-data')
        history.push('/')
    }

    function backHome() {
        history.push('/')
    }



    function handleRemoveUser(e) {
        e.preventDefault()
        let payload = {
            departmentId,
            userId: removedUserFromDept,
            token
        }
        dispatch(removeUserFromDepartment(payload))
        // socket.emit('update-data')
        history.push('/')
    }

    function handleAddUser(e) {
        e.preventDefault()
        let payload = {
            departmentId,
            userId: addedUserFromDept,
            token
        }
        dispatch(addedUserToDepartment(payload))
        // socket.emit('update-data')
        history.push('/')
    }
    return (


        <>
            <div className="profile-setting">
                <div className="profile-card">
                    <div className="card-center">
                        <div className="profile-card-header mb-3">
                            <div>
                                <h1>Admin Mode</h1>
                            </div>
                        </div>
                        <div className="edit-button" >
                        </div>
                        <div className="profile-data mt-3">
                            <div className="profile-data-email">
                                <div className="full-w">
                                    <h6 className="text-muted data-label mb-2">Add Category:</h6>
                                    <form className="form-flex" onSubmit={(event) => handleCategory(event)}>
                                        <input className="" style={{ border: "0px" }} type="text" placeholder="Category Name" value={categoryName} onChange={(event) => setCategoryName(event.target.value)} ></input>
                                        <Button type="submit" variant="outline-primary">Submit</Button>
                                    </form>
                                </div>
                            </div>
                            <div className="profile-data-email">
                                <div className="full-w">
                                    <h6 className="text-muted data-label mb-2">Delete Category:</h6>
                                    <form className="form-flex" onSubmit={(event) => handleDeleteCategory(event)}>
                                        <select className="" style={{ border: "0px" }} onChange={(e) => setDeletedCategoryId(e.target.value)}>
                                            <option defaultValue="">--Please Select--</option>
                                            {
                                                category && category.map((a) => (

                                                    <option value={a.id}> {a.name} </option>
                                                ))
                                            }
                                        </select>
                                        <Button type="submit" variant="outline-primary">Submit</Button>
                                    </form>

                                </div>
                            </div>
                            <div className="profile-data-email mb-2">
                                <div className="full-w">
                                    <h6 className="text-muted data-label mb-2">Add New User:</h6>
                                    <form className="form-flex" onSubmit={(event) => handleAddUser(event)}>

                                        <select className="" style={{ border: "0px" }} onChange={(e) => setAddedUserFromDept(e.target.value)}>
                                            <option defaultValue="">--Please Select--</option>
                                            {
                                                allUserNonDepartment && allUserNonDepartment.map((a) => (
                                                    <option value={a.id}> {a.name} </option>
                                                ))
                                            }
                                        </select>
                                        <Button type="submit" variant="outline-primary">Submit</Button>
                                    </form>
                                </div>
                            </div>
                            <div className="profile-data-email mb-2">
                                <div className="full-w">
                                    <h6 className="text-muted data-label mb-2">Remove User:</h6>
                                    <form className="form-flex" onSubmit={(event) => handleRemoveUser(event)}>
                                        <select className="" style={{ border: "0px" }} onChange={(e) => setRemovedUserFromDept(e.target.value)}>
                                            <option defaultValue="">--Please Select--</option>
                                            {
                                                allUser && allUser.map((a) => (
                                                    a.email !== email ?
                                                        <option value={a.id}> {a.name} </option>
                                                        : <p></p>
                                                ))
                                            }
                                        </select>
                                        <Button type="submit" variant="outline-primary">Submit</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Image src="https://opendoodles.s3-us-west-1.amazonaws.com/groovy.png" className="setting-illustration-img" rounded />
                </div>
            </div>


        </>
    )
}
