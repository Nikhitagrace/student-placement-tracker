const mongoose = require('mongoose');

// Student Schema
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  branch: {
    type: String,
    required: [true, 'Branch is required'],
    enum: [
      'Computer Science',
      'Information Technology',
      'Electronics and Communication',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Chemical Engineering'
    ],
    trim: true
  },
  cgpa: {
    type: Number,
    required: [true, 'CGPA is required'],
    min: [0.0, 'CGPA cannot be less than 0'],
    max: [10.0, 'CGPA cannot be more than 10']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
  },
  placed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for faster searching
StudentSchema.index({ name: 'text', email: 'text' });

module.exports = mongoose.model('Student', StudentSchema);
