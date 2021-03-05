const express = require('express')
const router = express.Router()
const seriesRouter = require('./seriesRouter')

router.get('/', (req, res) => {
  res.send('Series: Connected')
})

router.use('/tv', seriesRouter)

module.exports = router