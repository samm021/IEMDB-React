const { gql } = require('apollo-server')

const seriesTypeDefs = gql`

  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type SeriesMessage {
    message: String
  }

  input SeriesInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String] 
  }

  input SeriesInputPatch {
    popularity: Float!
  }

  extend type Query {
    getAllSeries: [Series]
    getSeries(_id: ID): [Series]
  }

  extend type Mutation {
    postSeries(data: SeriesInput): [Series]
    putSeries(_id: ID, data: SeriesInput): Series
    patchSeries(_id: ID, data: SeriesInputPatch): Series
    deleteSeries(_id: ID): SeriesMessage
  }

`

module.exports = seriesTypeDefs