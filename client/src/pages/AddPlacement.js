import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { studentAPI, companyAPI, placementAPI } from '../utils/api';

const AddPlacement = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    companyId: '',
    placement_date: '',
    status: 'Pending',
    interview_round: 'Technical',
    notes: ''
  });
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
    fetchCompanies();
    
    // Pre-fill student or company if coming from respective pages
    const studentId = searchParams.get('studentId');
    const companyId = searchParams.get('companyId');
    
    if (studentId) {
      setFormData(prev => ({ ...prev, studentId }));
    }
    if (companyId) {
      setFormData(prev => ({ ...prev, companyId }));
    }
  }, [searchParams]);

  const fetchStudents = async () => {
    try {
      const data = await studentAPI.getAll();
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  const fetchCompanies = async () => {
    try {
      const data = await companyAPI.getAll();
      setCompanies(data);
    } catch (err) {
      console.error('Error fetching companies:', err);
    }
  };

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
      await placementAPI.create(formData);
      navigate('/placements');
    } catch (err) {
      setError(err.message || 'Error adding placement');
    } finally {
      setLoading(false);
    }
  };

  const statuses = ['Pending', 'Selected', 'Rejected', 'On Hold'];
  const interviewRounds = ['Technical', 'HR', 'Managerial', 'Final'];

  return (
    <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2 className="mb-20">Add New Placement</h2>
      
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="studentId">Student</label>
          <select
            id="studentId"
            name="studentId"
            className="form-control"
            value={formData.studentId}
            onChange={handleChange}
            required
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name} - {student.email} - {student.branch}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="companyId">Company</label>
          <select
            id="companyId"
            name="companyId"
            className="form-control"
            value={formData.companyId}
            onChange={handleChange}
            required
          >
            <option value="">Select a company</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.company_name} - {company.location} - ₹{company.package} LPA
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="placement_date">Placement Date</label>
          <input
            type="date"
            id="placement_date"
            name="placement_date"
            className="form-control"
            value={formData.placement_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            className="form-control"
            value={formData.status}
            onChange={handleChange}
            required
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="interview_round">Interview Round</label>
          <select
            id="interview_round"
            name="interview_round"
            className="form-control"
            value={formData.interview_round}
            onChange={handleChange}
            required
          >
            {interviewRounds.map((round) => (
              <option key={round} value={round}>
                {round}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            className="form-control"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Additional notes about the placement..."
          ></textarea>
        </div>

        <div className="d-flex gap-10">
          <button type="submit" className="btn btn-warning" disabled={loading}>
            {loading ? 'Adding...' : 'Add Placement'}
          </button>
          <button 
            type="button" 
            className="btn btn-danger" 
            onClick={() => navigate('/placements')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlacement;
