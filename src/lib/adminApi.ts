import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({ baseURL: API_BASE });

/* ===== Auth header helper ===== */
function authHeader() {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* ===== Auth ===== */
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
};

/* ===== Generic CRUD factory ===== */
function createCrudApi<T>(resource: string) {
  return {
    getAll: () => api.get<T[]>(`/${resource}`, { headers: authHeader() }),
    getOne: (id: string) => api.get<T>(`/${resource}/${id}`, { headers: authHeader() }),
    create: (data: Partial<T>) => api.post<T>(`/${resource}`, data, { headers: authHeader() }),
    update: (id: string, data: Partial<T>) => api.patch<T>(`/${resource}/${id}`, data, { headers: authHeader() }),
    remove: (id: string) => api.delete(`/${resource}/${id}`, { headers: authHeader() }),
  };
}

/* ===== Entity APIs ===== */
import type { AdminCategory, AdminPlant, AdminPlantVariant, AdminUser } from '@/types/admin';

export const categoriesApi = {
  ...createCrudApi<AdminCategory>('categories'),
  bulkImport: (names: string[]) =>
    api.post<{ created: number; message: string }>('/categories/bulk', { names }, { headers: authHeader() }),
};
export const plantsApi = {
  ...createCrudApi<AdminPlant>('plants'),
  bulkImport: (plants: any[]) =>
    api.post<{ created: number; message: string }>('/plants/bulk', { plants }, { headers: authHeader() }),
};
export const plantVariantsApi = createCrudApi<AdminPlantVariant>('plant-variants');
export const usersApi = createCrudApi<AdminUser>('users');

/* ===== Upload ===== */
export const uploadApi = {
  single: (file: File, bucket?: string, name?: string) => {
    const fd = new FormData();
    fd.append('file', file);
    let url = bucket ? `/upload/single?bucket=${bucket}` : '/upload/single';
    if (name) {
      url += (url.includes('?') ? '&' : '?') + `name=${encodeURIComponent(name)}`;
    }
    return api.post<{ url: string }>(url, fd, {
      headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' },
    });
  },
  multiple: (files: File[], bucket?: string, name?: string) => {
    const fd = new FormData();
    files.forEach((f) => fd.append('files', f));
    let url = bucket ? `/upload/multiple?bucket=${bucket}` : '/upload/multiple';
    if (name) {
      url += (url.includes('?') ? '&' : '?') + `name=${encodeURIComponent(name)}`;
    }
    return api.post<{ urls: string[] }>(url, fd, {
      headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' },
    });
  },
};
