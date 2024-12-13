const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();



// Initiate Discord Authentication
router.get('/discord',
     passport.authenticate('discord', { scope: ['identify', 'email'] }));

// Discord Callback Route
router.get('/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/login' }),
  (req, res) => {
    // Create JWT token
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
    
    // Send the JWT token to the frontend
    res.json({ message: 'Discord authentication successful', token: token });
  }
);

module.exports = router;
