'use strict';

const express = require('express');

const app = express();

// routers
const { healthRouter, crawlRouter } = require('./routes');

// middlewares
const errorHandler = require('./middlewares/error-handler');

app.use('/health', healthRouter);
app.use('/crawl', crawlRouter);
app.use(errorHandler);

module.exports = app;
