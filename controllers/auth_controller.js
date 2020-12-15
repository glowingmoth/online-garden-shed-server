const JWT = require('jsonwebtoken');
const User = require('../models/user');

const signToken = user => {
  return JWT.sign({
    iss: 'ThomasNJason',
    sub: user.googleId,
  }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

module.exports = {
  signIn: async (req, res) => {
    console.log('signIn called');
    const token = signToken(req.user);
    res.cookie('access_token', token, {
      httpOnly: true
    });
    res.status(200).send({
      user: req.user,
      token
    });
  },
  userinfo: async (req, res) => {
    const foundUser = await User.findById(req.user.id)
    res.status(200).send(foundUser);
  },
  signout: async (req, res) => {
    console.log('signOut called');
    
  }
}