const { movies } = require('../api/axios')

class Movie {
  
  static getMovies = () => {
    return movies({
      method: 'GET',
      url: '/movies'
    })
  }

  static postMovie = data => {
    return movies({
      method: 'POST',
      url: '/movies',
      data
    })
  }

  static getMovie = _id => {
    return movies({
      method: 'GET',
      url: `/movies/${_id}`
    })
  }

  static putMovie = ({ _id, data }) => {
    return movies({
      method: 'PUT',
      url: `/movies/${_id}`,
      data
    })
  }

  static patchMovie = ({ _id, data }) => {
    return movies({
      method: 'PATCH',
      url: `/movies/${_id}`,
      data
    })
  }

  static deleteMovie = _id => {
    return movies({
      method: 'DELETE',
      url: `/movies/${_id}`
    })
  }

}

module.exports = Movie