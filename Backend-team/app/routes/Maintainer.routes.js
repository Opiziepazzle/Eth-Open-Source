const express = require('express');
const router = express.Router();
const maintainerSchema = require('../models/maintainer.model'); 
const bodyParser = require('body-parser');
const checkAuth = require("../middleware/App.middleware"); 
const {  maintainerValidationRules, validate } = require('../utils/Validator.util');





//Sign up

router.post('/signup',  maintainerValidationRules(), validate,  (req, res) => {
   
    // Extract user ID and termsAccepted from the request
    const maintainerId = req.user._id; // Assuming user info is attached to req.user after authentication
    const { termsAccepted } = req.body;

    // Check if the user is already registered as a maintainer
    maintainerSchema
      .findOne({ maintainerId })
      .then((existingMaintainer) => {
        if (existingMaintainer) {
          return res.status(400).json({
            success: false,
            message: 'User is already registered as a maintainer',
          });
        }

        // Create a new maintainer
        const newMaintainer = new maintainerSchema({
          maintainerId,
          termsAccepted,
          termsAcceptedAt: new Date(),
        });

        // Save the maintainer to the database
        return newMaintainer.save();
      })
      .then((savedMaintainer) => {
        res.status(201).json({
          success: true,
          message: 'Maintainer registered successfully',
          data: savedMaintainer,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: 'Error registering maintainer',
          error: err.message,
        });
      });
  }
);


// GET route to fetch all maintainers with pagination
router.get('/list', (req, res) => {
  // Extract pagination parameters from query (defaults: page=1, limit=10)
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Calculate the skip value
  const skip = (page - 1) * limit;

  // Fetch maintainers with pagination
  maintainerSchema
    .find()
    .populate('maintainerId', 'email') 
    .skip(skip)
    .limit(limit)
    .then((maintainers) => {
      // Get the total count of maintainers for pagination metadata
      maintainerSchema.countDocuments().then((total) => {
        res.status(200).json({
          success: true,
          data: maintainers,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalMaintainers: total,
          },
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Error fetching maintainers',
        error: err.message,
      });
    });
});


  
module.exports = router;
