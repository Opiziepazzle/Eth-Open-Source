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

// Use environment variable to check the environment
const callbackURL = process.env.NODE_ENV === 'production'
    ? 'https://ethopensource.onrender.com/auth/github/callback'
    : 'http://localhost:3000/auth/github/callback';

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'https://ethopensource.onrender.com/auth/github/callback', // Replace with appropriate environment-based URL
      scope: ['user:email'],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        console.log('Access Token:', accessToken);
        console.log('Profile:', profile);

        if (!profile.emails || profile.emails.length === 0) {
          return done(new Error('No email found in GitHub profile'), null);
        }

        const email = profile.emails[0].value;
        console.log('GitHub Email:', email);

        let user = await userSchema.findOne({ githubId: profile.id });

        if (!user) {
          user = await userSchema.findOne({ email: email });
          if (user) {
            user.githubId = profile.id;
            await user.save();
          } else {
            user = new userSchema({
              githubId: profile.id,
              displayName: profile.displayName || profile.username || 'No Name',
              avatar: profile._json.avatar_url,
              email: email,
            });
            await user.save();
          }
        }

        return done(null, { ...user.toObject(), accessToken });
      } catch (err) {
        console.error('Error in GitHub Strategy:', err);
        return done(err, null);
      }
    }
  )
);



module.exports = passport;
