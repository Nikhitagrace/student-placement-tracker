const mongoose = require('mongoose');

// Company Schema
const CompanySchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [200, 'Company name cannot exceed 200 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  package: {
    type: Number,
    required: [true, 'Package is required'],
    min: [0, 'Package cannot be negative']
  },
  job_role: {
    type: String,
    required: [true, 'Job role is required'],
    trim: true,
    maxlength: [100, 'Job role cannot exceed 100 characters']
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster searching
CompanySchema.index({ company_name: 'text', location: 'text', job_role: 'text' });

module.exports = mongoose.model('Company', CompanySchema);
