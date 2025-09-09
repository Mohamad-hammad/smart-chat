import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-08-27.basil',
  typescript: true,
});

export const STRIPE_CONFIG = {
  // Signup plan - $0.01 charge that gets refunded
  SIGNUP_PLAN: {
    price: 1, // $0.01 in cents
    currency: 'usd',
    name: 'Signup Plan - Bot Creation',
    description: 'Create your first bot (refundable)',
    productId: 'prod_T1Oq2owhO3uruq', // Your existing Stripe product
  },
  // Starter plan - $29.00
  STARTER_PLAN: {
    price: 2900, // $29.00 in cents
    currency: 'usd',
    name: 'Starter Plan',
    description: 'Up to 10 users, 3 bots, basic support',
  },
  // Professional plan - $79.00
  PROFESSIONAL_PLAN: {
    price: 7900, // $79.00 in cents
    currency: 'usd',
    name: 'Professional Plan',
    description: 'Up to 50 users, 10 bots, priority support',
  },
};

// Payment methods for international customers
export const PAYMENT_METHODS = [
  'card', // Credit/debit cards
  'klarna', // Buy now, pay later
  'afterpay_clearpay', // Buy now, pay later
  'alipay', // For Asian markets
  'wechat_pay', // For Chinese market
  'google_pay', // Google Pay
  'apple_pay', // Apple Pay
  'link', // Stripe Link
];

// Countries you want to support
export const SUPPORTED_COUNTRIES = [
  'US', 'GB', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'NO', 'DK', 'FI',
  'AT', 'BE', 'CH', 'IE', 'PT', 'LU', 'MT', 'CY', 'EE', 'LV', 'LT', 'SI', 'SK',
  'CZ', 'HU', 'PL', 'RO', 'BG', 'HR', 'GR', 'JP', 'SG', 'HK', 'MY', 'TH', 'PH',
  'ID', 'VN', 'KR', 'TW', 'NZ', 'BR', 'MX', 'AR', 'CL', 'CO', 'PE', 'UY', 'ZA'
];
