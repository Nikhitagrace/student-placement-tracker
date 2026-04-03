const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const validateObjectId = require('../middleware/validateObjectId');

// Get all companies with search functionality (Admin only)
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    // If search parameter is provided, add text search
    if (search) {
      query = {
        $or: [
          { company_name: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { job_role: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const companies = await Company.find(query).sort({ createdAt: -1 });
    res.status(200).json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ 
      message: 'Error fetching companies',
      error: error.message 
    });
  }
});

// Get a single company by ID (Admin only)
router.get('/:id', auth, adminAuth, validateObjectId, async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    res.status(200).json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ 
      message: 'Error fetching company',
      error: error.message 
    });
  }
});

// Add a new company (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { company_name, location, package: salary, job_role } = req.body;

    // Check if company with this name already exists
    const existingCompany = await Company.findOne({ company_name });
    if (existingCompany) {
      return res.status(400).json({ 
        message: 'Company with this name already exists' 
      });
    }

    // Create new company
    const company = new Company({
      company_name,
      location,
      package: salary,
      job_role
    });

    await company.save();

    res.status(201).json({
      message: 'Company added successfully',
      company
    });
  } catch (error) {
    console.error('Error adding company:', error);
    res.status(500).json({ 
      message: 'Error adding company',
      error: error.message 
    });
  }
});

// Update a company (Admin only)
router.put('/:id', auth, adminAuth, validateObjectId, async (req, res) => {
  try {
    const { company_name, location, package: salary, job_role } = req.body;
    const companyId = req.params.id;

    // Check if another company with this name exists
    const existingCompany = await Company.findOne({ 
      company_name, 
      _id: { $ne: companyId } 
    });
    
    if (existingCompany) {
      return res.status(400).json({ 
        message: 'Another company with this name already exists' 
      });
    }

    const company = await Company.findByIdAndUpdate(
      companyId,
      { company_name, location, package: salary, job_role },
      { new: true, runValidators: true }
    );

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({
      message: 'Company updated successfully',
      company
    });
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ 
      message: 'Error updating company',
      error: error.message 
    });
  }
});

// Delete a company (Admin only)
router.delete('/:id', auth, adminAuth, validateObjectId, async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findByIdAndDelete(companyId);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({
      message: 'Company deleted successfully',
      company
    });
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ 
      message: 'Error deleting company',
      error: error.message 
    });
  }
});

module.exports = router;
