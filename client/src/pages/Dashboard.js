import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentAPI, companyAPI, placementAPI } from '../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCompanies: 0,
    totalPlacements: 0,
    placedStudents: 0
  });
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to the Student Placement Management System</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="card">
          <h3>Total Students</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3498db' }}>
            {stats.totalStudents}
          </p>
          <Link to="/students" className="btn btn-primary">View Students</Link>
        </div>

        <div className="card">
          <h3>Total Companies</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#27ae60' }}>
            {stats.totalCompanies}
          </p>
          <Link to="/companies" className="btn btn-success">View Companies</Link>
        </div>

        <div className="card">
          <h3>Total Placements</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f39c12' }}>
            {stats.totalPlacements}
          </p>
          <Link to="/placements" className="btn btn-warning">View Placements</Link>
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
        <h3>Quick Actions</h3>
        <div className="d-flex gap-10">
          <Link to="/students/add" className="btn btn-primary">Add Student</Link>
          <Link to="/companies/add" className="btn btn-success">Add Company</Link>
          <Link to="/placements/add" className="btn btn-warning">Add Placement</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
