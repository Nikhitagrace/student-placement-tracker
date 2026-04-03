const express = require('express');
const router = express.Router();
const Placement = require('../models/Placement');
const Student = require('../models/Student');
const Company = require('../models/Company');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const studentAuth = require('../middleware/studentAuth');
const validateObjectId = require('../middleware/validateObjectId');
const { validatePlacement } = require('../middleware/validation');

// Get all placements with populated student and company data (Admin only)
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const placements = await Placement.find()
      .populate('studentId', 'name email branch cgpa')
      .populate('companyId', 'company_name location package job_role')
      .sort({ createdAt: -1 });

    res.status(200).json(placements);
  } catch (error) {
    console.error('Error fetching placements:', error);
    res.status(500).json({ 
      message: 'Error fetching placements',
      error: error.message 
    });
  }
});

// Get a single placement by ID (Admin only or own placement)
router.get('/:id', auth, validateObjectId, async (req, res) => {
  try {
    const placementId = req.params.id;
    const placement = await Placement.findById(placementId)
      .populate('studentId', 'name email branch cgpa')
      .populate('companyId', 'company_name location package job_role');
    
    if (!placement) {
      return res.status(404).json({ message: 'Placement not found' });
    }
    
    // Students can only view their own placements
    if (req.user.role === 'user' && placement.studentId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Access denied. You can only view your own placements.'
      });
    }
    
    res.status(200).json(placement);
  } catch (error) {
    console.error('Error fetching placement:', error);
    res.status(500).json({ 
      message: 'Error fetching placement',
      error: error.message 
    });
  }
});

// Add a new placement (Admin only)
router.post('/', auth, adminAuth, validatePlacement, async (req, res) => {
  try {
    const { studentId, companyId, placement_date, status, interview_round, notes } = req.body;

    // Validate student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(400).json({ message: 'Student not found' });
    }

    // Validate company exists
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({ message: 'Company not found' });
    }

    // Check if placement already exists for this student and company
    const existingPlacement = await Placement.findOne({ studentId, companyId });
    if (existingPlacement) {
      return res.status(400).json({ 
        message: 'Placement already exists for this student and company' 
      });
    }

    // Create new placement
    const placement = new Placement({
      studentId,
      companyId,
      placement_date: placement_date || new Date(),
      status: status || 'Pending',
      interview_round: interview_round || 'Technical',
      notes
    });

    await placement.save();

    // Update student's placed status if selected
    if (status === 'Selected') {
      await Student.findByIdAndUpdate(studentId, { placed: true });
    }

    // Return populated placement
    const populatedPlacement = await Placement.findById(placement._id)
      .populate('studentId', 'name email branch cgpa')
      .populate('companyId', 'company_name location package job_role');

    res.status(201).json({
      message: 'Placement added successfully',
      placement: populatedPlacement
    });
  } catch (error) {
    console.error('Error adding placement:', error);
    res.status(500).json({ 
      message: 'Error adding placement',
      error: error.message 
    });
  }
});

// Update a placement (Admin only)
router.put('/:id', auth, adminAuth, validateObjectId, async (req, res) => {
  try {
    const { studentId, companyId, placement_date, status, interview_round, notes } = req.body;
    const placementId = req.params.id;

    // Validate student exists if studentId is provided
    if (studentId) {
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(400).json({ message: 'Student not found' });
      }
    }

    // Validate company exists if companyId is provided
    if (companyId) {
      const company = await Company.findById(companyId);
      if (!company) {
        return res.status(400).json({ message: 'Company not found' });
      }
    }

    const placement = await Placement.findByIdAndUpdate(
      placementId,
      { studentId, companyId, placement_date, status, interview_round, notes },
      { new: true, runValidators: true }
    ).populate('studentId', 'name email branch cgpa')
     .populate('companyId', 'company_name location package job_role');

    if (!placement) {
      return res.status(404).json({ message: 'Placement not found' });
    }

    // Update student's placed status based on placement status
    if (placement.status === 'Selected') {
      await Student.findByIdAndUpdate(placement.studentId, { placed: true });
    } else {
      await Student.findByIdAndUpdate(placement.studentId, { placed: false });
    }

    res.status(200).json({
      message: 'Placement updated successfully',
      placement
    });
  } catch (error) {
    console.error('Error updating placement:', error);
    res.status(500).json({ 
      message: 'Error updating placement',
      error: error.message 
    });
  }
});

// Delete a placement (Admin only)
router.delete('/:id', auth, adminAuth, validateObjectId, async (req, res) => {
  try {
    const placementId = req.params.id;
    const placement = await Placement.findByIdAndDelete(placementId);

    if (!placement) {
      return res.status(404).json({ message: 'Placement not found' });
    }

    // Update student's placed status
    await Student.findByIdAndUpdate(placement.studentId, { placed: false });

    res.status(200).json({
      message: 'Placement deleted successfully',
      placement
    });
  } catch (error) {
    console.error('Error deleting placement:', error);
    res.status(500).json({ 
      message: 'Error deleting placement',
      error: error.message 
    });
  }
});

// Get placements by student ID (Admin or own placements)
router.get('/student/:studentId', auth, validateObjectId('studentId'), async (req, res) => {
  try {
    const requestedStudentId = req.params.studentId;
    
    // Students can only view their own placements
    if (req.user.role === 'user' && req.user._id.toString() !== requestedStudentId) {
      return res.status(403).json({
        message: 'Access denied. You can only view your own placements.'
      });
    }
    
    const placements = await Placement.find({ studentId: requestedStudentId })
      .populate('studentId', 'name email branch cgpa')
      .populate('companyId', 'company_name location package job_role')
      .sort({ createdAt: -1 });

    res.status(200).json(placements);
  } catch (error) {
    console.error('Error fetching student placements:', error);
    res.status(500).json({ 
      message: 'Error fetching student placements',
      error: error.message 
    });
  }
});

// Get placements by company ID (Admin only)
router.get('/company/:companyId', auth, adminAuth, validateObjectId('companyId'), async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const placements = await Placement.find({ companyId })
      .populate('studentId', 'name email branch cgpa')
      .populate('companyId', 'company_name location package job_role')
      .sort({ createdAt: -1 });

    res.status(200).json(placements);
  } catch (error) {
    console.error('Error fetching company placements:', error);
    res.status(500).json({ 
      message: 'Error fetching company placements',
      error: error.message 
    });
  }
});

module.exports = router;
