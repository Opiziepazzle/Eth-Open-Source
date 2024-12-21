const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const userSchema = require('../models/user.model');



// // Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        const user = await userSchema.findOne({ googleId: profile.id });
        if (!user) {
          // Create a new user if not found
          user = new userSchema({
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
            email: profile.emails[0].value,
            
          });
          await user.save();
        }
        done(null, user);
      } catch (err) {
        done(err, false, err.message);
      }
    }
  ));
  



// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: 'http://localhost:3000/auth/google/callback',
//       scope: ['email'],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Check if user already exists
//         let user = await userSchema.findOne({ googleId: profile.id, username: profile.displayName });
//         if (!user) {
//           // Create a new user if not found
//           user = new userSchema({
//             googleId: profile.id,
//             displayName: profile.displayName,
//             firstName: profile.name.givenName,
//             lastName: profile.name.familyName,
//             image: profile.photos[0].value,
//             email: profile.emails[0].value,
//           });
//           await user.save();
//         }
//         done(null, user);
//       } catch (err) {
//         // Log the error to the terminal
//         console.error('Error during Google authentication:', err);
//         done(err, false, err.message);  // Passing the error and message
//       }
//     }
//   )
// );




// Github Strategy

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/callback',
      scope: ['user:email']  
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userSchema.findOne({ githubId: profile.id });

        if (!user) {
          user = new userSchema({
            githubId: profile.id,
            username: profile.username,
            email: profile.emails?.[0]?.value,
            avatar: profile.photos[0]?.value,
            accessToken, // Save the access token for later use
            provider: 'github',
          });
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, false, err.message);
      }
    }
  )
);















// Discord OAuth Strategy
// passport.use(
//   new DiscordStrategy(
//     {
//       clientID: process.env.DISCORD_CLIENT_ID,
//       clientSecret: process.env.DISCORD_CLIENT_SECRET,
//       callbackURL: '/discord/callback', 
//       scope: ['identify', 'email'], // Ensure scope for email access
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const user = await userSchema.findOne({ discordId: profile.id });
//         if (!user) {
//           user = new userSchema({
//             discordId: profile.id,
//             username: profile.username,
//             email: profile.email,
//           });
//           await user.save();
//         }
//         return done(null, user);
//       } catch (err) {
//         return done(err, false, err.message);
//       }
//     }
//   )
// );



module.exports = passport;
