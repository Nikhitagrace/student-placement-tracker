/**
 * Admin Role Middleware
 * Must be used after auth middleware
 * Checks if authenticated user has admin role
 */
const adminAuth = (req, res, next) => {
  try {
    // Check if user exists (should be attached by auth middleware)
    if (!req.user) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }

    // Check if user has admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Admin access required',
        currentRole: req.user.role,
        requiredRole: 'admin'
      });
    }

    next();
  } catch (error) {
    console.error('Admin auth middleware error:', error);
    res.status(500).json({
      message: 'Server error during admin verification',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = adminAuth;
