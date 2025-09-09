'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const ProductDisplay = () => {
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      // Create checkout session
      const response = await fetch('/api/payment/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType: 'signup',
          botName: 'Test Bot',
          botDescription: 'A test bot created via payment integration',
          amount: 0.01,
          currency: 'USD',
          description: 'Signup Plan - Bot Creation (Refundable)',
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        console.error('Error creating checkout session:', error);
        return;
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        console.error('Failed to load Stripe');
        return;
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        console.error('Stripe error:', stripeError);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="max-w-md mx-auto">
        <Card className="border border-gray-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-[#6566F1] to-[#7F82F3] rounded-2xl flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Signup Plan</CardTitle>
            <p className="text-3xl font-bold text-[#6566F1] mt-2">$0.01 / test</p>
            <p className="text-sm text-gray-600 mt-2">
              Signup Plan - Bot Creation (Refundable)
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Test Payment Integration
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    This $0.01 charge will be automatically refunded within 24 hours.
                  </p>
                </div>
              </div>
            </div>
            
            <Button
              onClick={handleCheckout}
              className="w-full bg-[#6566F1] hover:bg-[#5A5BD8] text-white py-3 text-lg font-medium rounded-xl shadow-lg"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Test Checkout
            </Button>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Powered by Stripe • Secure Payment
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const SuccessDisplay = ({ sessionId }: { sessionId: string }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="max-w-md mx-auto">
        <Card className="border border-gray-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Payment Successful!
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Your test payment was processed successfully.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                <strong>Session ID:</strong> {sessionId.slice(-8)}
              </p>
              <p className="text-sm text-green-700 mt-1">
                Your bot will be created and the $1 charge will be refunded within 24 hours.
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => router.push('/manager-dashboard')}
                className="w-full bg-[#6566F1] hover:bg-[#5A5BD8] text-white"
              >
                Go to Dashboard
              </Button>
              <Button
                onClick={() => router.push('/test-payment')}
                variant="outline"
                className="w-full"
              >
                Test Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Message = ({ message }: { message: string }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
    <div className="max-w-md mx-auto">
      <Card className="border border-gray-200 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Payment Cancelled
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center">{message}</p>
        </CardContent>
      </Card>
    </div>
  </div>
);

function TestPaymentContent() {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const success = searchParams.get('success');
    const session_id = searchParams.get('session_id');
    const canceled = searchParams.get('canceled');

    if (success && session_id) {
      setSuccess(true);
      setSessionId(session_id);
    }

    if (canceled) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [searchParams]);

  if (!success && message === '') {
    return <ProductDisplay />;
  } else if (success && sessionId !== '') {
    return <SuccessDisplay sessionId={sessionId} />;
  } else {
    return <Message message={message} />;
  }
}

export default function TestPaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#6566F1] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <TestPaymentContent />
    </Suspense>
  );
}


