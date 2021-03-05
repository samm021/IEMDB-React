const EntertainMe = require('../models/EntertainMe')
const Cache = require('../helpers/redis')

class EntertainMeMeController {
  static getAll = async (req, res, next) => {
    try {
      const allData = await Cache.entertainMeCache()
      if (allData) {
        res.status(200).json(JSON.parse(allData))
      } else {
        const entertainMe = await EntertainMe.getAll()
        await Cache.setEntertainMeCache({
          movies: entertainMe[0].data,
          tvSeries: entertainMe[1].data
        })
        res.status(200).json({
          movies: entertainMe[0].data,
          tvSeries: entertainMe[1].data
        })
      }
    }
    catch (err) {
      next(err)
    }
  }
}

module.exports = EntertainMeMeController