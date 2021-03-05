const Movie = require('../models/Movie')
const Cache = require('../helpers/redis')

class MovieController {

  static getMovies = async (req, res, next) => {
    try {
      const moviesCache = await Cache.moviesCache()
      if (moviesCache) {
        res.status(200).json(JSON.parse(moviesCache))
      } else {
        const movies = await Movie.getMovies()
        await Cache.setMoviesCache(movies.data)
        res.status(200).json(movies.data)
      }
    }
    catch (err) {
      next(err)
    }
  }

  static postMovie = async (req, res, next) => {
    const { title, overview, poster_path, popularity, tags } = req.body
    try {
      const movie = await Movie.postMovie({
        title,
        overview,
        poster_path,
        popularity,
        tags
      })
      await Cache.deleteMoviesCache()
      res.status(201).json(movie.data)
    }
    catch (err) {
      next(err)
    }
  }

  static getMovie = async (req, res, next) => {
    const { id } = req.params
    try {
      const movie = await Movie.getMovie(id)
      res.status(200).json(movie.data)
    }
    catch(err) {
      next(err)
    }
  }

  static putMovie = async (req, res, next) => {
    const { id } = req.params
    const { title, overview, poster_path, popularity, tags } = req.body
    try {
      const movie = await Movie.putMovie({
        id,
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags
        }
      })
      await Cache.deleteMoviesCache()
      res.status(200).json(movie.data)
    }
    catch (err) {
      next(err)
    }
  }

  static patchMovie = async (req, res, next) => {
    const { id } = req.params
    const { popularity } = req.body
    try {
      const movie = await Movie.patchMovie({
        id,
        data: {
          popularity
        }
      })
      await Cache.deleteMoviesCache()
      res.status(200).json(movie.data)
    }
    catch (err) {
      next(err)
    }
  }

  static deleteMovie = async (req, res, next) => {
    const { id } = req.params
    try {
      const movie = await Movie.deleteMovie(id)
      await Cache.deleteMoviesCache()
      res.status(200).json(movie.data)
    }
    catch (err) {
      next(err)
    }
  }
}

module.exports = MovieController