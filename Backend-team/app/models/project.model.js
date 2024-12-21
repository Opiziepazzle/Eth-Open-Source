const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, maxlength: 2000 },
  maintainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Maintainer', required: true },
  contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contributor' }], // Assigned contributors
  status: { type: String, enum: ['Open', 'In Progress', 'Closed'], default: 'Open' },
  type: { type: String, enum: ['Volunteer', 'Funded'], required: true },
  rewards: { type: Number, min: 0 }, // Reward amount if applicable
  experienceLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'] },
  skillsRequired: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }], // Required skills for the project
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', projectSchema);
