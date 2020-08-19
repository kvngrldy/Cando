const TodoController = require('../controllers/todoController')

const todoRoute = require('express').Router()

todoRoute.post('/', TodoController.createTodo)
todoRoute.put('/:id', TodoController.editTodo)
todoRoute.get('/:id', TodoController.findOne)
todoRoute.delete('/:id', TodoController.deleteTodo)

module.exports = todoRoute