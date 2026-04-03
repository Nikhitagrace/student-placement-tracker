const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const studentAuth = require('../middleware/studentAuth');
const validateObjectId = require('../middleware/validateObjectId');

// Get all students with search functionality (Admin only)
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    // If search parameter is provided, add text search
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { branch: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const students = await Student.find(query).sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ 
      message: 'Error fetching students',
      error: error.message 
    });
  }
});

// Get a single student by ID (Admin only or own profile)
router.get('/:id', auth, validateObjectId, async (req, res) => {
  try {
    const studentId = req.params.id;
    
    // Admin can access any student, students can only access their own profile
    if (req.user.role === 'user' && req.user._id.toString() !== studentId) {
      return res.status(403).json({
        message: 'Access denied. You can only view your own profile.'
      });
    }
    
    const student = await Student.findById(studentId);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ 
      message: 'Error fetching student',
      error: error.message 
    });
  }
});

// Add a new student (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { name, branch, cgpa, email, phone } = req.body;

    // Check if student with this email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ 
        message: 'Student with this email already exists' 
      });
    }

    // Create new student
    const student = new Student({
      name,
      branch,
      cgpa,
      email,
      phone
    });

    await student.save();

    res.status(201).json({
      message: 'Student added successfully',
      student
    });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ 
      message: 'Error adding student',
      error: error.message 
    });
  }
});

// Update a student (Admin only or own profile)
router.put('/:id', auth, validateObjectId, async (req, res) => {
  try {
    const { name, branch, cgpa, email, phone } = req.body;
    const studentId = req.params.id;
    
    // Admin can update any student, students can only update their own profile
    if (req.user.role === 'user' && req.user._id.toString() !== studentId) {
      return res.status(403).json({
        message: 'Access denied. You can only update your own profile.'
      });
    }

    // Check if another student with this email exists
    const existingStudent = await Student.findOne({ 
      email, 
      _id: { $ne: studentId } 
    });
    
    if (existingStudent) {
      return res.status(400).json({ 
        message: 'Another student with this email already exists' 
      });
    }

    const student = await Student.findByIdAndUpdate(
      studentId,
      { name, branch, cgpa, email, phone },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
      message: 'Student updated successfully',
      student
    });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ 
      message: 'Error updating student',
      error: error.message 
    });
  }
});

// Delete a student (Admin only)
router.delete('/:id', auth, adminAuth, validateObjectId, async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findByIdAndDelete(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
      message: 'Student deleted successfully',
      student
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ 
      message: 'Error deleting student',
      error: error.message 
    });
  }
});

module.exports = router;
