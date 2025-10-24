const { body, validationResult } = require('express-validator');

// Validation rules for user registration
const validateRegister = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

// Validation rules for user login
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Validation rules for skill creation
const validateSkill = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('category')
    .isIn(['Technology', 'Arts', 'Music', 'Languages', 'Sports', 'Cooking', 'Business', 'Other'])
    .withMessage('Invalid category'),
  body('level')
    .isIn(['Beginner', 'Intermediate', 'Advanced', 'Expert'])
    .withMessage('Invalid level'),
  body('availability')
    .isIn(['Weekdays', 'Weekends', 'Flexible'])
    .withMessage('Invalid availability'),
  body('mode')
    .isIn(['Online', 'Offline', 'Both'])
    .withMessage('Invalid mode')
];

// Validation rules for exchange creation
const validateExchange = [
  body('provider')
    .isMongoId()
    .withMessage('Invalid provider ID'),
  body('skill')
    .isMongoId()
    .withMessage('Invalid skill ID'),
  body('offerSkill')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Offer skill must be between 5 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Message must be between 10 and 500 characters')
];

// Validation rules for profile update
const validateProfile = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio must be less than 500 characters'),
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location must be less than 100 characters'),
  body('avatar')
    .optional()
    .isURL()
    .withMessage('Avatar must be a valid URL')
];

module.exports = {
  validateRegister,
  validateLogin,
  validateSkill,
  validateExchange,
  validateProfile
};
