// Simple test script to create a donation
const testDonation = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/donation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test Donor',
        email: 'test@example.com',
        amount: 100,
        currency: 'USD',
        payment_method: 'Bank Transfer',
        location: 'us',
        reference_id: 'TEST123',
        message: 'Test donation',
        status: 'New'
      })
    });

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

console.log('Testing donation API...');
testDonation();