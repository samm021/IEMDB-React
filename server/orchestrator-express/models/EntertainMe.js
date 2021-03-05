const { movies, tv } = require('../api/axios')

class EntertainMe {
  static getAll = () => {
    return Promise.all([
      movies({
        method: 'GET',
        url: '/movies'
      }),
      tv({
        method: 'GET',
        url: '/tv'
      })
    ])
  }
}

module.exports = EntertainMe