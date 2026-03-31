const API_BASE_URL = 'http://localhost:5000/api';

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

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
