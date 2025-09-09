'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { XCircle, ArrowLeft, CreditCard, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function PaymentCancelContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planType = searchParams.get('plan');

  const handleRetryPayment = () => {
    // Redirect back to payment page with the same plan
    router.push(`/payment?plan=${planType}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cancel Header */}
        <div className="text-center mb-8">
          <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
          <p className="text-gray-600">
            Your payment was cancelled. No charges have been made to your account.
          </p>
        </div>

        {/* Information Card */}
        <Card className="mb-6 border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-[#6566F1]" />
              What happened?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gray-700">
              <p>Your payment was cancelled. This can happen for several reasons:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>You clicked the back button during payment</li>
                <li>Your bank declined the transaction</li>
                <li>There was a technical issue with the payment processor</li>
                <li>You decided not to complete the payment</li>
              </ul>
              <p className="mt-4">
                <strong>No worries!</strong> You can try again anytime or contact support if you need help.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Plan Information */}
        {planType && (
          <Card className="mb-6 border border-gray-200">
            <CardHeader>
              <CardTitle>Your Selected Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-semibold capitalize">{planType} Plan</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold">
                    ${planType === 'signup' ? '0.01' : planType === 'starter' ? '29.00' : '79.00'} USD
                  </span>
                </div>
                {planType === 'signup' && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> The $0.01 charge for the signup plan is automatically refunded within 24 hours.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleRetryPayment}
            className="flex-1 bg-[#6566F1] hover:bg-[#5A5BD8] text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Payment Again
          </Button>
          <Button
            onClick={() => router.push('/manager-dashboard')}
            variant="outline"
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Support Information */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">Need help with payment?</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button
              variant="ghost"
              onClick={() => router.push('/support')}
              className="text-[#6566F1] hover:text-[#5A5BD8]"
            >
              Contact Support
            </Button>
            <span className="hidden sm:inline text-gray-300">|</span>
            <Button
              variant="ghost"
              onClick={() => router.push('/pricing')}
              className="text-[#6566F1] hover:text-[#5A5BD8]"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#6566F1] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PaymentCancelContent />
    </Suspense>
  );
}
