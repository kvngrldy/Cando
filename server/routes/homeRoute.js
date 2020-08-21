const dataRoute = require('./dataRoute')
const homeRoute = require('express').Router()

homeRoute.use('/data', dataRoute)





module.exports = homeRoute