const EntertainMe = require('../../models/EntertainMe')
const Cache = require('../../helpers/redis')

const entertainMeResolver = {

  Query: {

    entertainme: async () => {
      try {
        const entertainMeCache = await Cache.entertainMeCache()
        if (entertainMeCache) {
          return JSON.parse(entertainMeCache)
        } else {
          const entertainMe = await EntertainMe.getAll()
          await Cache.setEntertainMeCache({
            movies: entertainMe[0].data,
            series: entertainMe[1].data
          })
          return {
            movies: entertainMe[0].data,
            series: entertainMe[1].data
          }
        }
      }
      catch (err) {
        console.log(err)
        throw err
      }
    }
  }
}

module.exports = entertainMeResolver