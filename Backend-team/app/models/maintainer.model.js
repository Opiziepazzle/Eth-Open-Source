const mongoose = require('mongoose');

const maintainerSchema = new mongoose.Schema({
    maintainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the user

    termsAccepted: { type: Boolean, required: true },
    termsAcceptedAt: { type: Date }

}, {
    timestamps: true,
});

module.exports = mongoose.model('Maintainer', maintainerSchema);
