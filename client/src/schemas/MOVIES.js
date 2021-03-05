import { gql } from '@apollo/client'

const getMovies = gql`
  query {
    getMovies {
      _id
      title
      poster_path
      tags
    }
  }
`
const getMovie = gql`
  query ($id: ID) {
    getMovie(_id: $id) {
      _id
      title
      poster_path
      tags
      overview
      popularity
    }
  }
`

const postMovie = gql`
  mutation ($data: MovieInput) {
    postMovie(data: $data) {
      _id
      title
      poster_path
      tags
      overview
      popularity
    }
  }
`
const putMovie = gql`
  mutation ($id: ID, $data: MovieInput) {
    putMovie(_id: $id, data: $data) {
      _id
      title
      poster_path
      tags
      overview
      popularity
    }
  }
`
const deleteMovie = gql`
  mutation ($id: ID) {
    deleteMovie(_id: $id) {
      message
    }
  }
`

export { getMovies, getMovie, postMovie, putMovie, deleteMovie }