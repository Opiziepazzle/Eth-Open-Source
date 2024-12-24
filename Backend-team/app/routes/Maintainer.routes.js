const express = require('express');
const router = express.Router();
const maintainerSchema = require('../models/maintainer.model'); 
const bodyParser = require('body-parser');
const checkAuth = require("../middleware/App.middleware"); 
const {  maintainerValidationRules, validate } = require('../utils/Validator.util');





//Maintainer Onboarding

router.post('/update-maintainer', checkAuth, maintainerValidationRules(), validate,  (req, res) => {
   
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



module.exports = router;
