import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentAPI } from '../utils/api';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    branch: 'Computer Science',
    cgpa: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const branches = [
    'Computer Science',
    'Information Technology',
    'Electronics and Communication',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering'
  ];

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
      await studentAPI.create(formData);
      navigate('/students');
    } catch (err) {
      setError(err.message || 'Error adding student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="mb-20">Add New Student</h2>
      
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            placeholder="10-digit phone number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="branch">Branch</label>
          <select
            id="branch"
            name="branch"
            className="form-control"
            value={formData.branch}
            onChange={handleChange}
            required
          >
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="cgpa">CGPA</label>
          <input
            type="number"
            id="cgpa"
            name="cgpa"
            className="form-control"
            value={formData.cgpa}
            onChange={handleChange}
            min="0"
            max="10"
            step="0.01"
            required
          />
        </div>

        <div className="d-flex gap-10">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Student'}
          </button>
          <button 
            type="button" 
            className="btn btn-danger" 
            onClick={() => navigate('/students')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
