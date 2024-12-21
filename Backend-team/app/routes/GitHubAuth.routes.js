const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const axios = require('axios');
const contributorSchema = require('../models/contributor.model'); 
const maintainerSchema = require('../models/maintainer.model'); 



// Initiate GitHub OAuth login
router.get('/auth/github', passport.authenticate('github', { scope:['user:email','repo'] }));


// GitHub OAuth callback
// router.get( '/auth/github/callback',
//   passport.authenticate('github', { failureRedirect: '/login' }),
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

//       // If neither, ask the user to complete their profile
//       res.redirect(
//         `http://localhost:3000/choose-role?token=${token}&repos=${encodeURIComponent(
//           JSON.stringify(repos)
//         )}`
//       );
//     } catch (err) {
//       console.error(err);
//       res.redirect('/login');
//     }
//   }
// );

// GitHub Callback Route
router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    console.log('User after GitHub Authentication:', req.user);

    if (!req.user || !req.user.email) {
      console.error('GitHub user does not have an email. Redirecting to login.');
      return res.redirect('/login?error=no-email');
    }

    res.redirect('/profile');
  }
);

// Home Route
router.get('/hub', (req, res) => {
  res.send(`
    <h1>Server is running!</h1>
    <a href="/auth/github">
      <button>Login with GitHub</button>
    </a>
  `);
});

// Profile Route to Display User's GitHub Username
router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }

  res.send(`
    <h1>Hello, ${req.user.username}!</h1>
    <p>Email: ${req.user.email || 'No email provided'}</p>
    <a href="/logout">Logout</a>
  `);
});

// Logout Route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});




// app.get('/auth/github/callback',
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   (req, res) => {
//     // After successful GitHub login, check for user profile
//     const userId = req.user._id;

//     // Generate JWT
//     const token = jwt.sign({ id: userId }, process.env.JWT_KEY, { expiresIn: '1h' });

  
//     // Check if user is a Contributor
//     contributorSchema.findOne({ contributorId: userId })
//       .then(contributor => {
//         if (contributor) {
//           return res.redirect(`http://localhost:3000/dashboard/contributor?token=${token}`);
//         }

//         // If not a Contributor, check if user is a Maintainer
//         return maintainerSchema.findOne({ maintainerId: userId });
//       })
//       .then(maintainer => {
//         if (maintainer) {
//           return res.redirect(`http://localhost:3000/dashboard/maintainer?token=${token}`);
//         }

//         // If neither, ask user to complete profile
//         res.redirect(`http://localhost:3000/choose-role?token=${token}`);
//       })
//       .catch(err => {
//         console.error(err);
//         res.redirect('http://localhost:3000/login');
//       });
//   });


module.exports = router;







