const { getDatabase } = require('../config/mongoDb')

class Movie {
  static getMovies = () => {
    return getDatabase().collection('Movie').find().toArray()
  }
  static getMovie = (payload) => {
    return getDatabase().collection('Movies').findOne(payload)
  }
}

module.exports = Movie