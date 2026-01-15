// src/pages/auth/AuthLayout.tsx
// Clean auth layout for login, signup, and related pages

import type { FC, ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
}

/**
 * Auth layout - clean centered card design
 * Uses theme colors for consistent styling
 */
const AuthLayout: FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen bg-page flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-primary">Rolaa.ai</h1>
                </div>

                {/* Card */}
                <div className="bg-card rounded-xl border border-default p-8 shadow-sm">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-semibold text-primary">{title}</h2>
                        {subtitle && (
                            <p className="mt-2 text-sm text-secondary">{subtitle}</p>
                        )}
                    </div>

                    {/* Form content */}
                    {children}
                </div>

                {/* Footer */}
                <div className="text-center mt-6 text-xs text-muted">
                    © 2026 Rolaa.ai. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
