const router = require('express').Router()
const SeriesController = require('../controllers/SeriesController')

router.get('/', SeriesController.getAllSeries)
router.post('/', SeriesController.postSeries)
router.get('/:id', SeriesController.getSeries)
router.put('/:id', SeriesController.putSeries)
router.patch('/:id', SeriesController.patchSeries)
router.delete('/:id', SeriesController.deleteSeries)

module.exports = router