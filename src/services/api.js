import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  
  // Automatically set correct Content-Type
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

// Registration endpoint – match your backend route
export const registerStudent = async (formData) => {
  return api.post('/register', formData);
};

export const loginAdmin = async (phone, password) => {
  return api.post('/admin/login', { phone, password });
};


export const getStatistics = async () => {
  return api.get('/statistics');
};

export const getCourses = async () => {
  return api.get('/courses');
};

export const getGallery = async () => {
  return api.get('/gallery');
};

export const getStudents = async () => {
  return api.get('/students');
};

export const updateStudentStatus = async (id, status) => {
  return api.put(`/students/${id}/status`, { status });
};

export const updateStudent = async (id, formData) => {
  return api.put(`/students/${id}`, formData);
};

export const deleteStudent = async (id) => {
  return api.delete(`/students/${id}`);
};

export default api;