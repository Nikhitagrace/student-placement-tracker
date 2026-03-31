import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Companies from './pages/Companies';
import Placements from './pages/Placements';
import AddStudent from './pages/AddStudent';
import AddCompany from './pages/AddCompany';
import AddPlacement from './pages/AddPlacement';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in on component mount
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        {user && <Navbar user={user} onLogout={handleLogout} />}
        <div className="container">
          <Routes>
            <Route 
              path="/login" 
              element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/register" 
              element={!user ? <Register onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/students" 
              element={user ? <Students /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/students/add" 
              element={user ? <AddStudent /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/companies" 
              element={user ? <Companies /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/companies/add" 
              element={user ? <AddCompany /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/placements" 
              element={user ? <Placements /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/placements/add" 
              element={user ? <AddPlacement /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/" 
              element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
