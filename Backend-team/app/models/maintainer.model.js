const mongoose = require('mongoose');

const maintainerSchema = new mongoose.Schema({
    maintainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the user
    profilePics: { type: String }, 
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String, required: true, unique: true },
    location: { type: String, enum: ['Country1', 'Country2', 'Country3'], required: true },
    biography: { type: String, maxlength: 1000 },
    portfolioLink:  { type: String, match: /^https?:\/\/[\w.-]+\.[a-z]{2,}/i },
    identify: { type: String, enum: ['Tech Bro', 'Non Tech Bro'], required: true },
    preferredSkills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }], // Related to skills schema
    goals: [{
        type: String,
        enum: ['Become Full Stack Developer', 'Learn Mobile Development',
          'Contribute to Open Source', 'Improve Algorithm Skills',
          'Build Scalable Systems'],
        trim: true
      }],
    proficiencyLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'] },


    otp: { type: String },
    otpExpiresAt: { type: Date },
    lastOtpSentAt: { type: Date }, // Track the time of the last OTP sent


    termsAccepted: { type: Boolean, required: true },
    termsAcceptedAt: { type: Date }

}, {
    timestamps: true,
});

module.exports = mongoose.model('Maintainer', maintainerSchema);
