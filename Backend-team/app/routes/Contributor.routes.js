const express = require('express');
const router = express.Router();
const contributorSchema = require('../models/contributor.model'); 
const skillSchema = require('../models/skills.model');
const multer = require('multer');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const rateLimit = require('express-rate-limit'); //For high-security applications, combine this with IP-based rate limiting 
const checkAuth = require("../middleware/App.middleware"); 
const { contributorValidationRules, validate } = require('../utils/Validator.util');

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false); // Reject non-image files
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
});



// // Signup Route
// router.post('/signup',
//   (req, res, next) => {
//     // Check if the role is contributor or maintainer and apply validation rules accordingly
//     if (req.body.role === 'contributor') {
//       return [contributorValidationRules(), validate, upload.single('profilePics')];
//     } else if (req.body.role === 'maintainer') {
//       return [maintainerValidationRules(), validate, upload.single('profilePics')];
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid role. Please choose either 'contributor' or 'maintainer'."
//       });
//     }
//   },
//   async (req, res) => {
//     const { firstName, lastName, phoneNumber, location, biography, portfolioLink, identify, preferredSkills, goals, proficiencyLevel, termsAccepted, role } = req.body;

//     // Set the correct ID based on the role
//     let userId;
//     if (role === 'contributor') {
//       userId = req.user._id; // Use userId for contributor
//     } else if (role === 'maintainer') {
//       userId = req.user._id; // Use userId for maintainer (or a different logic if needed)
//     }

//     const profilePics = req.file ? req.file.path : undefined;

//     // Validate required fields
//     if (!userId || !firstName || !lastName || !location || !identify || !termsAccepted || !role) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields"
//       });
//     }

//     const skillCategory = identify === 'Tech Bro' ? 'Tech' : 'Non-Tech';

//     // Fetch skills based on identity selection (Tech Bro or Non Tech Bro)
//     try {
//       const skills = await skillSchema.find({ category: skillCategory });

//       // Map skill IDs to preferredSkills (if provided)
//       const skillIds = skills.map(skill => skill._id);
//       const newPreferredSkills = preferredSkills ? [...preferredSkills, ...skillIds] : skillIds;

//       let user;

//       if (role === 'contributor') {
//         user = new contributorSchema({
//           contributorId: userId, // Use contributorId for contributor role
//           profilePics,
//           firstName,
//           lastName,
//           phoneNumber,
//           location,
//           biography,
//           portfolioLink,
//           identify,
//           termsAccepted,
//           termsAcceptedAt: new Date(),
//           preferredSkills: newPreferredSkills,
//           goals,
//           proficiencyLevel
//         });
//       } else if (role === 'maintainer') {
//         user = new maintainerSchema({
//           maintainerId: userId, // Use maintainerId for maintainer role
//           profilePics,
//           firstName,
//           lastName,
//           phoneNumber,
//           location,
//           biography,
//           portfolioLink,
//           identify,
//           termsAccepted,
//           termsAcceptedAt: new Date(),
//           preferredSkills: newPreferredSkills,
//           goals,
//           proficiencyLevel
//         });
//       }

//       // Save the user data to the appropriate schema
//       await user.save();

//       res.status(201).json({
//         success: true,
//         message: `${role.charAt(0).toUpperCase() + role.slice(1)} created successfully`,
//         data: user
//       });

//     } catch (err) {
//       res.status(400).json({
//         success: false,
//         message: "Error processing the signup",
//         error: err.message
//       });
//     }
//   }
// );




//Sign up

router.post('/signup', contributorValidationRules(), validate, upload.single('profilePics'), (req, res) => {
    const {
      firstName, lastName, phoneNumber, location,
      biography, portfolioLink, identify, preferredSkills, goals, proficiencyLevel, termsAccepted
    } = req.body;
  
    // Set contributorId from the authenticated user
    const contributorId = req.user._id; // Assuming user info is attached to the request after authentication
  
    const profilePics = req.file ? req.file.path : undefined;
  
    // Validate required fields
    if (!contributorId || !firstName || !lastName || !location || !identify ||  !termsAccepted) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: contributorId, firstName, lastName, location, identify, termsAccepted"
      });
    }
  
    // Fetch skills based on identity selection (Tech Bro or Non Tech Bro)
    const skillCategory = identify === 'Tech Bro' ? 'Tech' : 'Non-Tech';
  
    skillSchema.find({ category: skillCategory })
      .then(skills => {
        // Map skill IDs to preferredSkills (if provided)
        const skillIds = skills.map(skill => skill._id);
        const newPreferredSkills = preferredSkills ? [...preferredSkills, ...skillIds] : skillIds;
  
        // Construct contributor object
        const contributor = new contributorSchema({
          contributorId,
          profilePics,
          firstName,
          lastName,
          phoneNumber,
          location,
          biography,
          portfolioLink,
          identify,
          termsAccepted,
          termsAcceptedAt: new Date(),
          preferredSkills: newPreferredSkills, // Assigning the skills here
          goals,
          proficiencyLevel
        });
  
        // Save contributor to the database
        contributor.save()
          .then(newContributor => {
            res.status(201).json({
              success: true,
              message: "Contributor created successfully",
              data: newContributor
            });
          })
          .catch(err => {
            res.status(400).json({
              success: false,
              message: "Error creating contributor",
              error: err.message
            });
          });
      })
      .catch(err => {
        res.status(400).json({
          success: false,
          message: "Error fetching skills",
          error: err.message
        });
      });
  });



  


  


  
//   // Twilio credentials
//   const accountSid = process.env.TWILIO_SID; 
//   const authToken = process.env.TWILIO_TOKEN;
//   const client = twilio(accountSid, authToken);
  
//   // Generate a 6-digit OTP
//   function generateOtp() {
//       return Math.floor(100000 + Math.random() * 900000).toString();
//   }
  
//   // Endpoint to send OTP
//   router.post('/send-otp', async (req, res) => {
//       const { phoneNumber } = req.body;
  
//       if (!phoneNumber) {
//           return res.status(400).json({ error: 'Phone number is required' });
//       }
  
//       const otp = generateOtp();
//       const expiresAt = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes
  
//       try {
//           // Save OTP and expiration in the database
//           await contributorSchema.findOneAndUpdate(
//               { phoneNumber },
//               { otp, otpExpiresAt: expiresAt },
//               { upsert: true, new: true }
//           );
  
//           // Send OTP via Twilio
//           await client.messages.create({
//               body: `Your OTP code is ${otp}`,
//               from: process.env.PHONE, 
//               to: phoneNumber,
//           });
  
//           res.status(200).json({ message: 'OTP sent successfully' });
//       } catch (error) {
//           console.error('Error sending OTP:', error);
//           res.status(500).json({ error: 'Failed to send OTP' });
//       }
//   });
  
//   // Endpoint to verify OTP
//   router.post('/verify-otp', async (req, res) => {
//       const { phoneNumber, otp } = req.body;
  
//       if (!phoneNumber || !otp) {
//           return res.status(400).json({ error: 'Phone number and OTP are required' });
//       }
  
//       try {
//           const contributor = await contributorSchema.findOne({ phoneNumber });
  
//           if (!contributor || !contributor.otpExpiresAt || Date.now() > contributor.otpExpiresAt) {
//               return res.status(400).json({ error: 'OTP not found or expired' });
//           }
  
//           if (contributor.otp !== otp) {
//               return res.status(400).json({ error: 'Invalid OTP' });
//           }
  
//           // OTP is valid; clear OTP fields from the database
//           contributor.otp = null;
//           contributor.otpExpiresAt = null;
//           await contributor.save();
  
//           res.status(200).json({ message: 'OTP verified successfully' });
//       } catch (error) {
//           console.error('Error verifying OTP:', error);
//           res.status(500).json({ error: 'Failed to verify OTP' });
//       }
//   });
  




  

//   const otpResendLimiter = rateLimit({
//       windowMs: 15 * 60 * 1000, // 15 minutes
//       max: 5, // Limit to 5 requests per window
//       message: 'Too many OTP resend attempts from this phone number, please try again later.',
//   });
  
  
  





//   // Endpoint to resend OTP with spam prevention
// app.post('/resend-otp', otpResendLimiter, async (req, res) => {
//   const { phoneNumber } = req.body;

//   if (!phoneNumber) {
//       return res.status(400).json({ error: 'Phone number is required' });
//   }

//   try {
//       const contributor = await contributorSchema.findOne({ phoneNumber });

//       if (!contributor) {
//           return res.status(404).json({ error: 'Phone number not registered' });
//       }

//       // Check if the resend request is within the cooldown period (e.g., 1 minute)
//       const cooldownPeriod = 60 * 1000; // 1 minute
//       const now = Date.now();

//       if (contributor.lastOtpSentAt && now - contributor.lastOtpSentAt < cooldownPeriod) {
//           return res.status(429).json({ 
//               error: 'Please wait before requesting a new OTP' 
//           });
//       }

//       // Generate a new OTP
//       const otp = generateOtp();
//       const expiresAt = now + 5 * 60 * 1000; // OTP expires in 5 minutes

//       // Update OTP and last sent timestamp in the database
//       contributor.otp = otp;
//       contributor.otpExpiresAt = expiresAt;
//       contributor.lastOtpSentAt = now; // Track the last OTP sent time
//       await contributor.save();

//       // Send the OTP via Twilio
//       await client.messages.create({
//           body: `Your new OTP code is ${otp}`,
//           from: '+1234567890', // Replace with your Twilio phone number
//           to: phoneNumber,
//       });

//       res.status(200).json({ message: 'OTP resent successfully' });
//   } catch (error) {
//       console.error('Error resending OTP:', error);
//       res.status(500).json({ error: 'Failed to resend OTP' });
//   }
// });




  
module.exports = router;
