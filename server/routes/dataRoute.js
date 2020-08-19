const DataController = require('../controllers/dataController')
const todoRoute = require('./todoRoute')
const categoryRoute = require('./categoryRoute')

const dataRoute = require('express').Router()

dataRoute.get('/', DataController.findAllDepartment)
dataRoute.get('/:id', DataController.findAllData)
dataRoute.use("/todo",todoRoute)
dataRoute.use('/category',categoryRoute)


module.exports = dataRoute