const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();


// Route for Google authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route for Google callback
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // Create JWT token for the authenticated user
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_KEY, { expiresIn: '1h' });

    // Send the token to the frontend
    res.json({
      message: 'Google authentication successful',
      token: token,
      user: req.user // You can also send user data if needed
    });
  }
);

module.exports = router;
