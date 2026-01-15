// src/pages/auth/VerifyEmail.tsx
// Email verification page with OTP input

import { useState, type FormEvent, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../utils/api';
import { API_ENDPOINTS } from '../../config/api.config';
import { ROUTES } from '../../config/routes';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/slices/authSlice';
import AuthLayout from './AuthLayout';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Focus first input on mount
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newOtp = [...otp];
        pastedData.split('').forEach((char, i) => {
            if (i < 6) newOtp[i] = char;
        });
        setOtp(newOtp);
        inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join('');

        if (otpCode.length !== 6) {
            toast.error('Please enter the complete verification code');
            return;
        }

        setIsLoading(true);

        try {
            await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { otp_code: otpCode });
            setIsVerified(true);
            toast.success('Email verified successfully!');
        } catch (error) {
            console.error('Verify email error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        try {
            // Resend verification email - implement as needed
            toast.success('Verification code resent');
        } catch (error) {
            console.error('Resend code error:', error);
        }
    };

    if (isVerified) {
        return (
            <AuthLayout
                title="Email verified"
                subtitle="Your email has been successfully verified"
            >
                <div className="space-y-4 text-center">
                    <div className="flex justify-center">
                        <CheckCircleIcon
                            style={{ fontSize: 64, color: 'var(--color-success)' }}
                        />
                    </div>

                    <p className="text-sm text-secondary">
                        You can now access all features of your account.
                    </p>

                    <button
                        onClick={() => navigate(ROUTES.DASHBOARD)}
                        className="w-full py-2.5 px-4 rounded-lg font-medium text-[var(--text-inverse)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors"
                    >
                        Go to dashboard
                    </button>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="Verify your email"
            subtitle={`Enter the code we sent to ${user?.email || 'your email'}`}
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* OTP inputs */}
                <div className="flex justify-center gap-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => { inputRefs.current[index] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            className="w-12 h-14 text-center text-xl font-semibold border border-default rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)] transition-all"
                        />
                    ))}
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isLoading || otp.some(d => !d)}
                    className="w-full py-2.5 px-4 rounded-lg font-medium text-[var(--text-inverse)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? 'Verifying...' : 'Verify email'}
                </button>

                {/* Resend code */}
                <p className="text-center text-sm text-muted">
                    Didn't receive the code?{' '}
                    <button
                        type="button"
                        onClick={handleResendCode}
                        className="text-link hover:underline"
                    >
                        Resend
                    </button>
                </p>
            </form>
        </AuthLayout>
    );
};

export default VerifyEmail;
