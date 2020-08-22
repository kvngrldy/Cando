import React, { useState } from 'react'
import { Badge, Form, Button } from 'react-bootstrap'

function Card() {
    const [isEdit, setIsEdit] = useState(false)

    function cardEdit() {
        console.log('tes')
        setIsEdit(!isEdit)
    }

    return (
        <div>
            {isEdit == false ? <div className='task-card mb-3'>
                <div className="task-priority">
                    <Badge pill variant="danger">
                        Urgent
            </Badge>
                    <div className="task-card-menu">
                        <span style={{ color: 'grey', marginRight: '7px' }}>
                            <i onClick={() => cardEdit()} class="far fa-edit cursor"></i>
                        </span>
                        <span style={{ color: 'grey' }}>
                            <i class="fas fa-minus-square cursor"></i>
                        </span>
                    </div>
                </div>
                <div className="task-title">
                    <p className="" style={{ fontWeight: 'bold' }}> This is task titleThis is task titleThis is task titleThis is task title</p>
                </div>
                <div className="task-info">
                    <div className="info-asignee">
                        <img className="profile-picture-card" alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvyDUUx4x7Iu6xetTkfi_LwDDzfNnJDn-S0Q&usqp=CAU" />
                    </div>
                    <div className="info-deadline">
                        <Badge variant="secondary">11 Aug</Badge>
                    </div>
                </div>
            </div> :
                <div className='task-card mb-3'>
                    <div className="task-priority">
                        <Form.Group>
                            <Form.Control as="select" defaultValue="Priority...">
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Urgent</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control as="select" defaultValue="Priority...">
                                <option>BackLog</option>
                                <option>Development</option>
                                <option>Production</option>
                                <option>Done</option>
                            </Form.Control>
                        </Form.Group>
                        <div className="task-card-menu">

                        </div>
                    </div>
                    <div className="task-title">
                        <Form.Group controlId="formBasicEmail">

                            <Form.Control type="email" value="Task Title..." />

                        </Form.Group>
                    </div>
                    <div className="task-info">
                        <div className="info-asignee">
                            <img className="profile-picture-card" alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvyDUUx4x7Iu6xetTkfi_LwDDzfNnJDn-S0Q&usqp=CAU" />
                        </div>
                        <div className="info-deadline">
                            <Button onClick={() => cardEdit()} variant="primary">Edit Task</Button>
                        </div>
                    </div>
                </div>}
        </div>

    )
}

export default Card
