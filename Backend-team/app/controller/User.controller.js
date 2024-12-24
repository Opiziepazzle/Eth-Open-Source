const userSchema = require("../models/user.model");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken"); 
require('dotenv').config();

const { validationResult } = require('express-validator');
const validator = require('validator');


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL, // your email
    pass: process.env.EMAIL_PASSWORD
    
  },
  tls: {
      rejectUnauthorized: false
    }
});


// Create a new user
exports.SignUp =  (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Sanitize inputs
  const sanitizedEmail = validator.normalizeEmail(email);

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  // Avoid users registering with the same email
  userSchema.findOne({ email: sanitizedEmail })
    .then(existingUser => {
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }

      // Hash the password
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            success: false,
            error: "Password hashing failed",
          });
        }

        // Generate verification token
        const verificationToken = jwt.sign(
          { email: sanitizedEmail },
          process.env.JWT_KEY,
          { expiresIn: '1h' }
        );

        // Create a new user
        const newUser = new userSchema({
          email: sanitizedEmail,
          password: hash,
          verificationToken,
          verificationTokenExpires: Date.now() + 3600000, // 1 hour
        });

        // Save user to the database
        newUser.save()
          .then(result => {
            // Send verification email
            const mailOptions = {
              from: process.env.EMAIL,
              to: sanitizedEmail,
              subject: 'Email Verification',
              text: `Click the link to verify your email: http://${req.headers.host}/verify/verify-email?token=${verificationToken}`
            };

            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                console.error(err);
                return res.status(500).json({
                  success: false,
                  error: "Email sending failed",
                });
              }

              res.status(201).json({
                success: true,
                message: "User created successfully. Please check your email to verify your account.",
              });
            });
          })
          .catch(err => {
            console.error(err);
            res.status(500).json({
              success: false,
              error: "User creation failed",
            });
          });
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        success: false,
        error: "Database error",
      });
    });
}



  




exports.Login =  (req, res, next) => {
  const { email, password } = req.body;

  // Find user by email
  userSchema
    .findOne({ email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Authentication Failed: User not found" });
      }

      // Compare provided password with hashed password
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          return res.status(401).json({ message: "Authentication Failed: Invalid credentials" });
        }

        // Generate JWT token on successful password match
        const token = jwt.sign(
          { email: user.email, userId: user._id },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );

        return res.status(200).json({
          message: "Authentication Successful",
          token,
        });
      });
    })
    .catch((err) => {
      console.error("Error during login:", err);
      res.status(500).json({ error: "An internal server error occurred" });
    });
}











