const express = require('express');
const router = express.Router();

// controllers
const { crawlController } = require('../controllers');

// routes
router.get('/', (req, res) => {
  crawlController.crawlReviews(req, res);
});

module.exports = router;
