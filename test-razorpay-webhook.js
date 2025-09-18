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
        id: "pay_test_" + Date.now(),
        amount: 50000, // ₹500 in paise
        currency: "INR",
        status: "captured",
        international: false,
        method: "card",
        amount_refunded: 0,
        captured: true,
        description: "Test donation",
        email: "test@example.com",
        contact: "+919999999999",
        notes: {
          donor_name: "Test Donor",
          message: "Test donation from webhook"
        },
        fee: 1000,
        tax: 180,
        created_at: Math.floor(Date.now() / 1000)
      }
    }
  },
  created_at: Math.floor(Date.now() / 1000)
};

const bodyString = JSON.stringify(payload);

// For testing, use a dummy secret
const webhookSecret = 'test_webhook_secret';

// Generate signature
const signature = crypto
  .createHmac('sha256', webhookSecret)
  .update(bodyString)
  .digest('hex');

console.log('Testing Razorpay webhook endpoint...');
console.log('Payload:', JSON.stringify(payload, null, 2));
console.log('Signature:', signature);

// Make the request
fetch('http://localhost:3000/api/webhooks/razorpay', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-razorpay-signature': signature
  },
  body: bodyString
})
.then(response => response.json())
.then(data => {
  console.log('Response:', data);
})
.catch(error => {
  console.error('Error:', error);
});