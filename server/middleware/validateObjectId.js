const mongoose = require('mongoose');

/**
 * ObjectId Validation Middleware
 * Prevents invalid ObjectId crashes
 */
const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    try {
      const id = req.params[paramName];
      
      // Check if id is provided
      if (!id) {
        return res.status(400).json({
          message: `${paramName} parameter is required`
        });
      }

      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: 'Invalid ID format',
          providedId: id
        });
      }

      next();
    } catch (error) {
      console.error('ObjectId validation error:', error);
      res.status(500).json({
        message: 'Server error during ID validation',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  };
};

module.exports = validateObjectId;
