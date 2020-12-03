const express = require('express');
const router = express.Router();

const ShedsController = require('../controllers/sheds_controller');

router.route('/')
  .get(ShedsController.index);

module.exports = router;