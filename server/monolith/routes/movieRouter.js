const router = require('express').Router()
const MovieController = require('../controllers/MovieController')

router.get('/', MovieController.getMovies)
router.post('/', MovieController.postMovie)
router.get('/:title', MovieController.getMovie)
router.put('/:title', MovieController.putMovie)
router.patch('/:title', MovieController.patchMovie)
router.delete('/:title', MovieController.deleteMovies)

module.exports = router