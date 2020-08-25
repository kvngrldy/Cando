import React from 'react'
import CategoryList from '../components/CategoryList'
import socket from '../config/socket'
import { useSelector, useDispatch } from 'react-redux'
import { getKanbanData } from '../store/actions/kanbanActions'


export default function KanbanBoard() {
    const departmentCategory = useSelector(state => state.kanban.category)
    const { token } = useSelector(state => state.userData)
    const { departmentId } = useSelector(state => state.kanban)
    const dispatch = useDispatch()


    socket.on('update-data', _ => {
        dispatch(getKanbanData(departmentId, token))
    })
    
    return (
        <>
            <div className="kanban-group">


                {
                    departmentCategory && departmentCategory.map(category => (

                        <CategoryList data={category}></CategoryList>
                    ))


                }




            </div>

        </>
    )
}
