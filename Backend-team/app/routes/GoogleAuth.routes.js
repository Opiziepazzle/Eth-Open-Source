const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();


// Route for Google authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Route for Google callback
// router.get(
//   '/auth/google/callback',
//   passport.authenticate('google', { session: false, failureRedirect: '/login' }),
//   (req, res) => {
//     // Create JWT token for the authenticated user
 //   const token = jwt.sign({ userId: req.user._id }, process.env.JWT_KEY, { expiresIn: '1h' });

//     // Send the token to the frontend
//     res.json({
//       message: 'Google authentication successful',
//       token: token,
//       user: req.user // You can also send user data if needed
//     });
//   }
// );







// Google Callback Route
// Google OAuth callback route
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),  // Corrected to 'google' instead of 'github'
  (req, res) => {
    console.log('User after Google Authentication:', req.user);

    // Ensure the user has an email from Google
    if (!req.user || !req.user.email) {
      console.error('Google user does not have an email. Redirecting to login.');
      return res.redirect('/login?error=no-email');
    }

    // Successful authentication, redirect to profile
    res.redirect('/profile');
  }
);




module.exports = router;
