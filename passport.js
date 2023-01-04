const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser((user , done) => {
    done(null , user);
})
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID:"74119569687-uve7kucug4mlhgom87srambv6c524ji9.apps.googleusercontent.com", // Your Credentials here.
    clientSecret:"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", // Your Credentials here.
    callbackURL:"http://localhost:5001/auth/callback",
    passReqToCallback:true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));
