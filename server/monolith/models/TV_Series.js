const { getDatabase } = require('../config/mongoDb')

class TV_Series {
  static getTVSeries = () => {
    return getDatabase().collection('TV_Series').find().toArray()
  }
  static getOneTVSeries = (payload) => {
    return getDatabase().collection('TV_Series').findOne(payload)
  }
}

module.exports = TV_Series