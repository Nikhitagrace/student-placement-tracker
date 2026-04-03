/**
 * Student Role Middleware
 * Must be used after auth middleware
 * Checks if authenticated user has student role
 */
const studentAuth = (req, res, next) => {
  try {
    // Check if user exists (should be attached by auth middleware)
    if (!req.user) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }

    // Check if user has student role
    if (req.user.role !== 'user') {
      return res.status(403).json({
        message: 'Student access required',
        currentRole: req.user.role,
        requiredRole: 'user'
      });
    }

    next();
  } catch (error) {
    console.error('Student auth middleware error:', error);
    res.status(500).json({
      message: 'Server error during student verification',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = studentAuth;
