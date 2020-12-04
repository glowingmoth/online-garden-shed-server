const express = require('express');
const router = require('express-promise-router')();

const ShedsController = require('../controllers/sheds_controller');

router.route('/')
  .get(ShedsController.index);

module.exports = router;