const { MongoClient, ObjectID } = require('mongodb')

let database = null

const connect = async () => {
  const uri = 'mongodb://localhost:27017'
  const client = new MongoClient(uri, { useUnifiedTopology: true })
  try {
    await client.connect()
    db = client.db('entertainme')
    database = db
    return db
  }
  catch (err) {
    console.log(err)
  }
}

const getDatabase = () => {
  return database
}

module.exports = { connect, getDatabase, ObjectID }