import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { Form, Button } from 'react-bootstrap'
import Card from '../components/Card'
import { useSelector } from 'react-redux'
import CategoryList from '../components/CategoryList'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from '../config/socket'
import KanbanBoard from '../components/KanbanBoard'

function Home() {
    const departmentName = useSelector(state => state.kanban.departmentName)
    const departmentCategory = useSelector(state => state.kanban.category)
    socket.on('add-alfred-notif', _ => {
        toast.info('New Task Added', {
            position: "bottom-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    })

    let history = useHistory()
    let [todo, setTodo] = useState([])
    let [department, setDepartment] = useState([])
    const [isEditCategory, setIsEditCategory] = useState(false)

    function categoryEdit() {
        setIsEditCategory(!isEditCategory)
    }


    return (
        <div className="board-background">
            <div className="board-container">
                <div className="board-display">

                    <Sidebar></Sidebar>

                    <div className="main-content">
                        <div className="main-section">
                            <div className="kanban-section">
                                
                                <KanbanBoard></KanbanBoard>

                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div >
    )
}

export default Home
