const router = require('express').Router()
const TV_SeriesController = require('../controllers/TV_SeriesController')

router.get('/', TV_SeriesController.getTVSeries)
router.post('/', TV_SeriesController.postTVSeries)
router.get('/:title', TV_SeriesController.getOneTVSeries)
router.put('/:title', TV_SeriesController.putTVSeries)
router.patch('/:title', TV_SeriesController.patchTVSeries)
router.delete('/:title', TV_SeriesController.deleteTVSeries)

module.exports = router