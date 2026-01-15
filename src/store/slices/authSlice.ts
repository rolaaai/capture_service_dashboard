// src/store/slices/authSlice.ts
// Authentication slice with actions, reducers, and thunks

import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../../utils/api';
import { API_ENDPOINTS } from '../../config/api.config';
import { tokenStorage } from '../../utils/api';
import toast from 'react-hot-toast';

/**
 * User interface - adjust based on your API response
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'super_admin';
  organizationId?: string;
  createdAt?: string;
}

/**
 * Auth state interface
 */
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Initial state
 */
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

/**
 * Login credentials interface
 */
interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Register data interface
 */
interface RegisterData {
  email: string;
  password: string;
  name: string;
  organizationName?: string;
}

/**
 * Login response interface
 */
interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// ============================================
// ASYNC THUNKS
// ============================================

/**
 * Login thunk
 */
export const loginThunk = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    
    // Store tokens
    tokenStorage.setAccessToken(response.accessToken);
    tokenStorage.setRefreshToken(response.refreshToken);
    
    toast.success('Login successful!');
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed';
    return rejectWithValue(message);
  }
});

/**
 * Register thunk
 */
export const registerThunk = createAsyncThunk<
  AuthResponse,
  RegisterData,
  { rejectValue: string }
>('auth/register', async (data, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    
    // Store tokens
    tokenStorage.setAccessToken(response.accessToken);
    tokenStorage.setRefreshToken(response.refreshToken);
    
    toast.success('Registration successful!');
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Registration failed';
    return rejectWithValue(message);
  }
});

/**
 * Logout thunk
 */
export const logoutThunk = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
      tokenStorage.clearAll();
      toast.success('Logged out successfully');
    } catch (error) {
      // Clear tokens even if API call fails
      tokenStorage.clearAll();
      const message = error instanceof Error ? error.message : 'Logout failed';
      return rejectWithValue(message);
    }
  }
);

/**
 * Get current user thunk
 */
export const getCurrentUserThunk = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>('auth/getCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const user = await apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
    return user;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get user';
    return rejectWithValue(message);
  }
});

// ============================================
// SLICE
// ============================================

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Sync actions
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
      });
    
    // Register
    builder
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Registration failed';
      });
    
    // Logout
    builder
      .addCase(logoutThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
    
    // Get current user
    builder
      .addCase(getCurrentUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to get user';
      });
  },
});

// Export actions
export const { clearError, setUser, clearAuth } = authSlice.actions;

// Export selectors
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

// Export reducer
export default authSlice.reducer;
