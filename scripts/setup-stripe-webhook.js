#!/usr/bin/env node

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function setupWebhook() {
  try {
    console.log('🔧 Setting up Stripe webhook...');
    
    // Create webhook endpoint
    const webhook = await stripe.webhooks.create({
      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/stripe`,
      enabled_events: [
        'checkout.session.completed',
        'payment_intent.succeeded',
        'payment_intent.payment_failed',
      ],
    });

    console.log('✅ Webhook created successfully!');
    console.log('📋 Webhook Details:');
    console.log(`   ID: ${webhook.id}`);
    console.log(`   URL: ${webhook.url}`);
    console.log(`   Secret: ${webhook.secret}`);
    
    console.log('\n🔑 Add this to your .env.local file:');
    console.log(`STRIPE_WEBHOOK_SECRET=${webhook.secret}`);
    
    console.log('\n🧪 Test your webhook:');
    console.log(`curl -X POST ${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/stripe/test`);
    
  } catch (error) {
    console.error('❌ Error setting up webhook:', error.message);
  }
}

// Check if required environment variables are set
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY is not set in environment variables');
  process.exit(1);
}

if (!process.env.NEXT_PUBLIC_APP_URL) {
  console.error('❌ NEXT_PUBLIC_APP_URL is not set in environment variables');
  process.exit(1);
}

setupWebhook();
