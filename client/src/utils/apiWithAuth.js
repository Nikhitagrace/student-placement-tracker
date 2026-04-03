const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Get user data from localStorage
 */
const getUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    const user = JSON.parse(userStr);
    return user;
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    localStorage.removeItem('user');
    return null;
  }
};

/**
 * API request function with automatic header injection
 * Adds x-user-id and x-user-role headers from localStorage
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const user = getUserFromStorage();

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add authentication headers if user is available
  if (user && user.id && user.role) {
    defaultOptions.headers['x-user-id'] = user.id;
    defaultOptions.headers['x-user-role'] = user.role;
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    // Handle authentication errors
    if (response.status === 401) {
      // Clear invalid user data
      localStorage.removeItem('user');
      // Redirect to login (this will be handled by the component)
      throw new Error('Authentication failed. Please login again.');
    }

    if (response.status === 403) {
      throw new Error('Access denied. You do not have permission to perform this action.');
    }

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Authentication APIs
export const authAPI = {
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
};

// Student APIs
export const studentAPI = {
  getAll: (search = '') => apiRequest(`/students${search ? `?search=${search}` : ''}`),
  getById: (id) => apiRequest(`/students/${id}`),
  create: (studentData) => apiRequest('/students', {
    method: 'POST',
    body: JSON.stringify(studentData),
  }),
  update: (id, studentData) => apiRequest(`/students/${id}`, {
    method: 'PUT',
    body: JSON.stringify(studentData),
  }),
  delete: (id) => apiRequest(`/students/${id}`, {
    method: 'DELETE',
  }),
};

// Company APIs
export const companyAPI = {
  getAll: (search = '') => apiRequest(`/companies${search ? `?search=${search}` : ''}`),
  getById: (id) => apiRequest(`/companies/${id}`),
  create: (companyData) => apiRequest('/companies', {
    method: 'POST',
    body: JSON.stringify(companyData),
  }),
  update: (id, companyData) => apiRequest(`/companies/${id}`, {
    method: 'PUT',
    body: JSON.stringify(companyData),
  }),
  delete: (id) => apiRequest(`/companies/${id}`, {
    method: 'DELETE',
  }),
};

// Placement APIs
export const placementAPI = {
  getAll: () => apiRequest('/placements'),
  getById: (id) => apiRequest(`/placements/${id}`),
  create: (placementData) => apiRequest('/placements', {
    method: 'POST',
    body: JSON.stringify(placementData),
  }),
  update: (id, placementData) => apiRequest(`/placements/${id}`, {
    method: 'PUT',
    body: JSON.stringify(placementData),
  }),
  delete: (id) => apiRequest(`/placements/${id}`, {
    method: 'DELETE',
  }),
  getByStudent: (studentId) => apiRequest(`/placements/student/${studentId}`),
  getByCompany: (companyId) => apiRequest(`/placements/company/${companyId}`),
};

export default apiRequest;
