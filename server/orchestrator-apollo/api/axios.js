const axios = require('axios')

const movies = axios.create({
  baseURL: 'http://localhost:4001'
})

const series = axios.create({
  baseURL: 'http://localhost:4002'
})

module.exports = { movies, series }
