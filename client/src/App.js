import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Students from './pages/Students';
import Companies from './pages/Companies';
import Placements from './pages/Placements';
import AddStudent from './pages/AddStudent';
import AddCompany from './pages/AddCompany';
import AddPlacement from './pages/AddPlacement';
import ProtectedRoute, { AdminRoute, StudentRoute, AuthRoute } from './components/ProtectedRoute';

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
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={!user ? <Login onLogin={handleLogin} /> : <Navigate to={user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard'} />} 
            />
            <Route 
              path="/register" 
              element={!user ? <Register onLogin={handleLogin} /> : <Navigate to={user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard'} />} 
            />

            {/* Admin Routes */}
            <Route 
              path="/admin-dashboard" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
            <Route 
              path="/students" 
              element={
                <AdminRoute>
                  <Students />
                </AdminRoute>
              } 
            />
            <Route 
              path="/students/add" 
              element={
                <AdminRoute>
                  <AddStudent />
                </AdminRoute>
              } 
            />
            <Route 
              path="/companies" 
              element={
                <AdminRoute>
                  <Companies />
                </AdminRoute>
              } 
            />
            <Route 
              path="/companies/add" 
              element={
                <AdminRoute>
                  <AddCompany />
                </AdminRoute>
              } 
            />
            <Route 
              path="/placements/add" 
              element={
                <AdminRoute>
                  <AddPlacement />
                </AdminRoute>
              } 
            />

            {/* Student Routes */}
            <Route 
              path="/student-dashboard" 
              element={
                <StudentRoute>
                  <StudentDashboard />
                </StudentRoute>
              } 
            />
            <Route 
              path="/placements" 
              element={
                <AuthRoute>
                  <Placements />
                </AuthRoute>
              } 
            />

            {/* Root redirect based on role */}
            <Route 
              path="/" 
              element={
                user ? (
                  <Navigate to={user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard'} />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />

            {/* Catch all route */}
            <Route 
              path="*" 
              element={
                user ? (
                  <Navigate to={user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard'} />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
