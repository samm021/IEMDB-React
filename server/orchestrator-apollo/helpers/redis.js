const Redis = require('ioredis')
const redis = new Redis()

class Cache {

  static entertainMeCache = () => redis.get('entertainme:cache')

  static moviesCache = () => redis.get('movies:cache')

  static seriesCache = () => redis.get('series:cache')

  static setEntertainMeCache = payload => redis.set('entertainme:cache', JSON.stringify(payload))

  static setMoviesCache = payload => redis.set('movies:cache', JSON.stringify(payload))

  static setSeriesCache = payload => redis.set('series:cache', JSON.stringify(payload))

  static deleteEntertainMeCache = () => redis.del('entertainme:cache')

  static deleteMoviesCache = () => redis.del('movies:cache')

  static deleteSeriesCache = () => redis.del('series:cache')

}

module.exports = Cache