export const APP_CONFIG = {
  name: "Amora AI",
  description: "AI-powered wedding planning platform",
  version: "1.0.0",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
    timeout: 10000,
  },
  auth: {
    sessionDuration: 30 * 24 * 60 * 60 * 1000, // 30 days
    refreshThreshold: 5 * 60 * 1000, // 5 minutes
  },
  features: {
    darkMode: true,
    analytics: true,
    notifications: true,
  },
} as const

export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  VERIFY: "/auth/verify",
  DASHBOARD: "/dashboard",
  ONBOARDING: "/onboarding",
  TRADITIONS: "/onboarding/traditions",
  BASIC_INFO: "/onboarding/basic-info",
  WEDDING: "/wedding",
  GUESTS: "/wedding/guests",
  BUDGET: "/wedding/budget",
  TIMELINE: "/wedding/timeline",
  VENDORS: "/wedding/vendors",
  SETTINGS: "/settings",
} as const

export const WEDDING_CULTURES = [
  "African",
  "Middle Eastern",
  "European",
  "South American",
  "South Asian",
  "Eastern Asian",
  "Other",
] as const

export const WEDDING_RELIGIONS = [
  "Christian",
  "Catholic",
  "Jewish",
  "Muslim",
  "Hindu",
  "Buddhist",
  "Sikh",
  "Other",
] as const

export const VENDOR_CATEGORIES = [
  "venue",
  "catering",
  "photography",
  "videography",
  "music",
  "flowers",
  "decoration",
  "transportation",
  "other",
] as const

export const TASK_PRIORITIES = ["low", "medium", "high"] as const
export const TASK_STATUSES = ["todo", "in-progress", "completed"] as const
export const RSVP_STATUSES = ["pending", "accepted", "declined"] as const

export const BUDGET_CATEGORIES = [
  "Venue",
  "Catering",
  "Photography",
  "Videography",
  "Music & Entertainment",
  "Flowers & Decoration",
  "Attire",
  "Transportation",
  "Stationery",
  "Other",
] as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const
