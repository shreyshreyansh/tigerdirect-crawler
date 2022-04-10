'use strict';

const express = require('express');

const app = express();

// routes
app.get('/health', (req, res) => {
  res.send('OK');
});

app.listen('8080', () => {
  console.log('App listening on port 8080');
});
