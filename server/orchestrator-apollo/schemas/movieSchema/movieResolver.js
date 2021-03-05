const Movie = require('../../models/Movie')
const Cache = require('../../helpers/redis')

const movieResolver = {

  Query: {
    
    getMovies: async () => {
      try {
        const moviesCache = await Cache.moviesCache()
        if (moviesCache) {
          return JSON.parse(moviesCache)
        } else {
          const movies = await Movie.getMovies()
          await Cache.setMoviesCache(movies.data)
          return movies.data
        }
      }
      catch (err) {
        console.log(err)
        throw err
      }
    },

    getMovie: async (_, args) => {
      try {
        const movie = await Movie.getMovie(args._id)
        return movie.data
      }
      catch (err) {
        console.log(err)
        throw err
      }
    }

  },

  Mutation: {

    postMovie: async (_, args) => {
      try {
        const movie = await Movie.postMovie(args.data)
        await Cache.deleteMoviesCache()
        await Cache.deleteEntertainMeCache()
        return movie.data
      }
      catch (err) {
        console.log(err)
        throw err
      }
    },

    putMovie: async (_, args) => {
      try {
        const movie = await Movie.putMovie({
          _id: args._id,
          data: args.data 
        })
        await Cache.deleteMoviesCache()
        await Cache.deleteEntertainMeCache()
        return movie.data
      }
      catch (err) {
        console.log(err)
        throw err
      }
    },

    patchMovie: async (_, args) => {
      try {
        const movie = await Movie.patchMovie({
          _id: args._id,
          data: args.data
        })
        await Cache.deleteMoviesCache()
        await Cache.deleteEntertainMeCache()
        return movie.data
      }
      catch (err) {
        console.log(err)
        throw err
      }
    },

    deleteMovie: async (_, args) => {
      try {
        const message = await Movie.deleteMovie(args._id)
        await Cache.deleteMoviesCache()
        await Cache.deleteEntertainMeCache()
        return message.data
      }
      catch (err) {
        console.log(err)
        throw err
      }
    }

  }

}

module.exports = movieResolver