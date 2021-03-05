const Movie = require('../models/Movie')

class MovieController {

  static getMovies = async (req, res, next) => {
    try {
      const movies = await Movie.getMovies()
      res.status(200).json(movies)
    }
    catch (err) {
      next(err)
    }
  }

  static postMovies = async (req, res, next) => {
    const { title, overview, poster_path, popularity, tags } = req.body
    try {
      const movie = await Movie.postMovie({
        title,
        overview,
        poster_path,
        popularity,
        tags
      })
      res.status(201).json(movie)
    }
    catch (err) {
      next(err)
    }
  }

  static getMovie = async (req, res, next) => {
    const { title } = req.params
    try {
      const movie = await Movie.getMovie({ title })
      res.status(200).json(movie)
    }
    catch(err) {
      next(err)
    }
  }

  static putMovie = async (req, res, next) => {
    const { title } = req.params
    const { overview, poster_path, popularity, tags } = req.body
    try {
      const movie = await Movie.putMovie(title, {
        overview,
        poster_path,
        popularity,
        tags
      })
      res.status(200).json(movie)
    }
    catch (err) {
      next(err)
    }
  }

  static patchMovie = async (req, res, next) => {
    const { title } = req.params
    const { overview, poster_path, popularity, tags } = req.body
    try {
      const movie = await Movie.patchMovie(title, {
        overview,
        poster_path,
        popularity,
        tags
      })
      res.status(200).json(movie)
    }
    catch (err) {
      next(err)
    }
  }

  static deleteMovies = async (req, res, next) => {
    const { title } = req.params
    try {
      const movie = await Movie.deleteMovies({ title })
      res.status(200).json(movie)
    }
    catch (err) {
      next(err)
    }
  }
}

module.exports = MovieController