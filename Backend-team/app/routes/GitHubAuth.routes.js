const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const userSchema = require('../models/user.model');
const contributorSchema = require('../models/contributor.model');
const maintainerSchema = require('../models/maintainer.model');
const checkAuth = require('../middleware/App.middleware')
const router = express.Router();

// GitHub Login Endpoint
router.get('/', passport.authenticate('github', { scope: ['user:email', 'repo', 'issues'] }));




// router.get(
//   '/callback',
//   passport.authenticate('github', { session: false }),
//   async (req, res) => {
//     try {
//       const userId = req.user._id; // Authenticated user ID
//       const accessToken = req.user.accessToken; // GitHub access token

//       // Fetch user repositories from GitHub
//       const response = await axios.get('https://api.github.com/user/repos', {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });

//       const repos = response.data;

//       // Check if user exists in the database
//       let user = await userSchema.findById(userId);

//       if (!user) {
//         // New user: Create and redirect to onboarding
//         user = new userSchema({
//           githubId: req.user.githubId,
//           repos, // Save fetched repos
//         });

//         await user.save();

//         const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });

//         // Redirect to onboarding for role selection
//         const onboardingURL = `http://localhost:5173/onboarding?token=${encodeURIComponent(token)}`;
//         return res.redirect(onboardingURL);
//       }

//       // Existing user: Check role
//       const contributor = await contributorSchema.findOne({ contributorId: user._id });
//       const maintainer = await maintainerSchema.findOne({ maintainerId: user._id });

//       const role = contributor ? 'contributor' : maintainer ? 'maintainer' : 'none';

//       // Generate token with role for existing users
//       const token = jwt.sign({ userId: user._id, role }, process.env.JWT_KEY, { expiresIn: '1h' });

//       // Redirect to appropriate dashboard or onboarding
//       const redirectURL =
//         role === 'maintainer'
//           ? `http://localhost:5173/maintainer-dashboard?token=${encodeURIComponent(token)}`
//           : role === 'contributor'
//           ? `http://localhost:5173/contributor-dashboard?token=${encodeURIComponent(token)}`
//           : `http://localhost:5173/onboarding?token=${encodeURIComponent(token)}`;

//       return res.redirect(redirectURL);
//     } catch (err) {
//       console.error('Error during authentication:', err);
//       res.status(500).json({ error: 'Authentication failed' });
//     }
//   }
// );



router.get(
  '/callback',
  passport.authenticate('github', { session: false }),
  async (req, res) => {
    try {
      const userId = req.user._id; // Authenticated user ID from GitHub
      const accessToken = req.user.accessToken; // GitHub access token

      // Fetch user repositories from GitHub
      const response = await axios.get('https://api.github.com/user/repos', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const repos = response.data;

      // Check if user exists in the database
      let user = await userSchema.findOne({ githubId: req.user.githubId });

      if (!user) {
        // New user: Create and redirect to onboarding
        user = new userSchema({
          githubId: req.user.githubId,
          repos, // Save fetched repos
        });

        await user.save();

        // Sign the token with githubId
        const token = jwt.sign({ userId: user.githubId }, process.env.JWT_KEY, { expiresIn: '1h' });

        // Redirect to onboarding for role selection
        const onboardingURL = `http://localhost:5173/onboarding?token=${encodeURIComponent(token)}`;
        return res.redirect(onboardingURL);
      }

      // Existing user: Check role
      const contributor = await contributorSchema.findOne({ contributorId: user._id });
      const maintainer = await maintainerSchema.findOne({ maintainerId: user._id });

      const role = contributor ? 'contributor' : maintainer ? 'maintainer' : 'none';

      // Generate token with role for existing users
      const token = jwt.sign({ userId: user.githubId, role }, process.env.JWT_KEY, { expiresIn: '1h' });

      // Redirect to appropriate dashboard or onboarding
      const redirectURL =
        role === 'maintainer'
          ? `http://localhost:5173/maintainer-dashboard?token=${encodeURIComponent(token)}`
          : role === 'contributor'
          ? `http://localhost:5173/contributor-dashboard?token=${encodeURIComponent(token)}`
          : `http://localhost:5173/onboarding?token=${encodeURIComponent(token)}`;

      return res.redirect(redirectURL);
    } catch (err) {
      console.error('Error during authentication:', err);
      res.status(500).json({ error: 'Authentication failed' });
    }
  }
);


// Route to fetch GitHub user info (email, displayName, avatar)
router.get('/user-info', checkAuth, async (req, res) => {
  try {
    // Find the user by GitHub ID (assuming it's stored in `githubId`)
    const user = await userSchema.findOne({ githubId: req.user.githubId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send back the required user information
   // const { email, displayName, avatar } = user;
   const { email, displayName = 'No Name', avatar = '' } = user;

    // if (!displayName || !avatar) {
    //   return res.status(200).json({ message: 'User info incomplete. Please complete your profile.' });
    // }
    // if (!user.displayName) {
    //   user.displayName = profile.displayName || profile.username || 'No Name';  // Ensure displayName is set
    // }
    // if (!user.avatar) {
    //   user.avatar = profile._json.avatar_url || '';  // Ensure avatar is set
    // }
    
    return res.status(200).json({ email, displayName, avatar });
  } catch (err) {
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



//Github Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(`https://frontend-domain`)

})






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







