const express = require('express');
const passport = require('passport');
const router = require('express-promise-router')();

const AuthController = require('../controllers/auth_controller');

router.route('/signin')
  .post(passport.authenticate('googleToken', { session: false }),
    AuthController.signIn
  );

module.exports = router;