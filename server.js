const express = require('express')

const { db } = require('./database')
const todoRoute = require('./Routes/todos')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', express.static(__dirname + '/Public'))

app.use('/todos', todoRoute)

db.sync()
  .then(() => {
    app.listen(6543)
  })
  .catch((err) => {
    console.error(err)
  })
