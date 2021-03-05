const Series = require('../../models/Series')
const Cache = require('../../helpers/redis')

const seriesResolver = {

  Query: {

    getAllSeries: async () => {
      try {
        const seriesCache = await Cache.seriesCache()
        if (seriesCache) {
          return JSON.parse(seriesCache)
        } else {
          const series = await Series.getAllSeries()
          await Cache.setSeriesCache(series.data)
          return series.data
        }
      }
      catch (err) {
        console.log(err)
        throw err
      }
    },

    getSeries: async (_, args) => {
      try {
        const series = await Series.getSeries(args._id)
        return series.data
      }
      catch (err) {
        console.log(err)
        throw err
      }
    },

  },

  Mutation: {

    postSeries: async (_, args) => {
      try {
        const series = await Series.postSeries(args.data)
        await Cache.deleteSeriesCache()
        await Cache.deleteEntertainMeCache()
        return series.data
      }
      catch (err) {
        console.log(err)
        throw err
      }
    },

    putSeries: async (_, args) => {
      try {
        const series = await Series.putSeries({
          _id: args._id,
          data: args.data
        })
        await Cache.deleteSeriesCache()
        await Cache.deleteEntertainMeCache()
        return series.data
      }
      catch (err) {
        console.log(err)
        throw err
      }
    },

    patchSeries: async (_, args) => {
      try {
        const series = await Series.patchSeries({
          _id: args.id,
          data: args.data
        })
        await Cache.deleteSeriesCache()
        await Cache.deleteEntertainMeCache()
        return series.data
      }
      catch (err) {
        console.log(err)
        throw err
      }
    },

    deleteSeries: async (_, args) => {
      try {
        const message = await Series.deleteSeries(args._id)
        await Cache.deleteSeriesCache()
        await Cache.deleteEntertainMeCache()
        return message.data
      }
      catch (err) {
        console.log(err)
        throw err
      }
    }

  }

}

module.exports = seriesResolver