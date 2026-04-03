const User = require('../models/User');
const mongoose = require('mongoose');

/**
 * Authentication Middleware (Header-based, No JWT)
 * Reads x-user-id and x-user-role from headers
 * Validates user exists and role matches database
 */
const auth = async (req, res, next) => {
  try {
    // Get user credentials from headers
    const userId = req.header('x-user-id');
    const userRole = req.header('x-user-role');

    // Check if headers are present
    if (!userId || !userRole) {
      return res.status(401).json({
        message: 'Access denied. Missing authentication headers.',
        required: ['x-user-id', 'x-user-role']
      });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({
        message: 'Invalid user ID format'
      });
    }

    // Find user in database
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(401).json({
        message: 'User not found. Invalid authentication.'
      });
    }

    // Validate role matches database
    if (user.role !== userRole) {
      return res.status(403).json({
        message: 'Role mismatch. Access denied.',
        expectedRole: user.role,
        providedRole: userRole
      });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      message: 'Server error during authentication',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = auth;
