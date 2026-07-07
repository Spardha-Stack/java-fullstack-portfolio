import axios from 'axios';

// Base URL is injected via environment variable so the same build
// can point to localhost in dev and the deployed Render/Railway URL in prod.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
export const profileService = {
  get: () => api.get("/profile"),
};

export const projectService = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
};

export const skillService = {
  getAll: () => api.get('/skills'),
};

export const experienceService = {
  getAll: () => api.get('/experience'),
};

export const educationService = {
  getAll: () => api.get('/education'),
};

export const certificateService = {
  getAll: () => api.get('/certificates'),
};

export const achievementService = {
  getAll: () => api.get('/achievements'),
};

export const contactService = {
  send: (payload) => api.post('/contact', payload),
};

export default api;
