import React, { useState } from 'react'
import CategoryList from '../components/CategoryList'
import socket from '../config/socket'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getKanbanData } from '../store/actions/kanbanActions'
import AdminPage from '../components/AdminPage'

export default function KanbanBoard() {
    const departmentCategory = useSelector(state => state.kanban.category)
    // const { token } = useSelector(state => state.userData)
    const token = localStorage.token
    const { departmentId } = useSelector(state => state.kanban)
    const dispatch = useDispatch()
    const departmentName = useSelector(state => state.kanban.departmentName)
    const [isAdmin, setIsAdmin] = useState(false)
    const {position} = useSelector(state => state.userData.position)

    console.log(position, `<<<<<<`)

    socket.off('update-data').on('update-data', _ => {
        dispatch(getKanbanData(departmentId, token))
    })

    function openAdmin() {
        setIsAdmin(!isAdmin)
    }



    return (
        <>
            <div className="kanban-header">
                <div className="mr-5">
                    <h1>Board {departmentName}</h1>
                </div>
                {localStorage.position == 'admin' ? <div className="mt-2">
                    {isAdmin ? <Button onClick={() => openAdmin()} variant="outline-primary">Close admin page</Button> : <Button onClick={() => openAdmin()} variant="outline-primary">Edit this board</Button>}
                </div> : <div />}

            </div>
            {isAdmin == false ? <div className="kanban-group">
                {
                    departmentCategory && departmentCategory.map(category => (
                        <CategoryList data={category}></CategoryList>
                    ))
                }
            </div> : <AdminPage isAdmin={isAdmin}></AdminPage>}


        </>
    )
}
