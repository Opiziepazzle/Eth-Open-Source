const passport = require('passport');
const axios = require('axios');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const userSchema = require('../models/user.model');
require('dotenv').config(); 


//Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //callbackURL: 'http://localhost:3000/auth/google/callback',
      callbackURL: 'https://ethopensource.onrender.com/auth/google/callback',
      scope: ['email'],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Check if a user with the same Google ID exists
        let user = await userSchema.findOne({ googleId: profile.id });

        if (user) {
          // If user exists, pass the user to the next middleware
          return done(null, user);
        }

        // If Google ID doesn't exist, check for the email
        user = await userSchema.findOne({ email: profile.emails[0].value });

        if (user) {
          // Update the existing user with the Google ID
          user.googleId = profile.id;
          await user.save();
          return done(null, { ...user.toObject(), accessToken });
        }

        // If no user exists with the same email, create a new user
        const newUser = new userSchema({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value, // Get the first email from the profile
        });

        const savedUser = await newUser.save();
        return done(null, { ...savedUser.toObject(), accessToken });
      } catch (err) {
        // Handle any errors
        return done(err, null);
      }
    }
  )
);









//Github Strategy

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'https://ethopensource.onrender.com/auth/github/callback',
      scope: ['user:email'],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        console.log('Access Token:', accessToken);
        console.log('Profile:', profile);
        
        // Ensure profile.emails is fetched and available
        if (profile.emails && profile.emails.length > 0) {
          const email = profile.emails[0].value;
          console.log('GitHub Email:', email);  // Log the email to ensure it's fetched correctly

          let user = await userSchema.findOne({ githubId: profile.id });
  
          if (user) {
            // If user exists, update the email if it's missing
            if (!user.email) {
              user.email = email; // Add email if it's missing
              await user.save();
            }
            return done(null, { ...user.toObject(), accessToken });
          }

          // If no user found by githubId, check for the email
          user = await userSchema.findOne({ email: email });

          if (user) {
            user.githubId = profile.id;
            await user.save();
            return done(null, { ...user.toObject(), accessToken });
          }
  
          // If no existing user, create a new one
          const newUser = new userSchema({
            githubId: profile.id,
            displayName: profile.displayName || profile.username || 'No Name',
            avatar: profile._json.avatar_url,
            email: email, 
          });
  
          const savedUser = await newUser.save();
          return done(null, { ...savedUser.toObject(), accessToken });
        } else {
          return done(new Error('No email found in GitHub profile'), null);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, { id: user.githubId, accessToken: user.accessToken });
});

passport.deserializeUser(async (userData, done) => {
  try {
    const user = await userSchema.findOne({ githubId: userData.id });
    if (!user) {
      return done(new Error('User not found during deserialization'));
    }
    done(null, { ...user.toObject(), accessToken: userData.accessToken });
  } catch (err) {
    done(err, null);
  }
});




module.exports = passport;
