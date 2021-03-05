const { getDatabase, ObjectID } = require('../config/mongoDb')
const collection = process.env.COLLECTION_NAME || 'TV_Series'
class Series {

  static getAllSeries = () => {
    return getDatabase().collection(collection).find({}).toArray()
  }

  static postSeries = payload => {
    return getDatabase().collection(collection).insertOne(payload)
  }

  static getSeries = payload => {
    return getDatabase().collection(collection).find({ _id: ObjectID(payload) }).toArray()
  }

  static putSeries = payload => {
    return getDatabase().collection(collection).updateOne({ _id: ObjectID(payload.id) }, {
      $set: payload.data
    }, {})
  }

  static patchSeries = payload => {
    return getDatabase().collection(collection).updateOne({ _id: ObjectID(payload.id) }, {
      $set: payload.data
    }, {})
  }

  static deleteSeries = payload => {
    return getDatabase().collection(collection).deleteOne({ _id: ObjectID(payload) })
  }

}

module.exports = Series