const Series = require('../models/Series')

class SeriesController {

  static getAllSeries = async (req, res, next) => {
    try {
      const series = await Series.getAllSeries()
      res.status(200).json(series)
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
      res.status(201).json(series.ops)
    }
    catch (err) {
      next(err)
    }
  }

  static getSeries = async (req, res, next) => {
    const { id } = req.params 
    try {
      const series = await Series.getSeries(id)
      res.status(200).json(series)
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
      if (JSON.parse(series).n == 0 || JSON.parse(series).nModified == 0) {
        throw { name: 'NotFound'}
      } else {
        res.status(200).json(series.ops)
      }
    }
    catch (err) {
      next(err)
    }
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
      if (JSON.parse(series).n == 0 || JSON.parse(series).nModified == 0) {
        throw { name: 'NotFound'}
      } else {
        res.status(200).json(series.ops)
      }
    }
    catch (err) {
      next(err)
    }
  }

  static deleteSeries = async (req, res, next) => {
    const { id } = req.params
    try {
      const series = await Series.deleteSeries(id)
      if (JSON.parse(series).n == 0) {
        throw { name: 'NotFound'}
      } else {
        res.status(200).json({ message: 'Success, series deleted'})
      }
    }
    catch (err) {
      next(err)
    }
  }

}

module.exports = SeriesController