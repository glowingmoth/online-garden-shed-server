const JWT = require('jsonwebtoken');

const signToken = user => {
  return JWT.sign({
    iss: 'ThomasNJason',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, process.env.JWT_SECRET);
}

module.exports = {
  signIn: async (req, res, next) => {
    console.log('signIn called');
    const token = signToken(req.user);
    res.cookie('access_token', token, {
      httpOnly: true
    });
    res.status(200).json({ token });
  }
}