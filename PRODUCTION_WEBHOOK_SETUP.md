# 🚀 Production Webhook Setup Guide

Your webhook is now configured for production deployment at:
**https://smart-chat-opal.vercel.app/api/webhooks/stripe**

## 🔧 **Required Environment Variables in Vercel**

Add these to your Vercel project settings:

### **Stripe Configuration (Production)**
```bash
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_from_stripe
```

### **Application Configuration**
```bash
NEXT_PUBLIC_APP_URL=https://smart-chat-opal.vercel.app
DATABASE_URL=your_production_database_url
NEXTAUTH_SECRET=your_production_nextauth_secret
NEXTAUTH_URL=https://smart-chat-opal.vercel.app
```

## 🧪 **Test Your Production Webhook**

### **1. Test Webhook Endpoint**
```bash
curl -X POST https://smart-chat-opal.vercel.app/api/webhooks/stripe/test
```

### **2. Test Payment Flow**
1. Go to: `https://smart-chat-opal.vercel.app/test-payment`
2. Use test card: `4242424242424242`
3. Complete payment
4. Check Vercel function logs for webhook processing

### **3. Monitor Webhook Delivery**
1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click on your webhook endpoint
3. Check "Recent deliveries" tab
4. Look for successful deliveries

## 🔍 **Webhook Events Configured**

Your webhook should be listening for these events:

### **Critical Events:**
- ✅ `checkout.session.completed` - Bot creation after payment
- ✅ `payment_intent.succeeded` - Payment confirmation
- ✅ `payment_intent.payment_failed` - Payment failure handling
- ✅ `refund.created` - $0.01 refund processing

### **Additional Events:**
- `checkout.session.expired`
- `payment_intent.canceled`
- `payment_intent.requires_action`
- `refund.updated`
- `refund.failed`
- `customer.created`
- `customer.updated`

## 🐛 **Debugging Production Issues**

### **1. Check Vercel Function Logs**
1. Go to Vercel Dashboard
2. Select your project
3. Go to "Functions" tab
4. Click on webhook function
5. Check logs for errors

### **2. Check Stripe Webhook Logs**
1. Go to Stripe Dashboard > Webhooks
2. Click on your webhook endpoint
3. Check "Recent deliveries"
4. Look for failed deliveries and error messages

### **3. Common Issues**

#### **Webhook Signature Verification Failed**
- Check if `STRIPE_WEBHOOK_SECRET` is correct
- Ensure webhook secret matches Stripe dashboard

#### **Database Connection Issues**
- Verify `DATABASE_URL` is correct
- Check if database is accessible from Vercel

#### **Payment Not Processing**
- Check if webhook events are being received
- Verify bot creation logic in webhook handler

## 🚀 **Production Deployment Checklist**

- [ ] Webhook URL configured in Stripe
- [ ] Environment variables set in Vercel
- [ ] Database connection working
- [ ] Webhook events selected correctly
- [ ] Test payment flow working
- [ ] Refund processing working
- [ ] Monitoring set up

## 📊 **Monitoring & Alerts**

### **Stripe Dashboard**
- Monitor payment success/failure rates
- Check webhook delivery status
- Track refund processing

### **Vercel Dashboard**
- Monitor function execution
- Check error rates
- Track response times

### **Application Logs**
- Payment processing logs
- Bot creation logs
- Error tracking

## 🆘 **Support**

### **If Webhook Fails:**
1. Check Stripe webhook logs
2. Check Vercel function logs
3. Verify environment variables
4. Test with Stripe CLI

### **If Payments Not Working:**
1. Verify API keys are correct
2. Check if webhook is receiving events
3. Test with different payment methods
4. Check database connectivity

---

**Your webhook is ready for production!** 🎉

**Webhook URL:** `https://smart-chat-opal.vercel.app/api/webhooks/stripe`
**Test URL:** `https://smart-chat-opal.vercel.app/test-payment`
