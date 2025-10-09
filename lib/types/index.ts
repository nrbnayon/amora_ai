import type React from "react";
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Wedding {
  id: string;
  userId: string;
  title: string;
  date: Date;
  venue?: string;
  budget: number;
  guestCount: number;
  culture?: string[];
  religion?: string[];
  status: "planning" | "confirmed" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

export interface Guest {
  id: string;
  weddingId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  rsvpStatus: "pending" | "accepted" | "declined";
  dietaryRestrictions?: string[];
  plusOne?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vendor {
  id: string;
  name: string;
  category?: string;
  email: string;
  contact?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  location: string;
  phone: string;
  website?: string;
  status?: "Active" | "Inactive" | "Confirmed" | "Pending" | "Declined";
  image?: string | string[];
  images?: string[];
  fullDescription: string;
  rating?: number;
  reviews?: number;
  priceRange?: "budget" | "moderate" | "luxury";
  description?: string;
  guestCapacity?: string;
}

export interface Task {
  id: string;
  weddingId: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  assignedTo?: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Budget {
  id: string;
  weddingId: string;
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  items: BudgetItem[];
}

export interface BudgetItem {
  id: string;
  budgetId: string;
  name: string;
  cost: number;
  paid: boolean;
  vendor?: string;
  notes?: string;
}

// Form types
export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

export interface SignInFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface OnboardingFormData {
  guestCount: number;
  budget: number;
  culture: string[];
  religion: string[];
  weddingDate?: Date;
  venue?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface FormFieldProps extends BaseComponentProps {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}
