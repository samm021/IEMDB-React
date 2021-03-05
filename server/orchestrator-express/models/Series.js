const { tv } = require('../api/axios')

class Series {

  static getAllSeries = () => {
    return tv({
      method: 'GET',
      url: '/tv'
    })
  }
  
  static postSeries = data => {
    return tv({
      method: 'POST',
      url: '/tv',
      data 
    })
  }

  static getSeries = id => {
    return tv({
      method: 'GET',
      url: `/tv/${id}`
    })
  }

  static putSeries = payload => {
    return tv({
      method: 'PUT',
      url: `/tv/${payload.id}`,
      data: payload.data
    })
  }

  static patchSeries = payload => {
    return tv({
      method: 'PATCH',
      url: `/tv/${payload.id}`,
      data: payload.data
    })
  }

  static deleteSeries = id => {
    return tv({
      method: 'DELETE',
      url: `/tv/${id}`
    })
  }
}

module.exports = Series