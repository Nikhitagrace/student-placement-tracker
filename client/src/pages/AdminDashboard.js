import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentAPI, companyAPI, placementAPI } from '../utils/apiWithAuth';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCompanies: 0,
    totalPlacements: 0,
    placedStudents: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [students, companies, placements] = await Promise.all([
          studentAPI.getAll(),
          companyAPI.getAll(),
          placementAPI.getAll()
        ]);

        const placedCount = students.filter(student => student.placed).length;

        setStats({
          totalStudents: students.length,
          totalCompanies: companies.length,
          totalPlacements: placements.length,
          placedStudents: placedCount
        });
        setError('');
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="loading">Loading admin dashboard...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-20">
        <h2>Admin Dashboard</h2>
        <span className="badge badge-admin">Administrator</span>
      </div>
      
      {error && <div className="alert alert-error">{error}</div>}

      <p>Welcome to the Admin Panel - Manage your placement system</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="card">
          <h3>Total Students</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3498db' }}>
            {stats.totalStudents}
          </p>
          <Link to="/students" className="btn btn-primary">Manage Students</Link>
        </div>

        <div className="card">
          <h3>Total Companies</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#27ae60' }}>
            {stats.totalCompanies}
          </p>
          <Link to="/companies" className="btn btn-success">Manage Companies</Link>
        </div>

        <div className="card">
          <h3>Total Placements</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f39c12' }}>
            {stats.totalPlacements}
          </p>
          <Link to="/placements" className="btn btn-warning">Manage Placements</Link>
        </div>

        <div className="card">
          <h3>Placed Students</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e74c3c' }}>
            {stats.placedStudents}
          </p>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            {stats.totalStudents > 0 ? 
              `${((stats.placedStudents / stats.totalStudents) * 100).toFixed(1)}% placement rate` 
              : 'N/A'}
          </p>
        </div>
      </div>

      <div className="card">
        <h3>Admin Quick Actions</h3>
        <div className="d-flex gap-10">
          <Link to="/students/add" className="btn btn-primary">Add Student</Link>
          <Link to="/companies/add" className="btn btn-success">Add Company</Link>
          <Link to="/placements/add" className="btn btn-warning">Add Placement</Link>
        </div>
      </div>

      <div className="card" style={{ marginTop: '20px' }}>
        <h3>System Overview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <strong>Unplaced Students:</strong>
            <p>{stats.totalStudents - stats.placedStudents}</p>
          </div>
          <div>
            <strong>Active Companies:</strong>
            <p>{stats.totalCompanies}</p>
          </div>
          <div>
            <strong>Pending Placements:</strong>
            <p>View in Placements section</p>
          </div>
          <div>
            <strong>System Status:</strong>
            <p style={{ color: '#27ae60' }}>✓ Operational</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
