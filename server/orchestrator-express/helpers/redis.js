const Redis = require('ioredis')
const redis = new Redis()

class Cache {

  static entertainMeCache = () => {
    return redis.get('entertainme:data')
  }

  static moviesCache = () => {
    return redis.get('movies:data')
  }

  static seriesCache = () => {
    return redis.get('series:data')
  }

  static setEntertainMeCache = payload => {
    return redis.set('entertainme:data', JSON.stringify(payload))
  }

  static setMoviesCache = payload => {
    return redis.set('movies:data', JSON.stringify(payload))
  }

  static setSeriesCache = payload => {
    return redis.set('series:data', JSON.stringify(payload))
  }

  static deleteMoviesCache = () => {
    return redis.del('movies:data')
  }

  static deleteSeriesCache = () => {
    return redis.del('series:data')
  }

}

module.exports = Cache