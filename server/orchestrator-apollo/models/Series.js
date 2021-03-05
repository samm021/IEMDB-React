const { series } = require('../api/axios')

class Series {

  static getAllSeries = () => {
    return series({
      method: 'GET',
      url: '/tv'
    })
  }

  static postSeries = data => {
    return series({
      method: 'POST',
      url: '/tv',
      data
    })
  }

  static getSeries = _id => {
    return series({
      method: 'GET',
      url: `/tv/${_id}`
    })
  }

  static putSeries = ({ _id, data }) => {
    return series({
      method: 'PUT',
      url: `/tv/${_id}`,
      data
    })
  }

  static patchSeries = ({ _id, data }) => {
    return series({
      method: 'PATCH',
      url: `/tv/${_id}`,
      data
    })
  }

  static deleteSeries = _id => {
    return series({
      method: 'DELETE',
      url: `/tv/${_id}`
    })
  }

}

module.exports = Series