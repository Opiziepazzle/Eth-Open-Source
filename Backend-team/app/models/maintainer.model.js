const mongoose = require('mongoose');

const maintainerSchema = new mongoose.Schema({
    maintainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the user
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String, required: true, unique: true },
    location:   [{ type: String, required: true }],
    biography: { type: String, maxlength: 1000 },
    portfolioLink:  { type: String, match: /^https?:\/\/[\w.-]+\.[a-z]{2,}/i },
    typeOfContributor:  { type: String, maxlength: 1000 },
    termsAccepted: { type: Boolean, required: true },
    termsAcceptedAt: { type: Date }

}, {
    timestamps: true,
});

module.exports = mongoose.model('Maintainer', maintainerSchema);
