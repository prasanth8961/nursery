/* ===== Admin Types ===== */

export interface AdminCategory {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminPlant {
  id: string;
  name: string;
  tamilName?: string;
  subName?: string;
  description?: string;
  baseImageUrl?: string;
  categoryId: string;
  category?: AdminCategory;
  careInfo?: string;
  fertilizingInfo?: string;
  usageInfo?: string;
  isAvailable: boolean;
  isFeatured: boolean;
  tags: string[];
  relatedPlantsIds: string[];
  variants?: AdminPlantVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminPlantVariant {
  id: string;
  size: string;
  price: number;
  discount: number;
  ratings: number;
  reviewsCount: number;
  growthRate?: string;
  height?: string;
  weight?: string;
  quantityInStock: number;
  isAvailable: boolean;
  coverImages: string[];
  plantId: string;
  plant?: AdminPlant;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  access_token: string;
  user: AdminUser;
}

/* ===== Column Definition for DataTable ===== */
export interface ColumnDef<T> {
  key: keyof T | string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

/* ===== Form Field Definition ===== */
export interface FormFieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'tags';
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  defaultValue?: unknown;
}
