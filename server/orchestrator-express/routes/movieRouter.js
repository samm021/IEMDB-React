const router = require('express').Router()
const MovieController = require('../controllers/MovieController')

router.get('/', MovieController.getMovies)
router.post('/', MovieController.postMovie)
router.get('/:id', MovieController.getMovie)
router.put('/:id', MovieController.putMovie)
router.patch('/:id', MovieController.patchMovie)
router.delete('/:id', MovieController.deleteMovie)

module.exports = router