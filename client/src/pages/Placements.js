import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { placementAPI } from '../utils/api';

const Placements = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      setLoading(true);
      const data = await placementAPI.getAll();
      setPlacements(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Error fetching placements');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this placement?')) {
      try {
        await placementAPI.delete(id);
        setPlacements(placements.filter(placement => placement._id !== id));
      } catch (err) {
        setError(err.message || 'Error deleting placement');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selected':
        return { backgroundColor: '#d4edda', color: '#155724' };
      case 'Rejected':
        return { backgroundColor: '#f8d7da', color: '#721c24' };
      case 'Pending':
        return { backgroundColor: '#fff3cd', color: '#856404' };
      case 'On Hold':
        return { backgroundColor: '#d1ecf1', color: '#0c5460' };
      default:
        return { backgroundColor: '#e2e3e5', color: '#383d41' };
    }
  };

  if (loading) {
    return <div className="loading">Loading placements...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-20">
        <h2>Placements</h2>
        <Link to="/placements/add" className="btn btn-warning">Add Placement</Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {placements.length === 0 ? (
        <div className="card text-center">
          <p>No placements found.</p>
          <Link to="/placements/add" className="btn btn-warning">Add First Placement</Link>
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Company</th>
                <th>Package</th>
                <th>Job Role</th>
                <th>Status</th>
                <th>Interview Round</th>
                <th>Placement Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {placements.map((placement) => (
                <tr key={placement._id}>
                  <td>
                    <div>
                      <strong>{placement.studentId?.name}</strong>
                      <br />
                      <small style={{ color: '#666' }}>
                        {placement.studentId?.email}
                      </small>
                    </div>
                  </td>
                  <td>
                    <div>
                      <strong>{placement.companyId?.company_name}</strong>
                      <br />
                      <small style={{ color: '#666' }}>
                        {placement.companyId?.location}
                      </small>
                    </div>
                  </td>
                  <td>₹{placement.companyId?.package} LPA</td>
                  <td>{placement.companyId?.job_role}</td>
                  <td>
                    <span 
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        ...getStatusColor(placement.status)
                      }}
                    >
                      {placement.status}
                    </span>
                  </td>
                  <td>{placement.interview_round}</td>
                  <td>
                    {new Date(placement.placement_date).toLocaleDateString()}
                  </td>
                  <td className="table-actions">
                    <button 
                      onClick={() => handleDelete(placement._id)}
                      className="btn btn-danger"
                      style={{ padding: '4px 8px', fontSize: '12px' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Placements;
