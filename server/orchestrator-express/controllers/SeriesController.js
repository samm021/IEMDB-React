const Series = require('../models/Series')
const Cache = require('../helpers/redis')

class SeriesController {

  static getAllSeries = async (req, res, next) => {
    try {
      const seriesData = await Cache.seriesCache()
      if (seriesData) {
        res.status(200).json(JSON.parse(seriesData))
      } else {
        const series = await Series.getAllSeries()
        await Cache.setSeriesCache(series.data)
        res.status(200).json(series.data)
      }
    }
    catch (err) {
      next(err)
    }
  }

  static postSeries = async (req, res, next) => {
    const { title, overview, poster_path, popularity, tags } = req.body
    try {
      const series = await Series.postSeries({
        title,
        overview,
        poster_path,
        popularity,
        tags
      })
      await Cache.deleteSeriesCache()
      res.status(201).json(series.data)
    }
    catch (err) {
      next(err)
    }
  }

  static getSeries = async (req, res, next) => {
    const { id } = req.params 
    try {
      const series = await Series.getSeries(id)
      res.status(200).json(series.data)
    }
    catch (err) {
      next(err)
    }
  }

  static putSeries = async (req, res, next) => {
    const { id } = req.params
    const { title, overview, poster_path, popularity, tags } = req.body
    try {
      const series = await Series.putSeries({
        id,
        data: {
          title,
          overview,
          poster_path,
          popularity,
          tags
        }
      })
      await Cache.deleteSeriesCache()
      res.status(200).json(series.data)
    }
    catch (err) {
      next(err)
    }n
  }

  static patchSeries = async (req, res, next) => {
    const { id } = req.params
    const { popularity } = req.body
    try {
      const series = await Series.patchSeries({
        id,
        data: {
          popularity
        }
      })
      await Cache.deleteSeriesCache()
      res.status(200).json(series.data)
    }
    catch (err) {
      next(err)
    }
  }

  static deleteSeries = async (req, res, next) => {
    const { id } = req.params
    try {
      const series = await Series.deleteSeries(id)
      await Cache.deleteSeriesCache()
      res.status(200).json(series.data)
    }
    catch (err) {
      next(err)
    }
  }

}

module.exports = SeriesController