const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const axios = require('axios');
const contributorSchema = require('../models/contributor.model'); 
const maintainerSchema = require('../models/maintainer.model'); 




// Initiate GitHub OAuth login
router.get('/', passport.authenticate('github',{ session: false }, { scope:['user:email','repo'] }));


router.get('/callback',
  passport.authenticate('github', { failureRedirect: '/choose-role' }), // If authentication fails, redirect to /choose-role
  async (req, res) => {
    try {
      const userId = req.user._id; // Get the authenticated user ID
      const accessToken = req.user.accessToken; // Get the GitHub access token

      // Generate JWT token
      const token = jwt.sign({ id: userId }, process.env.JWT_KEY, { expiresIn: '1h' });

      // Fetch user's GitHub repositories
      const response = await axios.get('https://api.github.com/user/repos', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const repos = response.data; // GitHub repositories

      const isLogin = req.query.isLogin === 'true'; // Check if the request is for login

      // Check if the user exists in the database
      let user = await userSchema.findById(userId);

      if (!user) {
        // New user: If it's a login request, we should redirect to the role selection page
        return res.redirect(
          `http://localhost:3000/choose-role?token=${token}&repos=${encodeURIComponent(
            JSON.stringify(repos)
          )}`
        );
      }

      // Existing user handling
      const contributor = await contributorSchema.findOne({ contributorId: userId });
      const maintainer = await maintainerSchema.findOne({ maintainerId: userId });

      if (isLogin) {
        // If it's a login flow, send them to the dashboard if they have a role
        if (contributor) {
          return res.redirect(
            `http://localhost:3000/dashboard/contributor?token=${token}&repos=${encodeURIComponent(
              JSON.stringify(repos)
            )}`
          );
        }

        if (maintainer) {
          return res.redirect(
            `http://localhost:3000/dashboard/maintainer?token=${token}&repos=${encodeURIComponent(
              JSON.stringify(repos)
            )}`
          );
        }

        // If the user has no role, redirect to choose role page
        return res.redirect(
          `http://localhost:3000/choose-role?token=${token}&repos=${encodeURIComponent(
            JSON.stringify(repos)
          )}`
        );
      }

      // Connect to GitHub (first-time or re-authentication)
      // For new users, they will be redirected to choose role page, then verify page
      if (!user.isVerified) {
        return res.redirect(
          `http://localhost:3000/verify?token=${token}&repos=${encodeURIComponent(
            JSON.stringify(repos)
          )}`
        );
      }

      // If the user has already verified, redirect to the dashboard
      if (contributor) {
        return res.redirect(
          `http://localhost:3000/dashboard/contributor?token=${token}&repos=${encodeURIComponent(
            JSON.stringify(repos)
          )}`
        );
      }

      if (maintainer) {
        return res.redirect(
          `http://localhost:3000/dashboard/maintainer?token=${token}&repos=${encodeURIComponent(
            JSON.stringify(repos)
          )}`
        );
      }

      // If no role exists, redirect to choose role page
      res.redirect(
        `http://localhost:3000/choose-role?token=${token}&repos=${encodeURIComponent(
          JSON.stringify(repos)
        )}`
      );
    } catch (err) {
      console.error(err);
      res.redirect('/choose-role'); // Redirect to choose role page if there is an error
    }
  }
);


// GitHub OAuth callback
// router.get('/callback',
//   passport.authenticate('github', { failureRedirect: 'http://localhost:3000/choose-role' }), // Redirect to choose-role on failure
//   async (req, res) => {
//     try {
//       const userId = req.user._id;
//       const accessToken = req.user.accessToken;

//       // Generate JWT token
//       const token = jwt.sign({ id: userId }, process.env.JWT_KEY, { expiresIn: '1h' });

//       // Fetch user's GitHub repositories
//       const response = await axios.get('https://api.github.com/user/repos', {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });

//       const repos = response.data;

//       // Fetch user from the database
//       let user = await userSchema.findById(userId);

//       if (!user) {
//         // New user, redirect to verification page
//         return res.redirect(
//           `http://localhost:3000/verify?token=${token}&repos=${encodeURIComponent(
//             JSON.stringify(repos)
//           )}`
//         );
//       }

//       // Check if user is a Contributor
//       const contributor = await contributorSchema.findOne({ contributorId: userId });
//       if (contributor) {
//         return res.redirect(
//           `http://localhost:3000/dashboard/contributor?token=${token}&repos=${encodeURIComponent(
//             JSON.stringify(repos)
//           )}`
//         );
//       }

//       // Check if user is a Maintainer
//       const maintainer = await maintainerSchema.findOne({ maintainerId: userId });
//       if (maintainer) {
//         return res.redirect(
//           `http://localhost:3000/dashboard/maintainer?token=${token}&repos=${encodeURIComponent(
//             JSON.stringify(repos)
//           )}`
//         );
//       }

//       // If neither, ask the user to complete their profile (Choose role)
//       res.redirect(
//         `http://localhost:3000/choose-role?token=${token}`
//       );
//     } catch (err) {
//       console.error(err);
//       res.redirect('http://localhost:3000/choose-role'); // In case of an unexpected error, redirect to choose-role
//     }
//   }
// );



// Home route with the login button
router.get('/home', (req, res) => {
  res.send(`
    <h1>GitHub OAuth Test</h1>
    <a href="/auth/github">
      <button style="padding: 10px 20px; font-size: 16px; cursor: pointer;">Login with GitHub</button>
    </a>
  `);
});



// GitHub callback route
router.get(
  '/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // On success, redirect to /profile
    res.redirect('/auth/github/profile');
  }
);

// Profile route (displays email, username, and token)
router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const user = req.user;
  console.log('Authenticated user:', user); // Log user info
  res.send(`
    <h1>GitHub Authentication Successful!</h1>
    <p><strong>Username:</strong> ${user.displayName || 'No username available'}</p>
    <p><strong>Email:</strong> ${user.email || 'No email available'}</p>
    <p><strong>Token:</strong> ${user.accessToken || 'No token available'}</p>
    <a href="/">Go Back to Home</a>
  `);
});


module.exports = router;







