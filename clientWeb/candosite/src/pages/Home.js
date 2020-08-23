import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { Form, Button } from 'react-bootstrap'
import Card from '../components/Card'
import { useSelector } from 'react-redux'
import CategoryList from '../components/CategoryList'


function Home() {
    const departmentName = useSelector(state => state.kanban.departmentName)
    const departmentCategory = useSelector(state => state.kanban.category)


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



                                    {/* <div className="kanban-board">
                                        <div className="kanban-title">
                                            <p>DEVELOPMENT</p>
                                            <span style={{ color: 'grey', marginTop: '2px' }}>
                                                <i class="fas fa-ellipsis-h cursor"></i>
                                            </span>
                                        </div>
                                        <div className="kanban-body">
                                            <Card></Card>
                                            <Card></Card>
                                        </div>
                                    </div>
                                    <div className="kanban-board">
                                        <div className="kanban-title">
                                            <p>PRODUCTION</p>
                                            <span style={{ color: 'grey', marginTop: '2px' }}>
                                                <i class="fas fa-ellipsis-h cursor"></i>
                                            </span>
                                        </div>
                                        <div className="kanban-body">
                                            <Card></Card>

                                        </div>
                                    </div>
                                    <div className="kanban-board">
                                        <div className="kanban-title">
                                            <p>DONE</p>
                                            <span style={{ color: 'grey', marginTop: '2px' }}>
                                                <i class="fas fa-ellipsis-h cursor"></i>
                                            </span>
                                        </div>
                                        <div className="kanban-body">
                                            <Card></Card>
                                        </div>
                                    </div> */}
                                </div>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div >
    )
}

export default Home
