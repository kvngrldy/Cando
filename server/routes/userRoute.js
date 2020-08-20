const UserController = require('../controllers/userController')

const userRoute = require('express').Router()

userRoute.post('/',UserController.createUser)




module.exports = userRoute