const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("User");
// const port = process.env.PORT || 5000;

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  let user;
  try {
    user = await User.findById(id);
    cb(null, user);
  } catch (err) {
    cb(err, user);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async function(req, email, password, done) {
      let user;
      try {
        user = await User.findOne({ email: email });
        if (!user)
          return done(null, false, { message: "Email not registered." });
        const match = await user.checkPassword(password);
        if (!match)
          return done(null, false, { message: "Incorrect password." });
      } catch (err) {
        return done(err);
      }
      return done(null, user);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: `/api/auth/google/callback`
    },
    async function(accessToken, refreshToken, profile, cb) {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await new User({
          googleId: profile.id,
          name: profile._json.name
        }).save();
      }
      if (user) {
        cb(null, user);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientId,
      clientSecret: keys.facebookClientSecret,
      callbackURL: "/api/auth/facebook/callback"
    },
    async function(accessToken, refreshToken, profile, cb) {
      let user = await User.findOne({ facebookId: profile.id });
      if (!user) {
        user = await new User({
          facebookId: profile.id,
          name: profile._json.name
        }).save();
      }
      if (user) {
        cb(null, user);
      }
    }
  )
);
