const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');

module.exports = passport => {
  passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }, async (accessToken, refreshToken, profile, done) => {

  })f);
}