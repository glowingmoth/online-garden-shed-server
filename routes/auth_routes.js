const express = require('express');
const passport = require('passport');
const router = require('express-promise-router')();
const { ensureAuthenticated } = require('../helpers/auth');

const AuthController = require('../controllers/auth_controller');

router.route('/signin')
  .post(passport.authenticate('googleToken', { session: false }),
    AuthController.signIn
  );

router.route('/userinfo')
  .get(passport.authenticate('jwt', { session: false }),
    AuthController.userinfo
  );

router.route('/signout')
  .get(passport.authenticate('jwt', { session: false }),
    AuthController.signout
  );


module.exports = router;