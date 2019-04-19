const express = require('express')
const bodyParser = require('body-parser')

const routes = require("./routes.js")

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app)

module.exports = app
