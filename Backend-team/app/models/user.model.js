const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {

    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },

    email: {
      type: String,
      unique: true,
      
    },

    password: {
      type: String,
      // required: true (Commented out for GitHub OAuth users)
    },

    repos: {
    type: Array, //This will store repo fetched from github 
    default: []
    },

    username:{ type: String, 
     // required: false
     unique: true,
     sparse: true 
     },

     avatar: { type: String },
     
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

    googleId: { type: String, unique: true },

    displayName: { type: String},
    firstName: String,
    lastName: String,
    image: String,

    
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
