import { gql } from '@apollo/client'

const getEntertainMe = gql`
  query {
    entertainme {
      movies{
        _id
        title
        poster_path
        tags
      }
      series{
        _id
        title
        poster_path
        tags
      }
    }
  }
`

export { getEntertainMe }