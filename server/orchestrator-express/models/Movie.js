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

  static getMovie = id => {
    return movies({
      method: 'GET',
      url: `/movies/${id}`
    })
  }

  static putMovie = payload => {
    return movies({
      method: 'PUT',
      url: `/movies/${payload.id}`,
      data: payload.data
    })
  }

  static patchMovie = payload => {
    return movies({
      method: 'PATCH',
      url: `/movies/${payload.id}`,
      data: payload.data
    })
  }

  static deleteMovie = id => {
    return movies({
      method: 'DELETE',
      url: `/movies/${id}`
    })
  }
}

module.exports = Movie