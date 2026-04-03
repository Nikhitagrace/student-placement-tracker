import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * Handles role-based route protection on frontend
 * Checks localStorage for user authentication and role
 */
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const location = useLocation();
  
  // Get user data from localStorage
  const getUserFromStorage = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      
      const user = JSON.parse(userStr);
      return user;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      localStorage.removeItem('user'); // Clear corrupted data
      return null;
    }
  };

  const user = getUserFromStorage();

  // Check if user is authenticated
  if (!user || !user.id || !user.role) {
    // Redirect to login with return path
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // Check if specific role is required
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    const redirectPath = user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard';
    return (
      <Navigate 
        to={redirectPath} 
        replace 
      />
    );
  }

  // User is authenticated and has required role
  return children;
};

/**
 * AdminRoute - Only allows admin users
 */
export const AdminRoute = ({ children }) => (
  <ProtectedRoute requiredRole="admin">
    {children}
  </ProtectedRoute>
);

/**
 * StudentRoute - Only allows student users
 */
export const StudentRoute = ({ children }) => (
  <ProtectedRoute requiredRole="user">
    {children}
  </ProtectedRoute>
);

/**
 * AuthRoute - Requires authentication but no specific role
 */
export const AuthRoute = ({ children }) => (
  <ProtectedRoute>
    {children}
  </ProtectedRoute>
);

export default ProtectedRoute;
