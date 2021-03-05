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
      res.status(201).json(movie.ops)
    }
    catch (err) {
      next(err)
    }
  }

  static getMovie = async (req, res, next) => {
    const { id } = req.params
    try {
      const movie = await Movie.getMovie(id)
      res.status(200).json(movie)
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
      if (JSON.parse(movie).n == 0 || JSON.parse(movie).nModified == 0) {
        throw { name: 'NotFound'}
      } else {
        res.status(200).json(movie.ops)
      }
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
      if (JSON.parse(movie).n == 0 || JSON.parse(movie).nModified == 0) {
        throw { name: 'NotFound'}
      } else {
        res.status(200).json(movie.ops)
      }
    }
    catch (err) {
      next(err)
    }
  }

  static deleteMovie = async (req, res, next) => {
    const { id } = req.params
    try {
      const movie = await Movie.deleteMovie(id)
      if (JSON.parse(movie).n == 0) {
        throw { name: 'NotFound'}
      } else {
        res.status(200).json({ message: 'Success, movie deleted'})
      }
    }
    catch (err) {
      next(err)
    }
  }
}

module.exports = MovieController