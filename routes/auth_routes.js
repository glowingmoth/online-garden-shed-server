const express = require('express');
const router = require('express-promise-router')();

const AuthController = require('../controllers/auth_controller');

router.route('/signin')
  .post(AuthController.signIn);

module.exports = router;