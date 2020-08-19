const CategoryController = require('../controllers/categoryController')

const categoryRoute = require('express').Router()

categoryRoute.post('/', CategoryController.create)
categoryRoute.delete('/:id', CategoryController.delete)
categoryRoute.put('/:id', CategoryController.edit)


module.exports = categoryRoute