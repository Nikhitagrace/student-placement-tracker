const { body, param, validationResult } = require('express-validator');

/**
 * Handle validation errors middleware
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

/**
 * User registration validation
 */
const validateUserRegistration = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  handleValidationErrors
];

/**
 * User login validation
 */
const validateUserLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

/**
 * Student validation
 */
const validateStudent = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('branch')
    .isIn([
      'Computer Science',
      'Information Technology',
      'Electronics and Communication',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering'
    ])
    .withMessage('Please select a valid branch'),
  
  body('cgpa')
    .isFloat({ min: 0.0, max: 10.0 })
    .withMessage('CGPA must be between 0.0 and 10.0'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .matches(/^\d{10}$/)
    .withMessage('Phone number must be exactly 10 digits'),
  
  handleValidationErrors
];

/**
 * Company validation
 */
const validateCompany = [
  body('company_name')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Company name must be between 2 and 200 characters'),
  
  body('location')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Location must be between 2 and 200 characters'),
  
  body('package')
    .isFloat({ min: 0 })
    .withMessage('Package must be a positive number'),
  
  body('job_role')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Job role must be between 2 and 100 characters'),
  
  handleValidationErrors
];

/**
 * Placement validation
 */
const validatePlacement = [
  body('studentId')
    .isMongoId()
    .withMessage('Invalid student ID format'),
  
  body('companyId')
    .isMongoId()
    .withMessage('Invalid company ID format'),
  
  body('status')
    .isIn(['Pending', 'Selected', 'Rejected', 'On Hold'])
    .withMessage('Status must be one of: Pending, Selected, Rejected, On Hold'),
  
  body('interview_round')
    .isIn(['Technical', 'HR', 'Managerial', 'Final'])
    .withMessage('Interview round must be one of: Technical, HR, Managerial, Final'),
  
  body('notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters'),
  
  handleValidationErrors
];

/**
 * MongoDB ObjectId validation for params
 */
const validateObjectId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format'),
  
  handleValidationErrors
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateStudent,
  validateCompany,
  validatePlacement,
  validateObjectId,
  handleValidationErrors
};
