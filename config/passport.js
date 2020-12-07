const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const User = require('../models/user');
const Shed = require('../models/shed');

module.exports = passport => {
  passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('profile:', profile)
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
      done(error, false, error.message);
    }
  }));
}