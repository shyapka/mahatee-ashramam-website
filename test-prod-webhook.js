const crypto = require('crypto');

// Test webhook payload
const payload = {
  entity: "event",
  account_id: "acc_test",
  event: "payment.captured",
  contains: ["payment"],
  payload: {
    payment: {
      entity: {
        id: "pay_test_prod_" + Date.now(),
        amount: 100000, // ₹1000 in paise
        currency: "INR",
        status: "captured",
        international: false,
        method: "upi",
        amount_refunded: 0,
        captured: true,
        description: "Test donation from manual webhook",
        email: "test@example.com",
        contact: "+919999999999",
        notes: {
          donor_name: "Production Test Donor",
          message: "Testing production webhook"
        },
        fee: 2000,
        tax: 360,
        created_at: Math.floor(Date.now() / 1000)
      }
    }
  },
  created_at: Math.floor(Date.now() / 1000)
};

const bodyString = JSON.stringify(payload);

// For testing, use a dummy secret
const webhookSecret = 'test_secret';

// Generate signature
const signature = crypto
  .createHmac('sha256', webhookSecret)
  .update(bodyString)
  .digest('hex');

console.log('Testing Production Razorpay webhook...');
console.log('URL: https://mahateeashramam.org/api/webhooks/razorpay');
console.log('Payment ID:', payload.payload.payment.entity.id);

// Make the request to production
fetch('https://mahateeashramam.org/api/webhooks/razorpay', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-razorpay-signature': signature
  },
  body: bodyString
})
.then(response => {
  console.log('Status:', response.status);
  return response.json();
})
.then(data => {
  console.log('Response:', data);
  if(data.success) {
    console.log('✅ Webhook processed successfully!');
    console.log('Check Supabase for the donation record');
  } else {
    console.log('❌ Webhook failed:', data.error);
  }
})
.catch(error => {
  console.error('Error:', error);
});