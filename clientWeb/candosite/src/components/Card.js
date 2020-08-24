import React, { useState, useEffect } from 'react'
import { Badge, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { editTodo, deleteTodoData, getKanbanData } from '../store/actions/kanbanActions'
import socket from '../config/socket'


function Card({ data }) {

    const [isEdit, setIsEdit] = useState(false)
    const dispatch = useDispatch()
    let deadlineDate = data.deadline.slice(8, 10)
    let deadlineMonth = data.deadline.slice(5, 7)
    let categoryList = useSelector(state => state.kanban.category)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const allUserInDepartment = useSelector(state => state.kanban.allUser)
    const departmentId = useSelector(state => state.kanban.departmentId)
    const token = localStorage.getItem('token')
    const [todoData, setTodoData] = useState({
        title: data.title,
        deadline: data.deadline.slice(0, 10),
        priority: data.priority,
        description: data.description,
        categoryId: data.categoryId,
        userId: data.userId,
    })

    // const userDetails = allUserInDepartment.filter(a => a.id == data.userId)
    useEffect(() => {
        setTodoData({
            title: data.title,
            deadline: data.deadline.slice(0, 10),
            priority: data.priority,
            description: data.description,
            categoryId: data.categoryId,
            userId: data.userId,
        })

    }, [categoryList])

    if (deadlineMonth[0] === '0') {
        deadlineMonth = deadlineMonth[1]
        deadlineMonth = months[deadlineMonth - 1]
    } else {
        deadlineMonth = months[deadlineMonth - 1]
    }

    function cardEdit() {
        // console.log('tes')
        setIsEdit(!isEdit)
    }

    function submitEdit(id) {
        let payload = {
            id,
            departmentId,
            token,
            todoData
        }
        dispatch(editTodo(payload))
        // console.log(payload)
        setIsEdit(!isEdit)
        socket.emit('update-data')
    }

    // socket.on('update-data', _ => {
    //     dispatch(getKanbanData(departmentId, token))
    // })

    function deleteTodo(id) {
        // console.log(id)
        let payload = {
            id, departmentId, token
        }
        dispatch(deleteTodoData(payload))
        socket.emit('update-data')
    }


    return (
        <div>
            {isEdit == false ? <div className='task-card mb-3'>
                <div className="task-priority">
                    {data.priority == 'urgent' && <Badge pill variant="danger">
                        {data.priority}
                    </Badge>}
                    {data.priority == 'high' && <Badge pill variant="warning">
                        {data.priority}
                    </Badge>}
                    {data.priority == 'medium' && <Badge pill variant="primary">
                        {data.priority}
                    </Badge>}
                    {data.priority == 'low' && <Badge pill variant="success">
                        {data.priority}
                    </Badge>}

                    {localStorage.position == 'admin' ? <div className="task-card-menu">

                        <span style={{ color: 'grey', marginRight: '7px' }}>
                            <i onClick={() => cardEdit()} class="far fa-edit cursor"></i>
                        </span>
                        {

                        }
                        <span style={{ color: 'grey' }} onClick={() => deleteTodo(data.id)} >
                            <i class="fas fa-minus-square cursor"></i>
                        </span>
                    </div> : <div className="task-card-menu"></div>}
                </div>
                <div className="task-title">
                    <p className="" style={{ fontWeight: 'bold' }}> {data.title}</p>
                </div>
                <div className="task-info">
                    <div className="info-asignee">
                        <img className="profile-picture-card" alt="" src={data.user.imageUrl} />
                    </div>
                    <div className="info-deadline">
                        <Badge variant="secondary">{deadlineDate}  {deadlineMonth} </Badge>
                    </div>
                </div>
            </div> :
                <div className='task-card mb-3'>
                    <div className="task-priority">
                        <Form.Group>
                            <Form.Control as="select" defaultValue={todoData.priority} onChange={(event) => setTodoData({ ...todoData, priority: event.target.value })} >
                                <option value="low" >Low</option>
                                <option value="medium" >Medium</option>
                                <option value="high" >High</option>
                                <option value="urgent" >Urgent</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control as="select" defaultValue={todoData.categoryId} onChange={(event) => setTodoData({ ...todoData, categoryId: event.target.value })} >
                                {
                                    categoryList && categoryList.map(category => (
                                        <option value={category.id} >{category.name}</option>
                                    ))
                                }

                            </Form.Control>
                        </Form.Group>
                        <div className="task-card-menu">

                        </div>
                    </div>
                    <div className="task-title">
                        <Form.Group controlId="formBasicEmail">

                            <Form.Control type="text" defaultValue={todoData.title} onChange={(event) => setTodoData({ ...todoData, title: event.target.value })} />

                        </Form.Group>
                    </div>
                    <Form.Group>
                        <Form.Control as="select" defaultValue={todoData.userId} onChange={(event) => setTodoData({ ...todoData, userId: event.target.value })}  >
                            {
                                allUserInDepartment && allUserInDepartment.map(user => (
                                    <option value={user.id} >{user.name}</option>
                                ))
                            }

                        </Form.Control>
                    </Form.Group>

                    <div className="task-title">
                        <Form.Group controlId="formBasicEmail">

                            <Form.Control type="date" defaultValue={todoData.deadline} onChange={(event) => setTodoData({ ...todoData, deadline: event.target.value })} />

                        </Form.Group>
                    </div>

                    <div className="task-title">
                        <Form.Group controlId="formBasicEmail">

                            <Form.Control type="type" defaultValue={todoData.description} onChange={(event) => setTodoData({ ...todoData, description: event.target.value })} />

                        </Form.Group>
                    </div>

                    <div className="task-info">
                        <div className="info-asignee">
                            <img className="profile-picture-card" alt="" src={data.user.imageUrl} />

                        </div>
                        <div className="info-deadline">
                            <Button onClick={() => submitEdit(data.id)} variant="primary">Edit Task</Button>
                        </div>
                    </div>
                </div>}
        </div>

    )
}

export default Card
