# 🧪 Payment Testing Guide

This guide helps you test the Stripe payment integration in your development environment.

## 🚀 Quick Start

1. Start the development server: `npm run dev`
2. Navigate to `/test-payment`
3. Use test card: `4242424242424242`
4. Complete the payment flow

## 🔑 Your Stripe Keys (Already Configured)

```bash
# Secret Key (Server-side)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# Publishable Key (Client-side)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

## 🧪 Test Cards

Use these test card numbers in Stripe Checkout:

| Card Number | Description | Expected Result |
|-------------|-------------|-----------------|
| `4242424242424242` | Visa (Success) | Payment succeeds |
| `4000000000000002` | Visa (Declined) | Payment declined |
| `4000000000009995` | Visa (Insufficient funds) | Payment declined |
| `4000000000009987` | Visa (Expired card) | Payment declined |
| `4000000000009979` | Visa (Incorrect CVC) | Payment declined |
| `4000000000000069` | Visa (Expired card) | Payment declined |
| `4000000000000127` | Visa (Incorrect CVC) | Payment declined |
| `4000000000000119` | Visa (Processing error) | Payment declined |
| `4000000000000101` | Visa (Processing error) | Payment declined |
| `4000000000000093` | Visa (Processing error) | Payment declined |
| `4000000000000085` | Visa (Processing error) | Payment declined |
| `4000000000000077` | Visa (Processing error) | Payment declined |
| `4000000000000069` | Visa (Processing error) | Payment declined |
| `4000000000000051` | Visa (Processing error) | Payment declined |
| `4000000000000043` | Visa (Processing error) | Payment declined |
| `4000000000000035` | Visa (Processing error) | Payment declined |
| `4000000000000027` | Visa (Processing error) | Payment declined |
| `4000000000000019` | Visa (Processing error) | Payment declined |
| `4000000000000002` | Visa (Processing error) | Payment declined |

## 🔄 Test Scenarios

### 1. Successful Payment
- Use card: `4242424242424242`
- Fill in any future expiry date
- Use any 3-digit CVC
- Complete payment
- **Expected**: Redirect to success page with bot creation

### 2. Declined Payment
- Use card: `4000000000000002`
- Fill in any future expiry date
- Use any 3-digit CVC
- Complete payment
- **Expected**: Redirect to cancel page

### 3. Insufficient Funds
- Use card: `4000000000009995`
- Fill in any future expiry date
- Use any 3-digit CVC
- Complete payment
- **Expected**: Redirect to cancel page

### 4. Expired Card
- Use card: `4000000000000069`
- Fill in any past expiry date
- Use any 3-digit CVC
- Complete payment
- **Expected**: Redirect to cancel page

### 5. Incorrect CVC
- Use card: `4000000000009979`
- Fill in any future expiry date
- Use any 2-digit CVC
- Complete payment
- **Expected**: Redirect to cancel page

## 🛠️ Testing Different Plans

### Signup Plan ($0.01)
- Navigate to `/test-payment`
- Select "Signup Plan"
- Complete payment
- **Expected**: Bot created, $0.01 charged, refund processed

### Starter Plan ($29.00)
- Navigate to `/test-payment`
- Select "Starter Plan"
- Complete payment
- **Expected**: Bot created, $29.00 charged

### Professional Plan ($79.00)
- Navigate to `/test-payment`
- Select "Professional Plan"
- Complete payment
- **Expected**: Bot created, $79.00 charged

## 🔍 Debugging

### Check Console Logs
1. Open browser developer tools
2. Go to Console tab
3. Look for Stripe-related logs
4. Check for any error messages

### Check Network Tab
1. Open browser developer tools
2. Go to Network tab
3. Look for API calls to `/api/payment/*`
4. Check response status and data

### Check Server Logs
1. Look at terminal running `npm run dev`
2. Check for Stripe webhook logs
3. Look for any error messages

## 🐛 Common Issues

### Issue: Payment not processing
**Solution**: Check if Stripe keys are correctly set in `.env.local`

### Issue: Webhook not working
**Solution**: 
1. Check webhook URL in Stripe dashboard
2. Verify webhook secret in `.env.local`
3. Check server logs for webhook errors

### Issue: Bot not created after payment
**Solution**:
1. Check webhook logs
2. Verify database connection
3. Check if user exists in database

### Issue: Refund not processed
**Solution**:
1. Check webhook logs for refund processing
2. Verify Stripe account has refund capability
3. Check if webhook is receiving `payment_intent.succeeded` event

## 📊 Monitoring

### Stripe Dashboard
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Check Payments section
3. Look for test payments
4. Check webhook logs

### Database
1. Check `bots` table for new entries
2. Verify `paymentSessionId` is set
3. Check `paymentStatus` field

## 🚨 Security Notes

- Never use real card numbers in test environment
- Always use test API keys
- Don't commit sensitive information to git
- Use environment variables for configuration

## 📝 Test Checklist

- [ ] Payment success flow works
- [ ] Payment failure flow works
- [ ] Bot creation after successful payment
- [ ] Refund processing for signup plan
- [ ] Webhook events are received
- [ ] Database updates correctly
- [ ] Error handling works properly
- [ ] UI shows correct messages
- [ ] Redirects work correctly

## 🎯 Next Steps

1. Test all payment scenarios
2. Verify webhook functionality
3. Check database updates
4. Test error handling
5. Verify refund processing
6. Test with different browsers
7. Test mobile responsiveness

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Look at console logs
3. Check Stripe dashboard
4. Review server logs
5. Contact development team

---

**Happy Testing! 🎉**
