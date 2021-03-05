const router = require('express').Router()
const movieRouter = require('./movieRouter')
const seriesRouter = require('./seriesRouter')
const EntertainMeController = require('../controllers/EntertainMeController')

router.get('/', (req, res) => {
  res.send(`Orchestrator: Connected`)
})

router.get('/entertainme', EntertainMeController.getAll)

router.use('/movies', movieRouter)
router.use('/tv', seriesRouter)

module.exports = router