'use strict';

const app = require('./app');

// start listening on defined port
const start = async () => {
  app.listen(process.env.PORT || '8080', () => {
    console.log(`App listening on port ${process.env.PORT || 8080}`);
  });
};

start();
