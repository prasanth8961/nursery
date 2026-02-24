import { MdDashboard, MdCategory, MdLocalFlorist, MdPeople } from 'react-icons/md';
import { IconType } from 'react-icons';

/* ===== Sidebar Navigation ===== */
export interface NavItem {
  key: string;
  label: string;
  href: string;
  icon: IconType;
}

export const ADMIN_NAV: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', href: '/admin', icon: MdDashboard },
  { key: 'categories', label: 'Categories', href: '/admin/categories', icon: MdCategory },
  { key: 'plants', label: 'Plants', href: '/admin/plants', icon: MdLocalFlorist },
  { key: 'users', label: 'Users', href: '/admin/users', icon: MdPeople },
];

/* ===== Strings ===== */
export const STRINGS = {
  APP_TITLE: 'Prasanth Nursery Admin',
  DASHBOARD: 'Dashboard',
  CATEGORIES: 'Categories',
  PLANTS: 'Plants',
  USERS: 'Users',

  // Actions
  ADD_NEW: 'Add New',
  EDIT: 'Edit',
  DELETE: 'Delete',
  SAVE: 'Save',
  CANCEL: 'Cancel',
  CONFIRM_DELETE: 'Are you sure you want to delete this item?',
  CONFIRM_DELETE_TITLE: 'Confirm Deletion',

  // Status
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  AVAILABLE: 'Available',
  UNAVAILABLE: 'Unavailable',
  FEATURED: 'Featured',

  // Table
  NO_DATA: 'No data found',
  LOADING: 'Loading...',
  ACTIONS: 'Actions',

  // Auth
  LOGIN_TITLE: 'Admin Login',
  EMAIL_PLACEHOLDER: 'Enter your email',
  PASSWORD_PLACEHOLDER: 'Enter your password',
  LOGIN_BUTTON: 'Sign In',
  LOGOUT: 'Logout',

  // Toast
  CREATED_SUCCESS: 'Created successfully',
  UPDATED_SUCCESS: 'Updated successfully',
  DELETED_SUCCESS: 'Deleted successfully',
  ERROR_GENERIC: 'Something went wrong',
} as const;

/* ===== Colors (Tailwind classes) ===== */
export const COLORS = {
  SIDEBAR_BG: 'bg-gray-900',
  SIDEBAR_TEXT: 'text-gray-300',
  SIDEBAR_ACTIVE: 'bg-emerald-600 text-white',
  SIDEBAR_HOVER: 'hover:bg-gray-800',
  HEADER_BG: 'bg-white dark:bg-gray-900',
  CARD_BG: 'bg-white dark:bg-gray-800',
  CARD_BORDER: 'border border-gray-200 dark:border-gray-700',
  PRIMARY_BTN: 'bg-emerald-600 hover:bg-emerald-700 text-white',
  DANGER_BTN: 'bg-red-600 hover:bg-red-700 text-white',
  GHOST_BTN: 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200',
  BADGE_ACTIVE: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  BADGE_INACTIVE: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  BADGE_ADMIN: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  BADGE_USER: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
} as const;
