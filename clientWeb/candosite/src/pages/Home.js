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

function Home() {
    const departmentName = useSelector(state => state.kanban.departmentName)
    const departmentCategory = useSelector(state => state.kanban.category)
    socket.on('add-alfred-notif', (departmentName) => {
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

    // useEffect(async () => {
    //     try{
    //         let data = await localStorage.getItem('token')
    //         let res = await fetch('https://dummycando.herokuapp.com/data/userData', {
    //             method: 'get',
    //             headers: {
    //                 'token': data
    //             }
    //         })
    //         res = res.json()
    //     let data = await fetch('https://l')
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }, [])

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
                                <div className="kanban-header">
                                    <h1>{departmentName}</h1>

                                </div>
                                <div className="kanban-group">


                                    {
                                        departmentCategory && departmentCategory.map(category => (

                                            <CategoryList data={category}></CategoryList>
                                        ))


                                    }




                                </div>
                                <ToastContainer />
                            </div>
                            
                            
                        </div>
                    </div>


                </div>
            </div>
        </div >
    )
}

export default Home
