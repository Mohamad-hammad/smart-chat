# Stripe Payment Integration Setup Guide

This guide will help you set up Stripe payments for your Smart Chat application, specifically for international customers in US, UK, and other supported countries.

## 🚀 Quick Start

### 1. Create Stripe Account
1. Go to [stripe.com](https://stripe.com) and create an account
2. Complete your business verification (required for live payments)
3. Switch to **Test Mode** for development

### 2. Get Your API Keys
1. Go to [Stripe Dashboard > Developers > API Keys](https://dashboard.stripe.com/apikeys)
2. Copy your **Publishable Key** (starts with `pk_test_`)
3. Copy your **Secret Key** (starts with `sk_test_`)

### 3. Set Up Environment Variables
Add these to your `.env.local` file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Application URL (for webhooks)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🌍 International Payment Setup

### Supported Countries
The integration supports payments from:
- **North America**: US, CA
- **Europe**: GB, DE, FR, IT, ES, NL, SE, NO, DK, FI, AT, BE, CH, IE, PT, LU, MT, CY, EE, LV, LT, SI, SK, CZ, HU, PL, RO, BG, HR, GR
- **Asia Pacific**: JP, SG, HK, MY, TH, PH, ID, VN, KR, TW, NZ
- **Latin America**: BR, MX, AR, CL, CO, PE, UY
- **Africa**: ZA

### Payment Methods
- 💳 Credit/Debit Cards (Visa, Mastercard, American Express)
- 📱 Apple Pay & Google Pay
- 🛒 Buy Now, Pay Later (Klarna, Afterpay)
- 🌏 Regional methods (Alipay, WeChat Pay)
- 🔗 Stripe Link

## 🔧 Webhook Setup

### 1. Create Webhook Endpoint
1. Go to [Stripe Dashboard > Developers > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. Set URL to: `https://yourdomain.com/api/webhooks/stripe`
4. Select these events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

### 2. Get Webhook Secret
1. After creating the webhook, click on it
2. Go to **"Signing secret"** section
3. Copy the secret (starts with `whsec_`)
4. Add it to your environment variables

## 💰 Payment Flow

### Free Plan ($1 Refundable)
1. User creates a bot
2. Redirected to payment page
3. Charged $1.00 (refunded within 24 hours)
4. Bot is created after successful payment
5. Automatic refund processed

### Professional Plan ($99.99/month)
1. User selects professional plan
2. Charged $99.99 monthly
3. Full access to all features

### Enterprise Plan ($299.99/month)
1. User selects enterprise plan
2. Charged $299.99 monthly
3. Unlimited features and priority support

## 🛠️ Development Testing

### Test Cards
Use these test card numbers:

```
# Successful payments
4242424242424242 - Visa
4000056655665556 - Visa (debit)
5555555555554444 - Mastercard
378282246310005 - American Express

# Declined payments
4000000000000002 - Card declined
4000000000009995 - Insufficient funds
4000000000009987 - Lost card
```

### Test Scenarios
1. **Successful Payment**: Use `4242424242424242`
2. **Declined Payment**: Use `4000000000000002`
3. **3D Secure**: Use `4000002500003155`
4. **International**: Use any test card with different billing countries

## 🚀 Production Deployment

### 1. Switch to Live Mode
1. In Stripe Dashboard, toggle **"Test mode"** off
2. Get your live API keys
3. Update environment variables with live keys

### 2. Update Webhook URL
1. Update webhook endpoint to production URL
2. Test webhook delivery
3. Monitor webhook logs

### 3. Enable International Payments
1. Go to [Stripe Dashboard > Settings > Payment methods](https://dashboard.stripe.com/settings/payment_methods)
2. Enable required payment methods for your target countries
3. Configure tax settings if needed

## 📊 Monitoring & Analytics

### Stripe Dashboard
- Monitor payments in real-time
- View customer data and analytics
- Handle disputes and refunds
- Generate financial reports

### Application Logs
- Payment success/failure logs
- Webhook processing logs
- Refund processing logs
- Error tracking

## 🔒 Security Best Practices

### 1. Environment Variables
- Never commit API keys to version control
- Use different keys for development/production
- Rotate keys regularly

### 2. Webhook Security
- Always verify webhook signatures
- Use HTTPS for webhook endpoints
- Implement idempotency for webhook handlers

### 3. PCI Compliance
- Never store card details
- Use Stripe's secure tokenization
- Follow PCI DSS guidelines

## 🐛 Troubleshooting

### Common Issues

#### 1. "Invalid API Key"
- Check if you're using the correct key (test vs live)
- Verify the key is properly set in environment variables

#### 2. "Webhook signature verification failed"
- Ensure webhook secret is correct
- Check if webhook URL is accessible
- Verify webhook events are properly configured

#### 3. "Payment declined"
- Check if test cards are being used correctly
- Verify billing address requirements
- Check if 3D Secure is required

#### 4. "Refund not processed"
- Check webhook processing logs
- Verify refund logic in webhook handler
- Check Stripe dashboard for refund status

### Debug Mode
Enable debug logging by adding to your environment:
```bash
STRIPE_DEBUG=true
```

## 📞 Support

### Stripe Support
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)
- [Stripe Community](https://github.com/stripe/stripe-node)

### Application Support
- Check application logs
- Monitor webhook delivery
- Test with Stripe CLI

## 🎯 Next Steps

1. **Test the integration** with test cards
2. **Set up monitoring** and alerting
3. **Configure tax settings** for your target countries
4. **Set up customer support** for payment issues
5. **Monitor performance** and optimize as needed

## 📋 Checklist

- [ ] Stripe account created and verified
- [ ] API keys obtained and configured
- [ ] Webhook endpoint created and tested
- [ ] Test payments working
- [ ] International payment methods enabled
- [ ] Production deployment ready
- [ ] Monitoring and alerting set up
- [ ] Customer support process established

---

**Note**: This integration is specifically designed for international customers and includes support for multiple payment methods and currencies. The $1 free plan charge helps prevent abuse while providing a seamless user experience.
