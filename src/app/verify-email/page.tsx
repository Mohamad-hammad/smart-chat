'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, XCircle, Loader2, ArrowRight, Mail } from 'lucide-react';

interface VerificationResult {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    role: string;
  };
}

type VerificationStatus = 'loading' | 'success' | 'error';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('loading');
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [isResending, setIsResending] = useState(false);

  // Get the correct dashboard URL based on user role
  const getDashboardUrl = (role: string) => {
    switch (role) {
      case 'admin':
        return '/admin-dashboard';
      case 'manager':
        return '/manager-dashboard';
      case 'user':
      default:
        return '/user-dashboard';
    }
  };

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      verifyEmail(token);
    } else {
      setVerificationStatus('error');
    }
  }, [searchParams]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(`/api/auth/verify-email?token=${token}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setVerificationStatus('success');
        setResult(data);
      } else {
        setVerificationStatus('error');
        setResult({
          success: false,
          message: data.error || data.message || 'An error occurred during verification'
        });
      }
    } catch {
      setVerificationStatus('error');
      setResult({
        success: false,
        message: 'An error occurred during verification'
      });
    }
  };

  const resendVerification = async () => {
    if (!result?.user?.email) return;

    setIsResending(true);
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: result.user.email }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        alert('Verification email sent successfully! Please check your inbox.');
      } else {
        alert(data.error || 'Failed to resend verification email');
      }
    } catch {
      alert('An error occurred while resending the verification email');
    } finally {
      setIsResending(false);
    }
  };

  switch (verificationStatus) {
    case 'loading':
      return (
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Verifying Your Email...</h2>
          <p className="text-lg text-gray-600">Please wait while we verify your email address.</p>
        </div>
      );

    case 'success':
      const dashboardUrl = result?.user?.role ? getDashboardUrl(result.user.role) : '/user-dashboard';
      const roleDisplayName = result?.user?.role === 'manager' ? 'Manager' : 
                             result?.user?.role === 'admin' ? 'Admin' : 'User';
      
      return (
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Email Verified Successfully!</h2>
          <p className="text-lg text-gray-600 mb-8">{result?.message}</p>
          
          <div className="space-y-4">
            <Link
              href={dashboardUrl}
              className="inline-flex items-center bg-[#6566F1] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#5A5BD9] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              Continue to {roleDisplayName} Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <div className="text-sm text-gray-500">
              <p>You can now access your {roleDisplayName.toLowerCase()} dashboard and start using ChatBot Pro!</p>
            </div>
          </div>
        </div>
      );

    case 'error':
      return (
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Verification Failed</h2>
          <p className="text-lg text-gray-600 mb-8">{result?.message || 'An error occurred during verification'}</p>
          
          {result?.user?.email && (
            <div className="space-y-4">
              <button
                onClick={resendVerification}
                disabled={isResending}
                className="inline-flex items-center bg-[#6566F1] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#5A5BD9] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isResending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5 mr-2" />
                    Resend Verification Email
                  </>
                )}
              </button>
              <div className="text-sm text-gray-500">
                <p>Click the button above to receive a new verification email.</p>
              </div>
            </div>
          )}
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Need help? Contact our support team:</p>
            <Link
              href="/contact"
              className="inline-flex items-center text-[#6566F1] hover:text-[#5A5BD9] font-medium transition-colors"
            >
              Contact Support
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      );

    default:
      return null;
  }
}

const VerifyEmailPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-[#6566F1] to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Email Verification</h1>
          </div>
          
          <Suspense fallback={
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Loading...</h2>
              <p className="text-lg text-gray-600">Please wait...</p>
            </div>
          }>
            <VerifyEmailContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
