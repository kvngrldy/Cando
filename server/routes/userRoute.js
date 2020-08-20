const UserController = require('../controllers/userController')
const authorizationAdmin = require('../middleware/authorizationAdmin')
const departmentRoute = require('./departmentRoute')

const userRoute = require('express').Router()

userRoute.post('/', authorizationAdmin, UserController.createUser)
userRoute.delete('/:id', authorizationAdmin, UserController.deleteUser)
userRoute.post('/add', authorizationAdmin, UserController.addUserToDepartment)






module.exports = userRoute