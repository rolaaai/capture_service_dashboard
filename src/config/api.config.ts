// src/config/api.config.ts
// API configuration - centralized settings for API calls

/**
 * API Configuration
 * Change these values to configure API behavior across the app
 */
export const API_CONFIG = {
  // Base URL for API calls - change this for different environments
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  
  // Request timeout in milliseconds
  TIMEOUT: 30000,
  
  // Retry configuration
  RETRY: {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000, // ms
    RETRY_STATUS_CODES: [408, 429, 500, 502, 503, 504],
  },
  
  // Headers
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
} as const;

/**
 * API Endpoints - single source of truth for all API paths
 * Add new endpoints here for easy maintenance
 */
export const API_ENDPOINTS = {
  // ============================================
  // AUTH ENDPOINTS
  // ============================================
  AUTH: {
    // POST - Register new user
    REGISTER: '/auth/register',
    // POST - Verify email with OTP
    VERIFY_EMAIL: '/auth/verify-email',
    // POST - Login with email/password
    LOGIN: '/auth/login',
    // POST - Google OAuth login
    GOOGLE_LOGIN: '/auth/google',
    // POST - Request password reset email
    FORGOT_PASSWORD: '/auth/forgot-password',
    // POST - Verify reset OTP
    VERIFY_RESET_OTP: '/auth/verify-reset-otp',
    // POST - Reset password with OTP
    RESET_PASSWORD: '/auth/reset-password',
    // GET - Get current user (requires auth)
    ME: '/auth/me',
    // POST - Logout
    LOGOUT: '/auth/logout',
    // POST - Refresh token
    REFRESH_TOKEN: '/auth/refresh',
  },

  // ============================================
  // BILLING ENDPOINTS
  // ============================================
  BILLING: {
    // GET - List all available plans
    PLANS: '/billing/plans',
    // POST - Create payment order (requires auth)
    CREATE_ORDER: '/billing/order',
    // POST - Verify Razorpay payment (requires auth)
    VERIFY_PAYMENT: '/billing/verify',
    // GET - Get current subscription (requires auth)
    SUBSCRIPTION: '/billing/subscription',
    // GET - Get usage stats (requires auth)
    USAGE: '/billing/usage',
    // POST - Cancel subscription (requires auth)
    CANCEL_SUBSCRIPTION: '/billing/cancel',
  },

  // ============================================
  // MEETINGS ENDPOINTS
  // ============================================
  MEETINGS: {
    // POST - Create scheduled meeting (requires auth)
    CREATE_SCHEDULE: '/meetings/schedules',
    // POST - Join meeting immediately (requires auth)
    JOIN_NOW: '/meetings/join-now',
    // GET - List all meeting instances (requires auth)
    LIST_INSTANCES: '/meetings/instances',
    // Dynamic endpoints
    BY_ID: (id: string) => `/meetings/${id}`,
    RECORDINGS: (id: string) => `/meetings/${id}/recordings`,
    TRANSCRIPTS: (id: string) => `/meetings/${id}/transcripts`,
  },

  // ============================================
  // MEDIA ENDPOINTS
  // ============================================
  MEDIA: {
    // POST - Create presigned upload URL (requires auth)
    CREATE_UPLOAD: '/media/upload/presign',
    // POST - Complete upload and start processing (requires auth)
    COMPLETE_UPLOAD: '/media/upload/complete',
    // POST - Analyze uploaded media (requires auth)
    ANALYZE: (uploadId: string) => `/media/uploads/${uploadId}/analyze`,
    // GET - Get analysis results (requires auth)
    RESULTS: (uploadId: string) => `/media/uploads/${uploadId}/results`,
    // Dynamic endpoints
    BY_ID: (id: string) => `/media/${id}`,
  },

  // ============================================
  // USER ENDPOINTS
  // ============================================
  USERS: {
    BASE: '/users',
    ME: '/users/me',
    BY_ID: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },

  // ============================================
  // ORGANIZATION ENDPOINTS
  // ============================================
  ORGANIZATIONS: {
    BASE: '/organizations',
    BY_ID: (id: string) => `/organizations/${id}`,
    MEMBERS: (id: string) => `/organizations/${id}/members`,
  },

  // ============================================
  // WEBHOOK ENDPOINTS
  // ============================================
  WEBHOOKS: {
    BASE: '/webhooks',
    BY_ID: (id: string) => `/webhooks/${id}`,
    TEST: (id: string) => `/webhooks/${id}/test`,
  },
} as const;

/**
 * Local storage keys for auth tokens
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
} as const;
