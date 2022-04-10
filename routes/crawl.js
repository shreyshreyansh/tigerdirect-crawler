const express = require('express');
const router = express.Router();

// controllers
const { crawlController } = require('../controllers');

// routes
router.get('/', (req, res, next) => {
  crawlController.crawlReviews(req, res, next);
});

module.exports = router;
