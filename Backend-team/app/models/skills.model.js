const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ['Tech', 'Non-Tech'], required: true }, // 'Tech' or 'Non-Tech'
});

module.exports = mongoose.model('Skill', skillSchema);
