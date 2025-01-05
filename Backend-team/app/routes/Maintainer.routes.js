const express = require('express');
const router = express.Router();
const maintainerSchema = require('../models/maintainer.model'); 
const bodyParser = require('body-parser');
const checkAuth = require("../middleware/App.middleware"); 
const {  maintainerValidationRules, validate } = require('../utils/Validator.util');





//Maintainer Onboarding

// router.post('/update-maintainer', checkAuth, maintainerValidationRules(), validate,  (req, res) => {
   
//     // Extract user ID and termsAccepted from the request
//     const maintainerId = req.user._id; // Assuming user info is attached to req.user after authentication
//     const { termsAccepted } = req.body;

//     // Check if the user is already registered as a maintainer
//     maintainerSchema
//       .findOne({ maintainerId })
//       .then((existingMaintainer) => {
//         if (existingMaintainer) {
//           return res.status(400).json({
//             success: false,
//             message: 'User is already registered as a maintainer',
//           });
//         }

//         // Create a new maintainer
//         const newMaintainer = new maintainerSchema({
//           maintainerId,
//           termsAccepted,
//           termsAcceptedAt: new Date(),
//         });

//         // Save the maintainer to the database
//         return newMaintainer.save();
//       })
//       .then((savedMaintainer) => {
//         res.status(201).json({
//           success: true,
//           message: 'Maintainer registered successfully',
//           data: savedMaintainer,
//         });
//       })
//       .catch((err) => {
//         res.status(500).json({
//           success: false,
//           message: 'Error registering maintainer',
//           error: err.message,
//         });
//       });
//   }
// );



router.patch('/update-maintainer', checkAuth, maintainerValidationRules(), validate, (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    location,
    biography,
    portfolioLink,
    typeOfContributor,
    termsAccepted,
  } = req.body;

  const maintainerId = req.user._id;

  // Check if maintainerId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(maintainerId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid maintainerId format',
    });
  }

  // Validate required fields
  if (!firstName || !lastName || !location || !termsAccepted) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: firstName, lastName, location, termsAccepted',
    });
  }

  // Prepare update data
  const updateData = {
    firstName,
    lastName,
    phoneNumber,
    location,
    biography,
    portfolioLink,
    typeOfContributor,
    termsAccepted,
    termsAcceptedAt: new Date(),
  
  };

  // Use upsert to create or update maintainer
  maintainerSchema.findOneAndUpdate(
    { _id: maintainerId },
    { $set: updateData },
    { new: true, upsert: true, runValidators: true }
  )
    .then((updatedMaintainer) => {
      res.status(200).json({
        success: true,
        message: updatedMaintainer.isNew
          ? 'Maintainer created successfully'
          : 'Maintainer updated successfully',
        data: updatedMaintainer,
      });
    })
    .catch((err) => {
      console.error('Error during upsert operation:', err);
      res.status(400).json({
        success: false,
        message: 'Error updating or creating maintainer',
        error: err.message,
      });
    });
});







module.exports = router;
