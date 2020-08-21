// Semangat the pake bcrypt js ya
const express = require('express')
const app = express();
const port = process.env.PORT || 3000

const errHandler = require('./middleware/errorHandler')
const bodyParser = require('body-parser');
const homeRoute = require('./routes/homeRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(homeRoute)





app.use(errHandler)

if (process.env.NODE_ENV != 'test') {
    app.listen(port, (req, res) => {
        console.log(`listening to port: ${port}`)
    })
}

module.exports = app