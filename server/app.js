const express = require('express')
const app = express();
const cors = require('cors')

const errHandler = require('./middleware/errorHandler')

const homeRoute = require('./routes/homeRoute');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.use(homeRoute)

app.use(errHandler)


module.exports = app


