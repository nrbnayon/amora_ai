import { z } from "zod";

// Auth validation schemas
export const signUpSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
    firstName: z.string().min(1, "First name is required").optional(),
    lastName: z.string().min(1, "Last name is required").optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

// Onboarding validation schemas
export const basicInfoSchema = z.object({
  guestCount: z
    .number()
    .min(1, "Guest count must be at least 1")
    .max(1000, "Guest count cannot exceed 1000"),
  budget: z
    .number()
    .min(100, "Budget must be at least $100")
    .max(1000000, "Budget cannot exceed $1,000,000"),
  weddingDate: z.date().optional(),
  venue: z.string().optional(),
});

export const traditionsSchema = z.object({
  culture: z.array(z.string()).min(1, "Please select at least one culture"),
  religion: z.array(z.string()).min(1, "Please select at least one religion"),
});

// Wedding management schemas
export const guestSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address").optional(),
  phone: z.string().optional(),
  dietaryRestrictions: z.array(z.string()).optional(),
  plusOne: z.boolean().optional(),
});

export const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  priority: z.enum(["low", "medium", "high"]),
  category: z.string().min(1, "Category is required"),
  assignedTo: z.string().optional(),
});

export const budgetItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  cost: z.number().min(0, "Cost must be positive"),
  vendor: z.string().optional(),
  notes: z.string().optional(),
});

// Utility functions
export function validateEmail(email: string): boolean {
  return signInSchema.shape.email.safeParse(email).success;
}

export function validatePassword(password: string): boolean {
  return signUpSchema.shape.password.safeParse(password).success;
}

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Reset Password Schema
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Question 1 Schema - Basic Information
export const question1Schema = z.object({
  yourName: z.string().min(2, "Name must be at least 2 characters"),
  partnerName: z
    .string()
    .min(2, "Partner's name must be at least 2 characters"),
  weddingLocation: z.string().min(2, "Location must be at least 2 characters"),
  weddingDate: z.string().min(1, "Wedding date is required"),
});

export type Question1FormData = z.infer<typeof question1Schema>;

// Question 2 Schema - Budget & Priorities
export const question2Schema = z.object({
  budget: z.string().min(1, "Budget is required"),
  topPriorities: z.array(z.string()).min(1, "Select at least one priority"),
  entertainment: z
    .array(z.string())
    .min(1, "Select at least one entertainment option"),
});

export type Question2FormData = z.infer<typeof question2Schema>;

// Question 3 Schema - Guest Details
export const question3Schema = z.object({
  weddingStyle: z.string().min(1, "Please select a wedding style"),
  atmosphere: z.string().min(1, "Please select an atmosphere"),
  themeOrColor: z.string().optional(),
  culturalRituals: z.string().optional(),
});

export type Question3FormData = z.infer<typeof question3Schema>;

// Question 4 Schema - Additional Details
export const question4Schema = z.object({
  guestCount: z.string().min(1, "Guest count is required"),
  venuePreference: z.string().min(1, "Venue preference is required"),
  mealPreference: z.string().min(1, "Meal preference is required"),
  additionalNotes: z.string().optional(),
});

export type Question4FormData = z.infer<typeof question4Schema>;

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type BasicInfoFormData = z.infer<typeof basicInfoSchema>;
export type TraditionsFormData = z.infer<typeof traditionsSchema>;
export type GuestFormData = z.infer<typeof guestSchema>;
export type TaskFormData = z.infer<typeof taskSchema>;
export type BudgetItemFormData = z.infer<typeof budgetItemSchema>;
