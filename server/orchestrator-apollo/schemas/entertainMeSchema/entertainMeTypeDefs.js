const { gql } = require('apollo-server')

const entertainMeTypeDefs = gql`

  type EntertainMe {
    movies: [Movie]
    series: [Series]
  }


  extend type Query {
    entertainme: EntertainMe
  }

`

module.exports = entertainMeTypeDefs