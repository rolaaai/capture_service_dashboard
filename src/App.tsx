// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ROUTES } from './config/routes';
import Dashboard from './pages/dashboard/Dashboard';
import { Login, Register, ForgotPassword, ResetPassword, VerifyEmail } from './pages/auth';

/**
 * Toast configuration - positioned top-right as requested
 */
const toastOptions = {
  duration: 4000,
  style: {
    background: 'var(--bg-card)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-default)',
  },
  success: {
    iconTheme: {
      primary: 'var(--color-success)',
      secondary: 'var(--bg-card)',
    },
  },
  error: {
    iconTheme: {
      primary: 'var(--color-error)',
      secondary: 'var(--bg-card)',
    },
  },
};

function App() {
  return (
    <BrowserRouter>
      {/* Toast notifications - top-right position */}
      <Toaster
        position="top-right"
        toastOptions={toastOptions}
        containerStyle={{
          top: 20,
          right: 20,
        }}
      />

      {/* Routes */}
      <Routes>
        {/* Auth routes */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Dashboard */}
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />

        {/* Explorer routes */}
        <Route path={ROUTES.EXPLORER_BOT} element={<Dashboard />} />

        {/* Default route redirects to login */}
        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.LOGIN} replace />} />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

