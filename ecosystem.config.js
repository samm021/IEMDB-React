module.exports = {
  apps: [
    {
       name: 'entertainme - Client',
       script: 'cd client && npm install && npm start',
    },
    {
      name: 'entertainme - Orchestrator Apollo',
      script: 'cd server/orchestrator-apollo && npm install && nodemon app.js',
      env: {
        PORT: 4000
      },
    },
    {
      name: 'entertainme - Service Movies',
      script: 'cd server/services/movies && npm install && nodemon app.js',
      env: {
        DATABASE_NAME: "entertainme",
        COLLECTION_NAME: "Movie",
        PORT: 4001
      },
    },
    {
      name: 'entertainme - Service TV Series',
      script: 'cd server/services/series && npm install && nodemon app.js',
      env: {
        DATABASE_NAME: "entertainme",
        COLLECTION_NAME: "TV_Series",
        PORT: 4002
      },
    },
  ],
};