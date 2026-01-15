// src/pages/auth/Login.tsx
// Clean login page with email/password and Google login

import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginThunk, selectAuthLoading } from '../../store/slices/authSlice';
import { ROUTES } from '../../config/routes';
import AuthLayout from './AuthLayout';
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectAuthLoading);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const result = await dispatch(loginThunk({ email, password }));
        if (loginThunk.fulfilled.match(result)) {
            navigate(ROUTES.DASHBOARD);
        }
    };

    const handleGoogleLogin = () => {
        // Implement Google OAuth flow
        console.log('Google login clicked');
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to your account to continue"
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
                </div>

                {/* Forgot password link */}
                <div className="text-right">
                    <Link to={ROUTES.FORGOT_PASSWORD} className="text-sm text-link hover:underline">
                        Forgot password?
                    </Link>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 rounded-lg font-medium text-[var(--text-inverse)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? 'Signing in...' : 'Sign in'}
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

                {/* Google login */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full py-2.5 px-4 rounded-lg font-medium border border-default bg-card text-primary hover:bg-[var(--bg-hover)] transition-colors flex items-center justify-center gap-2"
                >
                    <GoogleIcon fontSize="small" />
                    Google
                </button>

                {/* Register link */}
                <p className="text-center text-sm text-secondary mt-6">
                    Don't have an account?{' '}
                    <Link to={ROUTES.REGISTER} className="text-link hover:underline font-medium">
                        Sign up
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Login;
