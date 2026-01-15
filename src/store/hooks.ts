// src/store/hooks.ts
// Typed hooks for Redux - use these instead of plain useDispatch and useSelector

import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

/**
 * Typed dispatch hook - always use this instead of plain useDispatch
 * This gives you proper TypeScript support for thunks
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Typed selector hook - always use this instead of plain useSelector
 * This gives you proper TypeScript support for state
 */
export const useAppSelector = useSelector.withTypes<RootState>();
