const express = require('express')
const router = express.Router()
const movieRouter = require('./movieRouter')

router.get('/', (req, res) => {
  res.send('Movies: Connected')
})

router.use('/movies', movieRouter)

module.exports = router