const mongoose = require('mongoose');

// Placement Schema
const PlacementSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: [true, 'Student ID is required']
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Company ID is required']
  },
  placement_date: {
    type: Date,
    required: [true, 'Placement date is required'],
    default: Date.now
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['Pending', 'Selected', 'Rejected', 'On Hold'],
    default: 'Pending'
  },
  interview_round: {
    type: String,
    enum: ['Technical', 'HR', 'Managerial', 'Final'],
    default: 'Technical'
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

// Index for faster searching
PlacementSchema.index({ studentId: 1, companyId: 1 });
PlacementSchema.index({ status: 1 });
PlacementSchema.index({ placement_date: -1 });

// Ensure a student can't have multiple placements with the same company
PlacementSchema.index({ studentId: 1, companyId: 1 }, { unique: true });

module.exports = mongoose.model('Placement', PlacementSchema);
