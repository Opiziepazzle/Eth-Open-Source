const express = require('express');
const router = express.Router();
const maintainerSchema = require('../models/maintainer.model'); 
const bodyParser = require('body-parser');
const checkAuth = require("../middleware/App.middleware"); 
const {  maintainerValidationRules, validate } = require('../utils/Validator.util');





//Maintainer Onboarding
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

// GET /api/maintainers - Fetch all maintainers
router.get('/all-maintainers', async (req, res) => {
  try {
    // Query to fetch all contributors
    const maintainers = await maintainerSchema.find({}, 'firstName lastName email');
    
    if (!maintainers.length) {
      return res.status(404).json({ message: 'No maintainers found' });
    }

    // Respond with maintainers
    res.status(200).json({ maintainers });
  } catch (error) {
    console.error('Error fetching maintainers:', error);
    res.status(500).json({ error: 'An error occurred while fetching maintainers' });
  }
});





module.exports = router;
