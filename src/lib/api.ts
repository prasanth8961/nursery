import axios from 'axios';
import { AdminCategory, AdminPlant } from '@/types/admin';
import { Plant } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({ baseURL: API_BASE });

export const categoriesApi = {
  getAll: () => api.get<AdminCategory[]>('/categories'),
};

export const plantsApi = {
  getAll: (params?: { page?: number; limit?: number; category?: string; search?: string }) =>
    api.get<{ data: AdminPlant[]; total: number; page: number; limit: number; totalPages: number }>('/plants', { params }),
  getFeatured: () => api.get<AdminPlant[]>('/plants/featured'),
};

export default api;
