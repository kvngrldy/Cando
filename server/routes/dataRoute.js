const DataController = require('../controllers/dataController')
const todoRoute = require('./todoRoute')
const categoryRoute = require('./categoryRoute')
const authentication = require('../middleware/authentication')
const UserController = require('../controllers/userController')
const authorizationDepartment = require('../middleware/authorizationDepartment')
const userRoute = require('./userRoute')
const TodoController = require('../controllers/todoController')
const authorizationAdmin = require('../middleware/authorizationAdmin')
const AlfredController = require('../controllers/alfredController')
const ApiController = require('../controllers/apiController')

const dataRoute = require('express').Router()

dataRoute.get('/', DataController.findAllDepartment)
dataRoute.post('/login', UserController.login)
dataRoute.post('/todo', TodoController.createTodo)
dataRoute.get('/userData', authentication, UserController.findOneUserData)
dataRoute.use('/user', authentication, userRoute)
dataRoute.use('/todo', authentication, todoRoute)
dataRoute.use('/category', authentication, categoryRoute)
dataRoute.delete('/alfreddeletetodo', AlfredController.deleteTodo)
dataRoute.delete('/remove', authentication, authorizationAdmin, UserController.removeUserFromDepartment)
dataRoute.post('/alfred', AlfredController.createTodo)
dataRoute.put('/alfrededittodocategory', AlfredController.editTodoCategory)
dataRoute.put('/alfrededittodopriority', AlfredController.editTodoPriority)
dataRoute.post('/alfredfetchtodo', AlfredController.getAllTodo)
dataRoute.post('/alfredatyourservice', AlfredController.getMsg)
dataRoute.get('/yomomma', ApiController.yoMomma)
dataRoute.get('/:id', authentication, authorizationDepartment, DataController.findAllData)


module.exports = dataRoute