import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const getDashboardLink = () => {
    return user?.role === 'admin' ? '/admin-dashboard' : '/student-dashboard';
  };

  const getNavLinks = () => {
    if (user?.role === 'admin') {
      return (
        <>
          <li><Link to="/admin-dashboard" className="nav-link">Dashboard</Link></li>
          <li><Link to="/students" className="nav-link">Students</Link></li>
          <li><Link to="/companies" className="nav-link">Companies</Link></li>
          <li><Link to="/placements" className="nav-link">Placements</Link></li>
        </>
      );
    } else {
      return (
        <>
          <li><Link to="/student-dashboard" className="nav-link">Dashboard</Link></li>
          <li><Link to="/placements" className="nav-link">My Placements</Link></li>
        </>
      );
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1>Placement Tracker</h1>
        <ul className="nav-links">
          {getNavLinks()}
          <li>
            <span style={{ marginRight: '10px' }}>
              Welcome, {user?.username} 
              <span style={{ 
                marginLeft: '5px', 
                padding: '2px 6px', 
                backgroundColor: user?.role === 'admin' ? '#e74c3c' : '#3498db',
                color: 'white',
                borderRadius: '3px',
                fontSize: '0.8rem'
              }}>
                {user?.role === 'admin' ? 'Admin' : 'Student'}
              </span>
            </span>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
