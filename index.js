'use strict';

const express = require('express');

const app = express();

// routers
const { healthRouter, crawlRouter } = require('./routes');

// middlewares
app.use('/heath', healthRouter);
app.use('/crawl', crawlRouter);

app.listen('8080', () => {
  console.log('App listening on port 8080');
});
