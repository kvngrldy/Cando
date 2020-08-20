const CategoryController = require('../controllers/categoryController')
const authorizationAdmin = require('../middleware/authorizationAdmin')

const categoryRoute = require('express').Router()

categoryRoute.post('/',  authorizationAdmin, CategoryController.create)
categoryRoute.delete('/:id', authorizationAdmin, CategoryController.delete)
categoryRoute.put('/:id', authorizationAdmin, CategoryController.edit)
categoryRoute.get('/:id',CategoryController.findOne)



module.exports = categoryRoute