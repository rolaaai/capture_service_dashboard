// src/pages/auth/ForgotPassword.tsx
// Clean forgot password page with email input

import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../../utils/api';
import { API_ENDPOINTS } from '../../config/api.config';
import { ROUTES } from '../../config/routes';
import AuthLayout from './AuthLayout';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
            setIsSubmitted(true);
            toast.success('Reset instructions sent to your email');
        } catch (error) {
            // Error is handled by API interceptor
            console.error('Forgot password error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <AuthLayout
                title="Check your email"
                subtitle={`We've sent a verification code to ${email}`}
            >
                <div className="space-y-4">
                    <p className="text-center text-sm text-secondary">
                        Enter the code we sent you to reset your password.
                    </p>

                    <button
                        onClick={() => navigate(ROUTES.LOGIN, { state: { email } })}
                        className="w-full py-2.5 px-4 rounded-lg font-medium text-[var(--text-inverse)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors"
                    >
                        Enter verification code
                    </button>

                    <p className="text-center text-sm text-muted">
                        Didn't receive the email?{' '}
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-link hover:underline"
                        >
                            Click to resend
                        </button>
                    </p>

                    <Link
                        to={ROUTES.LOGIN}
                        className="flex items-center justify-center gap-1 text-sm text-secondary hover:text-primary transition-colors"
                    >
                        <ArrowBackIcon fontSize="small" />
                        Back to login
                    </Link>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="Forgot password?"
            subtitle="No worries, we'll send you reset instructions"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-1.5">
                        Email
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                            <EmailIcon fontSize="small" />
                        </span>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full pl-10 pr-4 py-2.5 border border-default rounded-lg bg-surface text-primary placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)] transition-all"
                        />
                    </div>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 rounded-lg font-medium text-[var(--text-inverse)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? 'Sending...' : 'Send reset instructions'}
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

export default ForgotPassword;
