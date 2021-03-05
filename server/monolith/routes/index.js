const express = require('express')
const router = express.Router()
const movieRouter = require('./movieRouter')
const tvSeriesRouter = require('./tvSeriesRouter')

router.get('/', (req, res) => {
  res.send('Connected')
})

router.use('/movies', movieRouter)
router.use('/tvseries', tvSeriesRouter)

module.exports = router