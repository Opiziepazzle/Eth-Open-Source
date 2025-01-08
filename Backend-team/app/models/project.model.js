const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, maxlength: 100 },
  maintainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Maintainer', required: true },
  contributor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contributor' }], // Assigned contributors
  status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
  type: { type: String, enum: ['Volunteer', 'Funded'], required: true },
  rewards: { type: Number, min: 0 }, // Reward amount if applicable
  projectImage:  { type: String, required: false },
  experienceLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'] },
  skillsRequired:  [{ type: String }], 
  projectLeads: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference to contributors
      ref: 'Contributor', // Name of the Contributor model
    },
  ],

  skillsCategory:  [{ type: String, required: true }], 
  longDescription: { type: String, maxlength: 2000 },
  userLinks: [{ type: String, match: /^(https?:\/\/|www\.)[\w.-]+\.[a-z]{2,}(\/[^\s]*)?$/i, required: true }],
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', projectSchema);
