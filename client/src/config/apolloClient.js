import { ApolloClient, InMemoryCache } from '@apollo/client'
import watchlistVar from './cache'

const client = new ApolloClient({
  uri: 'http://54.179.61.252:4000',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          watchlist: {
            read() {
              return watchlistVar()
            }
          },
          getAllSeries: {
            merge(existing, incoming){
              return incoming
            }
          },
          getMovies: {
            merge(existing, incoming){
              return incoming
            }
          }
        }
      }
    }
  })
})

export default client