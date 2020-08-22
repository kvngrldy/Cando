import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { Form, Button } from 'react-bootstrap'
import Card from '../components/Card'
function Home() {

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
                                    <h1>Department Name</h1>
                                </div>
                                <div className="kanban-group">
                                    <div className="kanban-board">
                                        {isEditCategory == false ? <div className="kanban-title">
                                            <p>BACKLOG</p>
                                            <span style={{ color: 'grey', marginTop: '2px' }}>
                                                <i onClick={() => categoryEdit()} class="fas fa-ellipsis-h cursor"></i>
                                            </span>

                                        </div> : <div className="kanban-title-edit">

                                                <Form.Group controlId="exampleForm.ControlInput1" style={{ padding: '0px'}}>
                                                    
                                                    <Form.Control size="sm" type="text" placeholder="Category Name..." />
                                                </Form.Group>
                                                <span>
                                                   <Button onClick={() => categoryEdit()} variant="primary" size="sm" className="mb-3">Edit</Button> 
                                                </span>
                                                

                                            </div>}

                                        <div className="kanban-body">
                                            <Card></Card>
                                            <Card></Card>
                                            <Card></Card>
                                            <Card></Card>
                                        </div>
                                    </div>
                                    <div className="kanban-board">
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
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Home
