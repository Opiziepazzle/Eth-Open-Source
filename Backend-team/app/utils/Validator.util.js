const { check, validationResult } = require('express-validator');


const signupValidationRules = () => {
    return [
        check('email')
            .trim()
            .isEmail().withMessage('Enter a valid email address')
            .normalizeEmail(),

        check('password')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
            .withMessage('Password must be provided'),
    ];
};

// Validation rules for login
const loginValidationRules = () => {
    return [
        check('email')
            .trim()
            .isEmail().withMessage('Enter a valid email address')
            .normalizeEmail(),
        check('password')
            .notEmpty().withMessage('Password is required'),
    ];
};


const contributorValidationRules = () => {
    return [
        // Contributor ID validation (e.g., check if it exists and is a valid format)
        check('contributorId')
            .notEmpty().withMessage('Contributor ID is required')
            .isAlphanumeric().withMessage('Contributor ID must be alphanumeric'),

        // First Name validation
        check('firstName')
            .trim()
            .notEmpty().withMessage('First name is required'),

        // Last Name validation
        check('lastName')
            .trim()
            .notEmpty().withMessage('Last name is required'),

        // Phone number validation
        check('phoneNumber')
            .trim()
            .notEmpty().withMessage('Phone number is required')
            .isMobilePhone().withMessage('Enter a valid phone number')
            .isLength({ min: 10, max: 15 }).withMessage('Phone number should be between 10 to 15 digits'),

        // Location validation
        check('location')
            .trim()
            .notEmpty().withMessage('Location is required'),

        // Biography validation (Optional but recommended for length)
        check('biography')
            .trim()
            .optional()
            .isLength({ max: 500 }).withMessage('Biography should not exceed 500 characters'),

        // Portfolio Link validation (Optional, URL format check)
        check('portfolioLink')
            .trim()
            .optional()
            .isURL().withMessage('Enter a valid URL for portfolio'),

        // Identify (Tech Bro or Non-Tech Bro)
        check('identify')
            .trim()
            .notEmpty().withMessage('Identity is required')
            .isIn(['Tech Bro', 'Non-Tech Bro']).withMessage('Identity must be either "Tech Bro" or "Non-Tech Bro"'),

        // Preferred skills validation (Optional)
        check('preferredSkills')
            .optional()
            .isArray().withMessage('Preferred skills must be an array'),

        // Goals validation (Optional)
        check('goals')
            .optional()
            .isArray().withMessage('Goals must be an array'),

        // Proficiency level validation (Check if it's one of the valid levels)
        check('proficiencyLevel')
            .optional()
            .isIn(['Beginner', 'Intermediate', 'Advanced'])
            .withMessage('Proficiency level must be one of "Beginner", "Intermediate", or "Advanced"'),

            // Terms Accepted validation (Required and must be true)
        check('termsAccepted')
        .notEmpty().withMessage('Acceptance of terms and conditions is required')
        .isBoolean().withMessage('Terms accepted must be a boolean value')
        .equals('true').withMessage('You must accept the terms and conditions to proceed'),


    ];
};



const maintainerValidationRules = () => {
    return [
      // Maintainer ID validation
      check('maintainerId')
        .notEmpty().withMessage('Maintainer ID is required')
        .isAlphanumeric().withMessage('Maintainer ID must be alphanumeric'),
  
    
           // Terms Accepted validation (Required and must be true)
           check('termsAccepted')
           .notEmpty().withMessage('Acceptance of terms and conditions is required')
           .isBoolean().withMessage('Terms accepted must be a boolean value')
           .equals('true').withMessage('You must accept the terms and conditions to proceed'),
   
    ];
  };



  const projectValidationRules = () => {
    return [
      // Title validation
      check('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string')
        .isLength({ max: 100 }).withMessage('Title must not exceed 100 characters'),
  
      // Description validation
      check('description')
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be a string')
        .isLength({ max: 2000 }).withMessage('Description must not exceed 2000 characters'),
  
      // Type validation
      check('type')
        .notEmpty().withMessage('Project type is required')
        .isIn(['Volunteer', 'Funded']).withMessage('Type must be either "Volunteer" or "Funded"'),
  
      // Rewards validation
      check('rewards')
        .optional()
        .isString().withMessage('Rewards must be a string'),
  
      // Experience Level validation
      check('experienceLevel')
        .notEmpty().withMessage('Experience level is required')
        .isIn(['Beginner', 'Intermediate', 'Expert']).withMessage('Experience level must be one of: Beginner, Intermediate, Expert'),
  
      
  
      
    ];
  };
  


// General validation middleware to check for validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    signupValidationRules,
    loginValidationRules,
    contributorValidationRules,
    maintainerValidationRules,
    projectValidationRules,
    validate,
};
