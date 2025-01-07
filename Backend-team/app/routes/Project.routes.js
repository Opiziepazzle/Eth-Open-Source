const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/App.middleware');
const projectSchema = require('../models/project.model');





const storage = multer.diskStorage({
  
  destination: function(req, file, cb ){
    cb(null, './uploads');
  },
  filename: function(req, file, cb){
    
    cb(null, Date.now() + file.originalname)
  }
})

const fileFilter = (req, file, cb)=>{
  //reject a file
  if(file.mimetype === 'image/jpeg'  || file.mimetype === 'image/png'){
    cb(null, true);
  }else
  cb(null, false)
  
};

const upload = multer({storage: storage, 
  limits:{
fileSize: 1024 * 1024 * 5
},
fileFilter: fileFilter })







router.post('/create-project', checkAuth, upload.single('projectImage'), (req, res) => {
  const { title, description, type, rewards, 
    experienceLevel, skillsRequired, projectLeads,
    skillsCategory, longDescription, userLinks } = req.body;

  // Check if file upload is successful
  const projectImage = req.file ? req.file.path : undefined;
  
  // Get maintainer's ID from the user object attached by checkSess middleware
  const maintainerId = req.user ? req.user.id : null;  // Ensure req.user exists

  // Validate required fields
  if (!title || !description || !type) {
    return res.status(400).json({ error: 'Title, description, and type are required fields.' });
  }

  if (!maintainerId) {
    return res.status(400).json({ error: 'User not authenticated or maintainer ID is missing' });
  }

  // Create new project
  projectSchema.create({
    title,
    description,
    maintainer: maintainerId,
    type,
    rewards,
    experienceLevel,
    skillsRequired,
    projectImage,
    projectLeads,
    skillsCategory,
    userLinks,
    longDescription,
  })
    .then((project) => res.status(201).json(project))
    .catch((err) => res.status(500).json({ error: err.message }));
});




// Get all projects with optional filters and sorting
router.get('/project-matching', (req, res) => {
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
    { $addToSet: { contributor: contributorId } }, // Add contributor if not already assigned
    { new: true }
  )
    .populate('contributor')
    .then((project) => res.status(200).json(project))
    .catch((err) => res.status(500).json({ error: err.message }));
});




 // Filtering Contributors
 //This will return contributors who match the skills, proficiency level, and location.
// GET /projects/contributors?skills=609d1a1f2f1b2c3d4e5f6g7h&proficiencyLevel=Expert&location=Country1



module.exports = router;