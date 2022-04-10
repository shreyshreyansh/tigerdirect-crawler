const express = require('express');
const router = express.Router();

// controllers
const { heathController } = require('../controllers');

// routes
router.get('/', (req, res) => {
  heathController.heathChecker(req, res);
});

module.exports = router;
