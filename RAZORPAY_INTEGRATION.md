# Razorpay Payment Gateway Integration

## Overview
The website now includes full Razorpay payment gateway integration for instant donations with automatic tracking.

## Features
✅ **Complete Payment Flow** - Users can pay directly on the website
✅ **Multiple Payment Methods** - Cards, UPI, NetBanking, Wallets
✅ **Automatic Webhook Tracking** - All payments automatically saved to database
✅ **Secure Transactions** - Industry-standard encryption and security
✅ **No Manual Confirmation** - Instant payment verification

## User Experience

### Payment Options for Indian Donors
1. **Razorpay (Instant)** - Complete payment without leaving the website
2. **UPI Payment (Manual)** - Traditional UPI transfer with manual confirmation
3. **Bank Transfer (Manual)** - Direct bank transfer with manual confirmation

### Payment Flow
1. User selects donation amount (₹3,500 / ₹18,000 / ₹27,000 / Custom)
2. User chooses "Razorpay" payment method
3. User clicks "Pay Now with Razorpay"
4. Razorpay checkout opens with multiple payment options
5. User completes payment
6. Webhook automatically records donation in Supabase
7. User sees success confirmation

## Technical Implementation

### Components
- `RazorpayCheckout` - Reusable payment component
- `/api/razorpay/create-order` - Creates Razorpay orders
- `/api/webhooks/razorpay` - Handles payment webhooks

### Environment Variables Required
```env
# Razorpay API Keys (from Dashboard > API Keys)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_secret_key

# Webhook Secret (from Dashboard > Webhooks)
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

### API Endpoints
- **GET** `/api/razorpay/create-order` - Health check
- **POST** `/api/razorpay/create-order` - Create payment order
- **GET** `/api/webhooks/razorpay` - Webhook health check
- **POST** `/api/webhooks/razorpay` - Process payment webhooks

## Setup Instructions

### 1. Razorpay Dashboard Configuration
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Get API Keys from **Account & Settings > API Keys**
3. Add webhook at **Account & Settings > Webhooks**
   - URL: `https://mahateeashramam.org/api/webhooks/razorpay`
   - Events: `payment.captured`, `payment.failed`
   - Copy the webhook secret

### 2. Environment Setup
Add the following to your deployment environment:
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

### 3. Testing
- Use Razorpay test mode for development
- Test cards available in Razorpay documentation
- All test payments will be recorded in database

## Benefits

### For Users
- **Instant payments** - No waiting for manual confirmation
- **Multiple options** - Cards, UPI, NetBanking, Wallets
- **Secure** - Industry-standard encryption
- **Mobile-friendly** - Optimized for all devices

### For Organization
- **Automatic tracking** - All donations immediately in database
- **Better conversion** - Easier payment process
- **Real-time insights** - Instant donation analytics
- **Reduced manual work** - No need to verify payments manually

## Security
- All payments processed through Razorpay's secure servers
- Webhook signature verification ensures data integrity
- No sensitive payment data stored on our servers
- PCI DSS compliant payment processing

## Support
For any issues:
1. Check Netlify function logs for errors
2. Verify environment variables are set correctly
3. Test webhook endpoint accessibility
4. Contact Razorpay support for payment gateway issues