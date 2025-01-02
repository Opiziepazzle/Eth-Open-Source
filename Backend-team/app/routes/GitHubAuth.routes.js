const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const userSchema = require('../models/user.model');
const contributorSchema = require('../models/contributor.model');
const maintainerSchema = require('../models/maintainer.model');

const router = express.Router();

// GitHub Login Endpoint
router.get('/', passport.authenticate('github', { scope: ['user:email', 'repo', 'issues'] }));

// GitHub OAuth Callback
router.get(
  '/callback',
  passport.authenticate('github', { session: false }),
  async (req, res) => {
    try {
      const userId = req.user._id; // Authenticated user ID
      const accessToken = req.user.accessToken; // GitHub access token

      // Fetch user repositories from GitHub
      const response = await axios.get('https://api.github.com/user/repos', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const repos = response.data;

      // Check if user exists in the database
      let user = await userSchema.findById(userId);

      if (!user) {
        // Create a new user if not found
        user = await userSchema.create({ githubId: req.user.githubId });
      }

      // Check roles
      const contributor = await contributorSchema.findOne({ contributorId: user._id });
      const maintainer = await maintainerSchema.findOne({ maintainerId: user._id });

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });

       // Send response with token, repositories, and role
       const role = contributor ? 'contributor' : maintainer ? 'maintainer' : 'none';

      // Respond with token, repos, and role
      res.json({
        token,
        repos,
        role
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Authentication failed' });
    }
  }
);



// Fetch Issues for a Repository
router.get('/issues/:owner/:repo', async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const accessToken = req.user.accessToken;

    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/issues`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
});



// Create an Issue for a Repository
router.post('/issues/:owner/:repo', async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const { title, body } = req.body;
    const accessToken = req.user.accessToken;

    const response = await axios.post(
     `https://api.github.com/repos/${owner}/${repo}/issues` ,
      { title, body },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create issue' });
  }
});



// Fetch Pull Requests for a Repository
router.get('/pulls/:owner/:repo', async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const accessToken = req.user.accessToken;

    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch pull requests' });
  }
});









//Simple code for testing Github

// Home route with the login button
// router.get('/home', (req, res) => {
//   res.send(`
//     <h1>GitHub OAuth Test</h1>
//     <a href="/auth/github">
//       <button style="padding: 10px 20px; font-size: 16px; cursor: pointer;">Login with GitHub</button>
//     </a>
//   `);
// });



// // GitHub callback route
// router.get(
//   '/callback',
//   passport.authenticate('github', { failureRedirect: '/' }),
//   (req, res) => {
//     // On success, redirect to /profile
//     res.redirect('/auth/github/profile');
//   }
// );

// // Profile route (displays email, username, and token)
// router.get('/profile', (req, res) => {
//   if (!req.isAuthenticated()) {
//     return res.status(401).json({ success: false, message: 'Unauthorized' });
//   }

//   const user = req.user;
//   console.log('Authenticated user:', user); // Log user info
//   res.send(`
//     <h1>GitHub Authentication Successful!</h1>
//     <p><strong>Username:</strong> ${user.displayName || 'No username available'}</p>
//     <p><strong>Email:</strong> ${user.email || 'No email available'}</p>
//     <p><strong>Token:</strong> ${user.accessToken || 'No token available'}</p>
//     <a href="/">Go Back to Home</a>
//   `);
// });


module.exports = router;







