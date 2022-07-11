const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;


const GOOGLE_CLIENT_ID = process.env.CLIENT_ID//'189992687297-pk6qd1toijahev3tgmlsq4nb4sb729ma.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET//'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';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:45678/api/session/oath/google",
  passReqToCallback: true,
},

// function(request, accessToken, refreshToken, profile, done) {
//   return done(null, profile);
// }

async (request, accessToken, refreshToken, profile, done) => {
  try {
    await User.findOne({ 'google.id': profile.id });
    // if user exists return the user 
    if (existingUser) {
      return done(null, existingUser);
    }
    // if user does not exist create a new user 
    console.log('Creating new user...');
    const newUser = new User({
      method: 'google',
      google: {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      }
    });
    await newUser.save();
    return done(null, newUser);
    
  } catch (error) {
    return done(error, false)
  }
}

));




passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log(user);
  done(null, user);
});