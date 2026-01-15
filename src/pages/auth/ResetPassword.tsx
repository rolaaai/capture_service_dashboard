// src/pages/auth/ResetPassword.tsx
// Reset password page with OTP verification

import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { apiClient } from '../../utils/api';
import { API_ENDPOINTS } from '../../config/api.config';
import { ROUTES } from '../../config/routes';
import AuthLayout from './AuthLayout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const emailFromState = (location.state as { email?: string })?.email || '';

    const [email, setEmail] = useState(emailFromState);
    const [otpCode, setOtpCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (newPassword.length < 8) {
            toast.error('Password must be at least 8 characters');
            return;
        }

        setIsLoading(true);

        try {
            await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
                email,
                otp_code: otpCode,
                new_password: newPassword,
            });

            setIsSuccess(true);
            toast.success('Password reset successful!');
        } catch (err) {
            console.error('Reset password error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <AuthLayout
                title="Password reset"
                subtitle="Your password has been successfully reset"
            >
                <div className="space-y-4 text-center">
                    <div className="flex justify-center">
                        <CheckCircleIcon
                            style={{ fontSize: 64, color: 'var(--color-success)' }}
                        />
                    </div>

                    <p className="text-sm text-secondary">
                        You can now sign in with your new password.
                    </p>

                    <button
                        onClick={() => navigate(ROUTES.LOGIN)}
                        className="w-full py-2.5 px-4 rounded-lg font-medium text-[var(--text-inverse)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors"
                    >
                        Go to login
                    </button>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="Reset password"
            subtitle="Enter the code and your new password"
        >
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email field (if not from state) */}
                {!emailFromState && (
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-primary mb-1.5">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full px-4 py-2.5 border border-default rounded-lg bg-surface text-primary placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)] transition-all"
                        />
                    </div>
                )}

                {/* OTP code field */}
                <div>
                    <label htmlFor="otpCode" className="block text-sm font-medium text-primary mb-1.5">
                        Verification code
                    </label>
                    <input
                        id="otpCode"
                        type="text"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="123456"
                        required
                        maxLength={6}
                        className="w-full px-4 py-2.5 border border-default rounded-lg bg-surface text-primary placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)] transition-all text-center text-xl tracking-widest"
                    />
                </div>

                {/* New password field */}
                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-primary mb-1.5">
                        New password
                    </label>
                    <div className="relative">
                        <input
                            id="newPassword"
                            type={showPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            minLength={8}
                            className="w-full pl-4 pr-10 py-2.5 border border-default rounded-lg bg-surface text-primary placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)] transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-secondary transition-colors"
                        >
                            {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                        </button>
                    </div>
                    <p className="mt-1 text-xs text-muted">Must be at least 8 characters</p>
                </div>

                {/* Confirm password field */}
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary mb-1.5">
                        Confirm new password
                    </label>
                    <input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full px-4 py-2.5 border border-default rounded-lg bg-surface text-primary placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)] transition-all"
                    />
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 rounded-lg font-medium text-[var(--text-inverse)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? 'Resetting...' : 'Reset password'}
                </button>

                {/* Back to login */}
                <Link
                    to={ROUTES.LOGIN}
                    className="flex items-center justify-center gap-1 text-sm text-secondary hover:text-primary transition-colors mt-4"
                >
                    <ArrowBackIcon fontSize="small" />
                    Back to login
                </Link>
            </form>
        </AuthLayout>
    );
};

export default ResetPassword;
