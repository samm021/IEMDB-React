const TV_Series = require('../models/TV_Series')

class TV_SeriesController {

  static getTVSeries = async (req, res, next) => {
    try {
      const tv_series = await TV_Series.getTVSeries()
      res.status(200).json(tv_series)
    }
    catch (err) {
      next(err)
    }
  }

  static postTVSeries = async (req, res, next) => {
    const { title, overview, poster_path, popularity, tags } = req.body
    try {
      const tv_series = await TV_Series.postTVSeries({
        title,
        overview,
        poster_path,
        popularity,
        tags
      })
      res.status(201).json(tv_series)
    }
    catch (err) {
      next(err)
    }
  }

  static getOneTVSeries = async (req, res, next) => {
    const { title } = req.params 
    try {
      const tv_series = await TV_Series.getOneTVSeries({ title })
      res.status(200).json(tv_series)
    }
    catch (err) {
      next(err)
    }
  }

  static putTVSeries = async (req, res, next) => {
    const title = req.params
    const { overview, poster_path, popularity, tags } = req.body
    try {
      const tv_series = await TV_Series.putTVSeries(title, {
        overview,
        poster_path,
        popularity,
        tags
      })
      res.status(200).json(tv_series)
    }
    catch (err) {
      next(err)
    }
  }

  static patchTVSeries = async (req, res, next) => {
    const title = req.params
    const { overview, poster_path, popularity, tags } = req.body
    try {
      const tv_series = await TV_Series.patchTVSeries(title, {
        overview,
        poster_path,
        popularity,
        tags
      })
      res.status(200).json(tv_series)
    }
    catch (err) {
      next(err)
    }
  }

  static deleteTVSeries = async (req, res, next) => {
    const title = req.params
    try {
      const tv_series = await TV_Series.deleteTVSeries({ title })
      res.status(200).json(tv_series)
    }
    catch (err) {
      next(err)
    }
  }

}

module.exports = TV_SeriesController