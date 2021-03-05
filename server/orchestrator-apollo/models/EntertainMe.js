const { movies, series } = require('../api/axios')

class EntertainMe {
  static getAll = () => {
    return Promise.all([
      movies({
        method: 'GET',
        url: '/movies'
      }),
      series({
        method: 'GET',
        url: '/tv'
      })
    ])
  }
}

module.exports = EntertainMe