// src/config/routes.ts
// Centralized route configuration for easy maintenance

import type { ComponentType, LazyExoticComponent } from 'react';

/**
 * Route path constants - single source of truth for all paths
 * Add new routes here and they'll be available throughout the app
 */
export const ROUTES = {
  // Main routes
  HOME: '/',
  DASHBOARD: '/dashboard',
  
  // Explorer routes
  EXPLORER: '/explorer',
  EXPLORER_BOT: '/explorer/bot',
  EXPLORER_LOGS: '/explorer/logs',
  EXPLORER_WEBHOOKS: '/explorer/webhooks',
  
  // Settings routes
  SETTINGS: '/settings',
  SETTINGS_MEETING_BOT: '/settings/meeting-bot',
  SETTINGS_CALENDAR: '/settings/calendar',
  SETTINGS_TRANSCRIPTION: '/settings/transcription',
  SETTINGS_DESKTOP_RECORDING: '/settings/desktop-recording',
  
  // Account routes
  PRICING: '/pricing',
  UPGRADE: '/upgrade',
  
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  
  // Error routes
  NOT_FOUND: '/404',
} as const;

// Type for route keys
export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];

/**
 * Route configuration interface
 * Makes it easy to add metadata to routes
 */
export interface RouteConfig {
  path: string;
  title: string;
  // Component can be lazy loaded
  component?: LazyExoticComponent<ComponentType<unknown>> | ComponentType<unknown>;
  // Whether route requires authentication
  requiresAuth?: boolean;
  // Layout to use (if different from default)
  layout?: 'default' | 'auth' | 'blank';
  // Child routes for nested routing
  children?: RouteConfig[];
}

/**
 * Route configurations - add route metadata here
 * Components are added when setting up the router
 */
export const routeConfigs: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    title: 'Home',
    requiresAuth: false,
    layout: 'default',
  },
  {
    path: ROUTES.DASHBOARD,
    title: 'Dashboard',
    requiresAuth: true,
    layout: 'default',
  },
  {
    path: ROUTES.EXPLORER,
    title: 'Explorer',
    requiresAuth: true,
    layout: 'default',
    children: [
      {
        path: ROUTES.EXPLORER_BOT,
        title: 'Bot',
        requiresAuth: true,
      },
      {
        path: ROUTES.EXPLORER_LOGS,
        title: 'Logs',
        requiresAuth: true,
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    title: 'Login',
    requiresAuth: false,
    layout: 'auth',
  },
  {
    path: ROUTES.REGISTER,
    title: 'Register',
    requiresAuth: false,
    layout: 'auth',
  },
];

/**
 * Helper function to get route by key with type safety
 */
export const getRoute = (key: RouteKey): string => ROUTES[key];

/**
 * Helper to build dynamic routes with parameters
 * Example: buildRoute('/users/:id', { id: '123' }) => '/users/123'
 */
export const buildRoute = (
  path: string,
  params: Record<string, string | number>
): string => {
  let result = path;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`:${key}`, String(value));
  });
  return result;
};

/**
 * Get breadcrumb items for a given path
 */
export const getBreadcrumbs = (path: string): { label: string; path: string }[] => {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs: { label: string; path: string }[] = [];
  
  let currentPath = '';
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const config = routeConfigs.find((r) => r.path === currentPath);
    breadcrumbs.push({
      label: config?.title || segment.charAt(0).toUpperCase() + segment.slice(1),
      path: currentPath,
    });
  });
  
  return breadcrumbs;
};
