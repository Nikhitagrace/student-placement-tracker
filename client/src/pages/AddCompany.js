import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { companyAPI } from '../utils/api';

const AddCompany = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    location: '',
    package: '',
    job_role: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await companyAPI.create(formData);
      navigate('/companies');
    } catch (err) {
      setError(err.message || 'Error adding company');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="mb-20">Add New Company</h2>
      
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="company_name">Company Name</label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            className="form-control"
            value={formData.company_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, State"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="package">Package (LPA)</label>
          <input
            type="number"
            id="package"
            name="package"
            className="form-control"
            value={formData.package}
            onChange={handleChange}
            min="0"
            step="0.1"
            placeholder="Package in Lakhs Per Annum"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="job_role">Job Role</label>
          <input
            type="text"
            id="job_role"
            name="job_role"
            className="form-control"
            value={formData.job_role}
            onChange={handleChange}
            placeholder="e.g., Software Engineer, Data Analyst"
            required
          />
        </div>

        <div className="d-flex gap-10">
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? 'Adding...' : 'Add Company'}
          </button>
          <button 
            type="button" 
            className="btn btn-danger" 
            onClick={() => navigate('/companies')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCompany;
