const { getDatabase, ObjectID } = require('../config/mongoDb')
const collection = process.env.COLLECTION_NAME || 'Movie'

class Movie {

  static getMovies = () => {
    return getDatabase().collection(collection).find({}).toArray()
  }

  static postMovie = payload => {
    return getDatabase().collection(collection).insertOne(payload)
  }

  static getMovie = payload => {
    return getDatabase().collection(collection).find({ _id: ObjectID(payload) }).toArray()
  }

  static putMovie = payload => {
    return getDatabase().collection(collection).updateOne({ _id: ObjectID(payload.id) }, {
      $set: payload.data
    }, {})
  }

  static patchMovie = payload => {
    return getDatabase().collection(collection).updateOne({ _id: ObjectID(payload.id) }, {
      $set: payload.data
    }, {})
  }

  static deleteMovie = payload => {
    return getDatabase().collection(collection).deleteOne({ _id: ObjectID(payload) })
  }

}

module.exports = Movie