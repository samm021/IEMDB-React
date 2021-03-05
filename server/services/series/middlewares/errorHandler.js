const errorHandler = ( err, req, res, next) => {
  switch (err.name) {
    case 'NotFound':
      res.status(404).json({ message: 'Movies Not Found'})
    default:
      res.status(500).json({ message: 'Internal Server Error'})
  }
}

module.exports = errorHandler