import { gql } from '@apollo/client'

const getAllSeries = gql`
  query {
    getAllSeries {
      _id
      title
      poster_path
      tags
    }
  }
`

const getSeries = gql`
  query ($id: ID) {
    getSeries (_id: $id) {
      _id
      title
      poster_path
      tags
      overview
      popularity
    }
  }
`

const postSeries = gql`
  mutation ($data: SeriesInput) {
    postSeries(data: $data) {
      _id
      title
      poster_path
      tags
      overview
      popularity
    }
  }
`
const putSeries = gql`
  mutation ($id: ID, $data: SeriesInput) {
    putSeries(_id: $id, data: $data) {
      _id
      title
      poster_path
      tags
      overview
      popularity
    }
  }
`
const deleteSeries = gql`
  mutation ($id: ID) {
    deleteSeries(_id: $id) {
      message
    }
  }
`

export { getAllSeries, getSeries, postSeries, putSeries, deleteSeries }