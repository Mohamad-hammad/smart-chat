'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  ArrowLeft,
  Bot,
  Clock,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentData {
  planType: 'signup' | 'starter' | 'professional';
  botName?: string;
  botDescription?: string;
  amount: number;
  currency: string;
  description: string;
}

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get payment data from URL params
    const planType = searchParams.get('plan') as 'signup' | 'starter' | 'professional';
    const botName = searchParams.get('botName');
    const botDescription = searchParams.get('botDescription');

    if (!planType) {
      setError('Invalid payment request');
      return;
    }

    const plans = {
      signup: {
        amount: 0.01,
        currency: 'USD',
        description: 'Signup Plan - Bot Creation (Refundable)',
        planType: 'signup' as const
      },
      starter: {
        amount: 29.00,
        currency: 'USD',
        description: 'Starter Plan - Monthly',
        planType: 'starter' as const
      },
      professional: {
        amount: 79.00,
        currency: 'USD',
        description: 'Professional Plan - Monthly',
        planType: 'professional' as const
      }
    };

    setPaymentData({
      ...plans[planType],
      botName: botName || undefined,
      botDescription: botDescription || undefined
    });
  }, [searchParams]);

  const handlePayment = async () => {
    if (!paymentData) return;

    setLoading(true);
    setError(null);

    try {
      // Create checkout session
      const response = await fetch('/api/payment/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planType: paymentData.planType,
          botName: paymentData.botName,
          botDescription: paymentData.botDescription,
          amount: paymentData.amount,
          currency: paymentData.currency,
          description: paymentData.description,
        }),
      });

      const { sessionId, error: sessionError } = await response.json();

      if (sessionError) {
        setError(sessionError);
        return;
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        setError('Failed to load payment processor');
        return;
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#6566F1] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Payment</h1>
          <p className="text-gray-600 mt-2">Secure payment powered by Stripe</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bot Details */}
            {paymentData.botName && (
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Bot className="w-5 h-5 mr-2 text-[#6566F1]" />
                    Bot Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-gray-700">Name:</span>
                      <span className="ml-2 text-gray-900">{paymentData.botName}</span>
                    </div>
                    {paymentData.botDescription && (
                      <div>
                        <span className="font-medium text-gray-700">Description:</span>
                        <span className="ml-2 text-gray-900">{paymentData.botDescription}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Summary */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CreditCard className="w-5 h-5 mr-2 text-[#6566F1]" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">{paymentData.description}</span>
                    <span className="font-semibold text-lg">
                      ${paymentData.amount.toFixed(2)} {paymentData.currency.toUpperCase()}
                    </span>
                  </div>
                  
                  {paymentData.planType === 'signup' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">
                            Signup Plan - Refundable Charge
                          </p>
                          <p className="text-sm text-blue-700 mt-1">
                            This $0.01 charge will be automatically refunded within 24 hours after your bot is created.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total</span>
                      <span>${paymentData.amount.toFixed(2)} {paymentData.currency.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-[#6566F1] hover:bg-[#5A5BD8] text-white py-3 text-lg font-medium rounded-xl shadow-lg"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pay ${paymentData.amount.toFixed(2)} {paymentData.currency.toUpperCase()}
                </div>
              )}
            </Button>
          </div>

          {/* Security & Features */}
          <div className="space-y-6">
            {/* Security */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Security & Trust
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  SSL Encrypted Payment
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  PCI DSS Compliant
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Powered by Stripe
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  International Support
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Globe className="w-5 h-5 mr-2 text-[#6566F1]" />
                  Accepted Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <div>💳 Credit Cards</div>
                  <div>🏦 Debit Cards</div>
                  <div>📱 Apple Pay</div>
                  <div>📱 Google Pay</div>
                  <div>🛒 Buy Now, Pay Later</div>
                  <div>🌏 Alipay</div>
                  <div>💬 WeChat Pay</div>
                  <div>🔗 Stripe Link</div>
                </div>
              </CardContent>
            </Card>

            {/* Refund Policy */}
            {paymentData.planType === 'signup' && (
              <Card className="border border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg text-blue-900">
                    <Clock className="w-5 h-5 mr-2" />
                    Refund Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-blue-800">
                  <p className="mb-2">
                    The $0.01 charge for the signup plan is automatically refunded within 24 hours after successful bot creation.
                  </p>
                  <p>
                    This is a verification charge to ensure payment method validity and prevent abuse.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#6566F1] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment details...</p>
        </div>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}
