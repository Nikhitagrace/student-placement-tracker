import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { placementAPI } from '../utils/apiWithAuth';

const StudentDashboard = () => {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('user'));
    setUser(currentUser);

    const fetchStudentPlacements = async () => {
      if (!currentUser || !currentUser.id) {
        setError('User information not found');
        setLoading(false);
        return;
      }

      try {
        const placementsData = await placementAPI.getByStudent(currentUser.id);
        setPlacements(placementsData);
        setError('');
      } catch (error) {
        console.error('Error fetching student placements:', error);
        setError('Failed to load your placement data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentPlacements();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selected': return '#27ae60';
      case 'Rejected': return '#e74c3c';
      case 'On Hold': return '#f39c12';
      case 'Pending': return '#3498db';
      default: return '#666';
    }
  };

  const getRoundColor = (round) => {
    switch (round) {
      case 'Final': return '#27ae60';
      case 'Managerial': return '#9b59b6';
      case 'HR': return '#3498db';
      case 'Technical': return '#f39c12';
      default: return '#666';
    }
  };

  if (loading) {
    return <div className="loading">Loading your dashboard...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-20">
        <h2>Student Dashboard</h2>
        <span className="badge badge-student">Student</span>
      </div>
      
      {error && <div className="alert alert-error">{error}</div>}

      <p>Welcome back, {user?.username}! Track your placement progress here.</p>

      {/* Personal Information Card */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <h3>Your Profile</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <strong>Name:</strong>
            <p>{user?.username}</p>
          </div>
          <div>
            <strong>Email:</strong>
            <p>{user?.email}</p>
          </div>
          <div>
            <strong>Total Applications:</strong>
            <p>{placements.length}</p>
          </div>
          <div>
            <strong>Status:</strong>
            <p style={{ color: placements.some(p => p.status === 'Selected') ? '#27ae60' : '#f39c12' }}>
              {placements.some(p => p.status === 'Selected') ? '✓ Placed' : 'In Progress'}
            </p>
          </div>
        </div>
      </div>

      {/* Placement Status Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        <div className="card">
          <h4>Selected</h4>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#27ae60' }}>
            {placements.filter(p => p.status === 'Selected').length}
          </p>
        </div>
        <div className="card">
          <h4>Pending</h4>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3498db' }}>
            {placements.filter(p => p.status === 'Pending').length}
          </p>
        </div>
        <div className="card">
          <h4>On Hold</h4>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f39c12' }}>
            {placements.filter(p => p.status === 'On Hold').length}
          </p>
        </div>
        <div className="card">
          <h4>Rejected</h4>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e74c3c' }}>
            {placements.filter(p => p.status === 'Rejected').length}
          </p>
        </div>
      </div>

      {/* Recent Placements */}
      <div className="card">
        <h3>Your Placement Applications</h3>
        
        {placements.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <p>You haven't been assigned to any companies yet.</p>
            <p>Contact your placement coordinator for more information.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Package</th>
                  <th>Status</th>
                  <th>Interview Round</th>
                  <th>Applied Date</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {placements.map((placement) => (
                  <tr key={placement._id}>
                    <td>
                      <strong>{placement.companyId?.company_name}</strong>
                      <br />
                      <small style={{ color: '#666' }}>{placement.companyId?.location}</small>
                    </td>
                    <td>{placement.companyId?.job_role}</td>
                    <td>
                      ₹{placement.companyId?.package?.toLocaleString() || 'N/A'}
                      <br />
                      <small style={{ color: '#666' }}>per annum</small>
                    </td>
                    <td>
                      <span 
                        style={{ 
                          backgroundColor: getStatusColor(placement.status),
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8rem'
                        }}
                      >
                        {placement.status}
                      </span>
                    </td>
                    <td>
                      <span 
                        style={{ 
                          backgroundColor: getRoundColor(placement.interview_round),
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8rem'
                        }}
                      >
                        {placement.interview_round}
                      </span>
                    </td>
                    <td>
                      {new Date(placement.placement_date).toLocaleDateString()}
                    </td>
                    <td>
                      <small>{placement.notes || 'No notes'}</small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginTop: '20px' }}>
        <h3>Quick Actions</h3>
        <div className="d-flex gap-10">
          <button 
            className="btn btn-primary" 
            onClick={() => window.location.reload()}
          >
            Refresh Dashboard
          </button>
          <Link to="/placements" className="btn btn-secondary">
            View All Placements
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
