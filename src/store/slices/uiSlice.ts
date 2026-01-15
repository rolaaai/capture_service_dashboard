// src/store/slices/uiSlice.ts
// UI state slice for managing global UI state

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Modal configuration
 */
interface ModalConfig {
  id: string;
  title?: string;
  data?: unknown;
}

/**
 * UI State interface
 */
interface UIState {
  // Sidebar state
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  
  // Modal state
  activeModal: ModalConfig | null;
  
  // Loading overlay
  globalLoading: boolean;
  loadingMessage: string | null;
  
  // Theme
  theme: 'light' | 'dark' | 'system';
  
  // Breadcrumbs
  breadcrumbs: { label: string; path: string }[];
}

/**
 * Initial state
 */
const initialState: UIState = {
  sidebarOpen: false,
  sidebarCollapsed: false,
  activeModal: null,
  globalLoading: false,
  loadingMessage: null,
  theme: 'light',
  breadcrumbs: [],
};

// ============================================
// SLICE
// ============================================

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Sidebar actions
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    toggleSidebarCollapse: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    
    // Modal actions
    openModal: (state, action: PayloadAction<ModalConfig>) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
    
    // Loading actions
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
    setLoadingWithMessage: (state, action: PayloadAction<string | null>) => {
      state.globalLoading = action.payload !== null;
      state.loadingMessage = action.payload;
    },
    
    // Theme actions
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
    
    // Breadcrumb actions
    setBreadcrumbs: (state, action: PayloadAction<{ label: string; path: string }[]>) => {
      state.breadcrumbs = action.payload;
    },
    clearBreadcrumbs: (state) => {
      state.breadcrumbs = [];
    },
  },
});

// Export actions
export const {
  toggleSidebar,
  setSidebarOpen,
  toggleSidebarCollapse,
  setSidebarCollapsed,
  openModal,
  closeModal,
  setGlobalLoading,
  setLoadingWithMessage,
  setTheme,
  setBreadcrumbs,
  clearBreadcrumbs,
} = uiSlice.actions;

// Export selectors
export const selectSidebarOpen = (state: { ui: UIState }) => state.ui.sidebarOpen;
export const selectSidebarCollapsed = (state: { ui: UIState }) => state.ui.sidebarCollapsed;
export const selectActiveModal = (state: { ui: UIState }) => state.ui.activeModal;
export const selectGlobalLoading = (state: { ui: UIState }) => state.ui.globalLoading;
export const selectLoadingMessage = (state: { ui: UIState }) => state.ui.loadingMessage;
export const selectTheme = (state: { ui: UIState }) => state.ui.theme;
export const selectBreadcrumbs = (state: { ui: UIState }) => state.ui.breadcrumbs;

// Export reducer
export default uiSlice.reducer;
