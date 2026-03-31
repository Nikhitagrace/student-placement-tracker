import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1>Placement Tracker</h1>
        <ul className="nav-links">
          <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
          <li><Link to="/students" className="nav-link">Students</Link></li>
          <li><Link to="/companies" className="nav-link">Companies</Link></li>
          <li><Link to="/placements" className="nav-link">Placements</Link></li>
          <li>
            <span style={{ marginRight: '10px' }}>Welcome, {user?.username}</span>
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
