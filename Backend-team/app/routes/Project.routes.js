const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/App.middleware');
const projectSchema = require('../models/project.model');


// Create a project
router.post('/', checkAuth, (req, res) => {
  const { title, description, type, rewards, experienceLevel, skillsRequired } = req.body;

  projectSchema.create({
    title,
    description,
    maintainer: req.user.id, // Assuming req.user contains authenticated maintainer's ID
    type,
    rewards,
    experienceLevel,
    skillsRequired,
  })
    .then((project) => res.status(201).json(project))
    .catch((err) => res.status(500).json({ error: err.message }));
});



// Get all projects with optional filters and sorting
router.get('/', (req, res) => {
  const { status, type, experienceLevel, sortBy, rewardOrder } = req.query;
  let filters = {};
  let sortOptions = {};

  // Add filters based on query parameters
  if (status) filters.status = status;
  if (type) filters.type = type;
  if (experienceLevel) filters.experienceLevel = experienceLevel;

  // Add sorting for rewards if provided
  if (rewardOrder) {
    // If 'rewardOrder' is 'highest', sort in descending order
    // If 'rewardOrder' is 'lowest', sort in ascending order
    sortOptions.rewards = rewardOrder === 'highest' ? -1 : 1;
  }

  // Sort by createdAt (newest or oldest) if specified
  if (sortBy) {
    sortOptions.createdAt = sortBy === 'newest' ? -1 : 1;
  }

  // Find projects with the applied filters and sorting
  projectSchema.find(filters)
    .populate('maintainer')
    .sort(sortOptions)  // Apply sorting based on the 'rewards' or 'createdAt' fields
    .then((projects) => res.status(200).json(projects))
    .catch((err) => res.status(500).json({ error: err.message }));
});




// Assign a contributor to a project
router.post('/:projectId/assign', checkAuth, (req, res) => {
  const { projectId } = req.params;
  const { contributorId } = req.body;

  projectSchema.findByIdAndUpdate(
    projectId,
    { $addToSet: { contributors: contributorId } }, // Add contributor if not already assigned
    { new: true }
  )
    .populate('contributors')
    .then((project) => res.status(200).json(project))
    .catch((err) => res.status(500).json({ error: err.message }));
});




 // Filtering Contributors
 //This will return contributors who match the skills, proficiency level, and location.
// GET /projects/contributors?skills=609d1a1f2f1b2c3d4e5f6g7h&proficiencyLevel=Expert&location=Country1



module.exports = router;