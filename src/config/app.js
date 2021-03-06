const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const environment = require('./environment');

/**
 * Connect to the database
 */
mongoose.connect(environment.database);

module.exports = (routes) => {
  const app = express();
  
  /**
   * Middleware
   */
  app.use(cors({ origin: '*' }));
  app.enable('trust proxy');
  if (environment.environment === 'development') app.use(morgan('dev'));

  /**
   * Connect the routes
   */
  if (routes && typeof routes === 'function') {
    routes(app);
  }

  return app;
}
