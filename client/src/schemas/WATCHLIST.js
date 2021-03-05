import { gql } from '@apollo/client'

const getWatchlist = gql`
  query {
    watchlist @client
  }
`

export { getWatchlist }