const UserController = require('../controllers/userController')
const authorizationAdmin = require('../middleware/authorizationAdmin')
const userRoute = require('express').Router()

userRoute.post('/', authorizationAdmin, UserController.createUser)
userRoute.delete('/:id', authorizationAdmin, UserController.deleteUser)
userRoute.post('/add', authorizationAdmin, UserController.addUserToDepartment)
userRoute.put('/userData', UserController.editUserData)






module.exports = userRoute