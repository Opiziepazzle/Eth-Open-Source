const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();


// // Route for Google authentication
router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));



// Route for Google callback
// router.get(
//     '/callback',
//     passport.authenticate('google', { session: false, failureRedirect: '/login' }),
//     (req, res) => {
//       // Create JWT token for the authenticated user
//       const token = jwt.sign({ userId: req.user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
  
//       // Redirect to frontend with token as a query parameter
//       // Redirect to the frontend with the token as part of the URL
//     const redirectUrl = `http://localhost:3000/learn-section?token=${token}`;
//     res.redirect(redirectUrl);
//     }
//   );




//  // Google OAuth callback route
router.get(
  '/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    try {
      console.log('User after Google Authentication:', req.user);

      // Ensure the user has an email from Google
      if (!req.user || !req.user.email) {
        console.error('Google user does not have an email. Redirecting to login.');
        return res.redirect('/login?error=no-email');
      }

      // Ensure the JWT_KEY is correctly set
      if (!process.env.JWT_KEY) {
        console.error('JWT_KEY not set in environment');
        return res.status(500).json({
          error: {
            message: 'Internal server error: JWT_KEY not set.',
            details: null,
          },
        });
      }

      // Create JWT token for the authenticated user
      let token = jwt.sign({ userId: req.user._id }, process.env.JWT_KEY, { expiresIn: '1h' });

      // Send the token and user info as JSON response
      res.json({
        message: 'Google authentication successful',
        token: token,
        user: req.user, // You can also send user data if needed
      });
    } catch (error) {
      console.error('Error during Google authentication callback:', error);
      res.status(500).json({
        error: {
          message: 'Internal server error',
          details: error.message,
        },
      });
    }
  }
);

// Home Route (Login page)
router.get('/home', (req, res) => {
  res.send(`
    <h1>Server is running!</h1>
    <a href="/auth/google">
      <button>Login with Google</button>
    </a>
  `);
});












module.exports = router;
