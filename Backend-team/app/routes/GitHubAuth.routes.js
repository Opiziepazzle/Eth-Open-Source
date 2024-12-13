const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const contributorSchema = require('../models/contributor.model'); 
const maintainerSchema = require('../models/maintainer.model'); 

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // After successful GitHub login, check for user profile
    const userId = req.user._id;

    // Check if user is a Contributor
    contributorSchema.findOne({ contributorId: userId })
      .then(contributor => {
        if (contributor) {
          return res.redirect('http://localhost:3000/dashboard/contributor');
        }

        // If not a Contributor, check if user is a Maintainer
        return maintainerSchema.findOne({ maintainerId: userId });
      })
      .then(maintainer => {
        if (maintainer) {
          return res.redirect('http://localhost:3000/dashboard/maintainer');
        }

        // If neither, ask user to complete profile
        res.redirect('http://localhost:3000/choose-role');
      })
      .catch(err => {
        console.error(err);
        res.redirect('http://localhost:3000/login');
      });
  });


module.exports = router;







