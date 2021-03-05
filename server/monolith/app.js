const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes')
const { connect } = require('./config/mongoDb')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

connect.then(async db => {
  app.listen(PORT, _=> {
    console.log(`listening on port: ${PORT}`)
  })
})