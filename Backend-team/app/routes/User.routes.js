const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user.model');
const UserController = require("../controller/User.controller")
const checkAuth = require("../middleware/App.middleware");

const {  signupValidationRules, loginValidationRules, validate } = require('../utils/Validator.util');



router.post("/signup", signupValidationRules(), validate, UserController.SignUp );




//login user
router.post("/login", 
    loginValidationRules(),
    validate, UserController.Login)







module.exports = router;
