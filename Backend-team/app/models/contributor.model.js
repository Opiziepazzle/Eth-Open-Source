const mongoose = require('mongoose');

const contributorSchema = new mongoose.Schema({
    contributorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the user
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String, required: true, unique: true },
    location:   [{ type: String, required: true }],
    biography: { type: String, maxlength: 1000 },
    portfolioLink:  { type: String, match: /^https?:\/\/[\w.-]+\.[a-z]{2,}/i },
    identify: { type: String, enum: ['Tech Bro', 'Non Tech Bro'], required: true },
    preferredSkills:  [{ type: String, required: true }],
     goals:  [{ type: String, required: true }],
    
    proficiencyLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'] },


    otp: { type: String },
    otpExpiresAt: { type: Date },
    lastOtpSentAt: { type: Date }, // Track the time of the last OTP sent


    termsAccepted: { type: Boolean, required: true },
    termsAcceptedAt: { type: Date }

}, {
    timestamps: true,
});

module.exports = mongoose.model('Contributor', contributorSchema);
