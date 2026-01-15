// src/utils/api.ts
// Reusable API utility with axios interceptors

import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import toast from 'react-hot-toast';
import { API_CONFIG, STORAGE_KEYS } from '../config/api.config';

/**
 * API Response wrapper for consistent response handling
 */
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
  statusCode: number;
}

/**
 * API Error interface for consistent error handling
 */
export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

/**
 * Token storage helpers
 */
export const tokenStorage = {
  getAccessToken: (): string | null => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
  setAccessToken: (token: string): void => localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token),
  removeAccessToken: (): void => localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN),
  
  getRefreshToken: (): string | null => localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
  setRefreshToken: (token: string): void => localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token),
  removeRefreshToken: (): void => localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN),
  
  clearAll: (): void => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};

/**
 * Create axios instance with default config
 */
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.HEADERS,
  });

  // Request interceptor - add auth token
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = tokenStorage.getAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor - handle errors globally
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError<ApiError>) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
      
      // Handle specific status codes
      if (error.response) {
        const { status, data } = error.response;
        
        // Unauthorized - try to refresh token
        if (status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const refreshToken = tokenStorage.getRefreshToken();
            if (refreshToken) {
              // Attempt to refresh the token
              const response = await axios.post(
                `${API_CONFIG.BASE_URL}/auth/refresh`,
                { refreshToken }
              );
              
              const { accessToken } = response.data;
              tokenStorage.setAccessToken(accessToken);
              
              // Retry original request
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              }
              return instance(originalRequest);
            }
          } catch {
            // Refresh failed - clear tokens and redirect to login
            tokenStorage.clearAll();
            window.location.href = '/login';
          }
        }
        
        // Forbidden
        if (status === 403) {
          toast.error('You do not have permission to perform this action');
        }
        
        // Not found
        if (status === 404) {
          toast.error(data?.message || 'Resource not found');
        }
        
        // Validation errors
        if (status === 422 && data?.errors) {
          const errorMessages = Object.values(data.errors).flat();
          errorMessages.forEach((msg) => toast.error(msg));
        }
        
        // Server error
        if (status >= 500) {
          toast.error('Server error. Please try again later.');
        }
      } else if (error.request) {
        // Network error
        toast.error('Network error. Please check your connection.');
      }
      
      return Promise.reject(error);
    }
  );

  return instance;
};

// Export singleton instance
export const api = createApiInstance();

/**
 * Generic API methods with type safety
 */
export const apiClient = {
  /**
   * GET request
   */
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.get<T>(url, config);
    return response.data;
  },

  /**
   * POST request
   */
  post: async <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.post<T>(url, data, config);
    return response.data;
  },

  /**
   * PUT request
   */
  put: async <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.put<T>(url, data, config);
    return response.data;
  },

  /**
   * PATCH request
   */
  patch: async <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.patch<T>(url, data, config);
    return response.data;
  },

  /**
   * DELETE request
   */
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.delete<T>(url, config);
    return response.data;
  },
};

export default api;
