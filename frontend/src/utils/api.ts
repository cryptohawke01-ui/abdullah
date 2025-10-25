import axios from 'axios';
import { Profile, News, Settings } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const profileApi = {
  get: () => api.get<Profile>('/profile'),
  update: (data: Partial<Profile>) => api.put('/profile', data),
};

export const newsApi = {
  getAll: () => api.get<News[]>('/news'),
  create: (data: Omit<News, 'id' | 'created_at' | 'updated_at'>) => api.post('/news', data),
  update: (id: number, data: Partial<News>) => api.put(`/news/${id}`, data),
  delete: (id: number) => api.delete(`/news/${id}`),
};

export const settingsApi = {
  get: () => api.get<Settings>('/settings'),
  update: (data: Partial<Settings>) => api.put('/settings', data),
};

export default api;
