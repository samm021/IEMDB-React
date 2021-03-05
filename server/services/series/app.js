const express = require('express')
const app = express()
const PORT = process.env.PORT || 4002
const routes = require('./routes')
const { connect } = require('./config/mongoDb')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)
app.use(errorHandler)

connect().then(async db => {
  app.listen(PORT, _=> {
    console.log(`series: listening on port: ${PORT}`)
  })
})