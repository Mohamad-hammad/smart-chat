'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Bot, ArrowRight, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sessionData, setSessionData] = useState<{
    id: string;
    payment_status: string;
    metadata: {
      botName?: string;
      planType?: string;
    };
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sessionId = searchParams.get('session_id');
  const planType = searchParams.get('plan');

  useEffect(() => {
    if (!sessionId) {
      setError('Invalid session');
      setLoading(false);
      return;
    }

    // Verify payment with backend
    const verifyPayment = async () => {
      try {
        const response = await fetch(`/api/payment/verify-session?session_id=${sessionId}`);
        const data = await response.json();

        if (response.ok) {
          setSessionData(data);
        } else {
          setError(data.error || 'Payment verification failed');
        }
      } catch (err) {
        setError('Failed to verify payment');
        console.error('Payment verification error:', err);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#6566F1] mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">✗</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Verification Failed</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => router.push('/manager-dashboard')} className="bg-[#6566F1] hover:bg-[#5A5BD8]">
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const isSignupPlan = planType === 'signup';
  const botName = sessionData?.metadata?.botName;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">
            {isSignupPlan 
              ? 'Your bot is being created and your refund will be processed shortly.'
              : 'Your subscription is now active.'
            }
          </p>
        </div>

        {/* Payment Details */}
        <Card className="mb-6 border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-[#6566F1]" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-semibold">
                  ${isSignupPlan ? '0.01' : '29.00'} USD
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-semibold">
                  Card
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-mono text-sm">{sessionId?.slice(-8)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bot Creation Status */}
        {botName && (
          <Card className="mb-6 border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="w-5 h-5 mr-2 text-[#6566F1]" />
                Bot Creation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-gray-700">Bot &quot;{botName}&quot; is being created...</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-gray-700">AI training in progress...</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="text-gray-700">Configuration setup...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Refund Information for Signup Plan */}
        {isSignupPlan && (
          <Card className="mb-6 border border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-900">Refund Information</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-800">
              <div className="space-y-2">
                <p className="font-medium">Your $0.01 will be automatically refunded within 24 hours.</p>
                <p className="text-sm">
                  This charge was used to verify your payment method. The refund will appear in your account 
                  within 3-5 business days depending on your bank.
                </p>
                <div className="mt-3 p-3 bg-blue-100 rounded-lg">
                  <p className="text-sm font-medium">Why do we charge $0.01?</p>
                  <ul className="text-xs mt-1 space-y-1">
                    <li>• Prevents abuse and spam bot creation</li>
                    <li>• Verifies payment method validity</li>
                    <li>• Ensures only legitimate users create bots</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        <Card className="mb-6 border border-gray-200">
          <CardHeader>
            <CardTitle>What&apos;s Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-[#6566F1] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                <div>
                  <p className="font-medium">Bot Creation</p>
                  <p className="text-sm text-gray-600">Your bot will be ready in 2-3 minutes</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#6566F1] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                <div>
                  <p className="font-medium">Email Confirmation</p>
                  <p className="text-sm text-gray-600">You&apos;ll receive setup instructions via email</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-[#6566F1] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                <div>
                  <p className="font-medium">Start Using</p>
                  <p className="text-sm text-gray-600">Access your bot from the dashboard</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => router.push('/manager-dashboard')}
            className="flex-1 bg-[#6566F1] hover:bg-[#5A5BD8] text-white"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            onClick={() => router.push('/manager-dashboard/manager-bots')}
            variant="outline"
            className="flex-1"
          >
            View My Bots
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#6566F1] mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
