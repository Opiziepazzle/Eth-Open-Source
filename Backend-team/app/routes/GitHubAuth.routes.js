const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const userSchema = require('../models/user.model');
const contributorSchema = require('../models/contributor.model');
const maintainerSchema = require('../models/contributor.model');
const checkAuth = require('../middleware/App.middleware')
const router = express.Router();
require('dotenv').config();

// GitHub Login Endpoint
router.get('/', passport.authenticate('github', { scope: ['user:email', 'repo', 'issues'] }));





router.get(
  '/callback',
  passport.authenticate('github', { session: false }),
  async (req, res) => {
    try {
      console.log('Authenticated User:', req.user);

      const { githubId, accessToken } = req.user;
      const avatar = req.user.avatar || 'https://example.com/default-avatar.png'; // Use the avatar or fallback

      const response = await axios.get('https://api.github.com/user/repos', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const repos = response.data;

      let user = await userSchema.findOne({ githubId });

      if (!user) {
        const email = req.user.email;
        user = new userSchema({
          githubId,
          email,
          displayName: req.user.displayName,
          avatar,
          repos,
        });

        await user.save();
      }

      
      const contributor = await contributorSchema.findOne({ _id: user._id });
      const maintainer = await maintainerSchema.findOne({ _id: user._id });

      console.log('Contributor:', contributor);
      console.log('Maintainer:', maintainer);

      const role = contributor ? 'contributor' : maintainer ? 'maintainer' : 'none';

      console.log('Role:', role);

      const token = jwt.sign({ userId: user._id, role }, process.env.JWT_KEY, { expiresIn: '4d' });

      const redirectURL = role !== 'none'
        ? `http://localhost:5173/dashboard?token=${token}`
        : `http://localhost:5173/onboarding?token=${token}`;

      return res.redirect(redirectURL);
    } catch (err) {
      console.error('Error during callback:', err);
      res.status(500).json({ error: 'Authentication failed' });
    }
  }
);




//Route to fetch GitHub user info (email, displayName, avatar)
router.get('/user-info', checkAuth, async (req, res) => {
  try {
    const user = await userSchema.findOne({ githubId: req.user.githubId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check the role
    const contributor = await contributorSchema.findOne({ contributorId: req.user._id });
    const maintainer = await maintainerSchema.findOne({ maintainerId: req.user._id });
    const role = contributor ? 'contributor' : maintainer ? 'maintainer' : 'none';

    const { email, displayName = 'No Name', avatar = '' } = user;
    return res.status(200).json({ email, displayName, avatar, role });
  } catch (err) {
    console.error('Error fetching user info:', err);
    return res.status(500).json({ error: err.message });
  }
});


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
      `https://api.github.com/repos/${owner}/${repo}/issues`,
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



//Github Logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({sucess: true, message: 'Logged out succesfully'})

})



// router.get(
//   '/callback',
//   passport.authenticate('github', { session: false }),
//   async (req, res) => {
//     try {
//       console.log('Authenticated User:', req.user);

//       const { githubId, accessToken } = req.user;
//       const response = await axios.get('https://api.github.com/user/repos', {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });

//       const repos = response.data;
//       let user = await userSchema.findOne({ githubId });

//       if (!user) {
//         const email = req.user.email; // Ensure email is fetched from req.user
//         user = new userSchema({
//           githubId,
//           email,
//           displayName: req.user.displayName,
//           avatar: req.user.avatar,
//           repos,
//         });

//         await user.save();
//       }

//       const contributor = await contributorSchema.findOne({ contributorId: user._id });
//       const maintainer = await maintainerSchema.findOne({ maintainerId: user._id });

//       const role = contributor ? 'contributor' : maintainer ? 'maintainer' : 'none';

//       const token = jwt.sign({ userId: user._id, role }, process.env.JWT_KEY, { expiresIn: '4d' });
//       const redirectURL =
//         role === 'maintainer'
//           ? `http://localhost:5173/dashboard?token=${token}`
//           : role === 'contributor'
//           ? `http://localhost:5173/dashboard?token=${token}`
//           : `http://localhost:5173/onboarding?token=${token}`;

//       return res.redirect(redirectURL);
//     } catch (err) {
//       console.error('Error during callback:', err);
//       res.status(500).json({ error: 'Authentication failed' });
//     }
//   }
// );










module.exports = router;