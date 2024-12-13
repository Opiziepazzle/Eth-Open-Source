const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');



const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },


  password: {
    type: String,
    //required: true
  },

  username: {
    type: String,
    //unique: true,
    //required: true
  },

  avatar: {
    type: String,
    
  },

  identity: {
    type: String,
    enum: ['Tech Bro', 'Non-Tech Bro'], // New field for tech identity
    required: true
  },



  isVerified: {
    type: Boolean,
    default: false
  },

  verificationToken: String,
  verificationTokenExpires: Date,


  resetOTP: {
    type: String
  },

  resetOTPExpires: {
    type: Date
  },

  discordId: { type: String, required: true, unique: true, },
  discriminator: { type: String, required: true },



  googleId: { type: String, required: false },
  displayName: { type: String, required: false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  image: { type: String, required: false},


  githubId: { type: String, sparse: true, unique: true }, // GitHub-specific field
  provider: { type: String, default: 'local' }, // Can store 'github' for GitHub accounts


},



  {
    timestamps: true





  }


);






module.exports = mongoose.model('User', userSchema);
