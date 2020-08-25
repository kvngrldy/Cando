import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createCategory, deleteCategory, removeUserFromDepartment, addedUserToDepartment } from '../store/actions/kanbanActions'
import { useHistory } from 'react-router-dom'
import socket from '../config/socket'



export default function AdminPage(isAdmin) {
    const { departmentId, category, allUser, allUserNonDepartment } = useSelector(state => state.kanban)
    const { token, email } = useSelector(state => state.userData)
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
        
        history.push('/')
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
            <h1>Admin Page</h1>
            <div>
                <form onSubmit={(event) => handleCategory(event)}>
                    <label>Category Name :</label>
                    <input type="text" placeholder="Category Name" value={categoryName} onChange={(event) => setCategoryName(event.target.value)} ></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                <form onSubmit={(event) => handleDeleteCategory(event)}>
                    <label>Delete Category Name :</label>
                    <select onChange={(e) => setDeletedCategoryId(e.target.value)}>
                        <option defaultValue="">--Please Select--</option>
                        {
                            category && category.map((a) => (

                                <option value={a.id}> {a.name} </option>
                            ))

                        }
                    </select>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                <form onSubmit={(event) => handleRemoveUser(event)}>
                    <label>Remove User from Department :</label>
                    <select onChange={(e) => setRemovedUserFromDept(e.target.value)}>
                        <option defaultValue="">--Please Select--</option>
                        {
                            allUser && allUser.map((a) => (
                                a.email !== email ?
                                    <option value={a.id}> {a.name} </option>
                                    : <p></p>
                            ))

                        }
                    </select>
                    <button type="submit">Submit</button>
                </form>
            </div>

            <div>
                <form onSubmit={(event) => handleAddUser(event)}>
                    <label>Added User from Department :</label>
                    <select onChange={(e) => setAddedUserFromDept(e.target.value)}>
                        <option defaultValue="">--Please Select--</option>
                        {
                            allUserNonDepartment && allUserNonDepartment.map((a) => (
                                <option value={a.id}> {a.name} </option>
                            ))
                        }
                    </select>
                    <button type="submit">Submit</button>
                </form>
            </div>
                        
            

        </>
    )
}
