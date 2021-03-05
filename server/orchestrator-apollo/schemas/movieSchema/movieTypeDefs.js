const { gql } = require('apollo-server')

const movieTypeDefs = gql`

  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type MovieMessage {
    message: String
  }

  input MovieInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]
  }

  input MovieInputPatch {
    popularity: Float!
  }

  extend type Query {
    getMovies: [Movie]
    getMovie(_id: ID): [Movie]
  }

  extend type Mutation {
    postMovie(data: MovieInput): [Movie]
    putMovie(_id: ID, data: MovieInput): Movie
    patchMovie(_id: ID, data: MovieInputPatch): Movie
    deleteMovie(_id: ID): MovieMessage
  }

`
module.exports = movieTypeDefs