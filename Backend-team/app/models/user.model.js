const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: function () {
        return !this.githubId; // Email is required only if there's no GitHub ID
      },
    },

    password: {
      type: String,
      // required: true (Commented out for GitHub OAuth users)
    },

    username:{ type: String, 
      unique: false
     },

    avatar: {
      type: String,
    },

    identity: {
      type: String,
      enum: ['Tech Bro', 'Non-Tech Bro'], // Field for tech identity
    },

    isVerified: {
      type: Boolean,
      default: false,
    },


    verificationToken: String,
    verificationTokenExpires: Date,

    resetOTP: String,
    resetOTPExpires: Date,

    discordId: {
      type: String,
      unique: true,
      sparse: true,
    },

    discriminator: {
      type: String,
    },

    googleId: {
      type: String,
      sparse: true,
    },

    displayName: String,
    firstName: String,
    lastName: String,
    image: String,

    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },

    accessToken: String, // To store the GitHub access token
    provider: {
      type: String,
      default: 'local', // 'github' for GitHub accounts
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
