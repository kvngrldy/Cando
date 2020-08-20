const TodoController = require('../controllers/todoController')
const authorizationEditTodo = require('../middleware/authorizationEditTodo')
const authorizationAdmin = require('../middleware/authorizationAdmin')

const todoRoute = require('express').Router()

// todoRoute.post('/', authorizationAdmin, TodoController.createTodo)
// todoRoute.post('/', TodoController.createTodo)
todoRoute.put('/:id', authorizationEditTodo, TodoController.editTodo)
todoRoute.get('/:id', TodoController.findOne)
todoRoute.delete('/:id', authorizationAdmin, TodoController.deleteTodo)

module.exports = todoRoute