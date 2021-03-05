const { ApolloServer, makeExecutableSchema } = require('apollo-server')
const movieResolver = require('./schemas/movieSchema/movieResolver')
const movieTypeDefs = require('./schemas/movieSchema/movieTypeDefs')
const seriesResolver = require('./schemas/seriesSchema/seriesResolver')
const seriesTypeDefs = require('./schemas/seriesSchema/seriesTypeDefs')
const entertainMeResolver = require('./schemas/entertainMeSchema/entertainMeResolver')
const entertainMeTypeDefs = require('./schemas/entertainMeSchema/entertainMeTypeDefs')

const typeDefs = `
  type Query
  type Mutation
`

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, movieTypeDefs, seriesTypeDefs, entertainMeTypeDefs],
  resolvers: [movieResolver, seriesResolver, entertainMeResolver]
})

const server = new ApolloServer({ schema })

server.listen().then(({ url }) => {
  console.log(`Orchestrator Apollo listening at ${url}`)
})