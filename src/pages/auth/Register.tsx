// src/pages/auth/Register.tsx
// Clean registration page with form validation

import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerThunk, selectAuthLoading } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';
import { ROUTES } from '../../config/routes';
import AuthLayout from './AuthLayout';
import GoogleIcon from '@mui/icons-material/Google';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectAuthLoading);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate passwords match
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        // Validate password strength
        if (password.length < 8) {
            toast.error('Password must be at least 8 characters');
            return;
        }

        const result = await dispatch(registerThunk({
            email,
            password,
            name: fullName
        }));

        if (registerThunk.fulfilled.match(result)) {
            // Redirect to email verification
            navigate(ROUTES.LOGIN); // Or a verify email page
        }
    };

    const handleGoogleSignup = () => {
        // Implement Google OAuth flow
        console.log('Google signup clicked');
    };

    return (
        <AuthLayout
            title="Create an account"
            subtitle="Start your free trial today"
        >
            <form onSubmit={handleSubmit} className="space-y-4">


                {/* Full name field */}
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-primary mb-1.5">
                        Full name
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                            <PersonIcon fontSize="small" />
                        </span>
                        <input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="John Doe"
                            required
                            className="w-full pl-10 pr-4 py-2.5 border border-default rounded-lg bg-surface text-primary placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)] transition-all"
                        />
                    </div>
                </div>

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

                {/* Password field */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-primary mb-1.5">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        Confirm password
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
                    {isLoading ? 'Creating account...' : 'Create account'}
                </button>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-default"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-card text-muted">or continue with</span>
                    </div>
                </div>

                {/* Google signup */}
                <button
                    type="button"
                    onClick={handleGoogleSignup}
                    className="w-full py-2.5 px-4 rounded-lg font-medium border border-default bg-card text-primary hover:bg-[var(--bg-hover)] transition-colors flex items-center justify-center gap-2"
                >
                    <GoogleIcon fontSize="small" />
                    Google
                </button>

                {/* Login link */}
                <p className="text-center text-sm text-secondary mt-6">
                    Already have an account?{' '}
                    <Link to={ROUTES.LOGIN} className="text-link hover:underline font-medium">
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Register;
