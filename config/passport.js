const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-token').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/user');
const Shed = require('../models/shed');

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
    console.log('token:', token);
  }
  return token;
}

module.exports = passport => {
  // for authorization
  passport.use('jwt', new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET
  }, async (payload, done) => {
    try {
      const foundUser = await User.findOne({ googleId: payload.sub });
      if (foundUser) {
        console.log('User found');
        return done(null, foundUser);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }));

  // for authentication
  passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('accessToken:', accessToken);
    console.log('refreshToken:', refreshToken);
    console.log('profile:', profile);
    try {
      const foundUser = await User.findOne({ googleId: profile.id})
      if (foundUser) {
        console.log('User already exists');
        return done(null, foundUser);
      } else {
        const newUser = await User.create({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
          followingSheds: [],
          followingPlantRecords: []
        });
        const newShed = await Shed.create({
          owner: newUser,
          plantRecords: []
        });
        newUser.shed = newShed;
        await newUser.save();
        return done(null, newUser);
      }
    } catch(error) {
      return done(error, false, error.message);
    }
  }));
}