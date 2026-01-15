// src/store/index.ts
// Redux store configuration

import { configureStore, combineReducers } from '@reduxjs/toolkit';

// Import slices here as you create them
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

/**
 * Root reducer - combine all slices here
 * Add new reducers as you create them
 */
const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  // Add more reducers here:
  // users: usersReducer,
  // bots: botsReducer,
  // meetings: meetingsReducer,
});

/**
 * Configure and create the store
 */
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types if needed
        ignoredActions: [],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: [],
      },
    }),
  devTools: import.meta.env.DEV, // Enable Redux DevTools in development
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
