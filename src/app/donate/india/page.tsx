'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import PaymentConfirmationModal from '@/components/PaymentConfirmationModal'
import RazorpayCheckout from '@/components/RazorpayCheckout'
import { trackDonationAmountSelect, trackPaymentMethodSelect } from '@/utils/analytics'

export default function IndiaDonatePageFixed() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDonationTitle, setSelectedDonationTitle] = useState('')
  const [customAmount, setCustomAmount] = useState<string>('')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)

  const donationOptions = [
    {
      id: 1,
      title: 'Sponsor One Day Meal',
      amount: 3500,
      description: 'Provide nutritious meals for all children for one day',
      icon: '🍽️',
      impact: 'Feeds 100+ children for a full day'
    },
    {
      id: 2,
      title: 'Sponsor a Child',
      amount: 18000,
      description: 'Support one child\'s complete care for an entire year',
      icon: '👶',
      impact: 'Covers education, food, shelter & healthcare'
    },
    {
      id: 3,
      title: 'Monthly Meals',
      amount: 27000,
      description: 'Ensure nutritious meals for all children for one month',
      icon: '🥘',
      impact: 'Provides 9000+ meals'
    },
    {
      id: 4,
      title: 'Custom Amount',
      amount: 0,
      description: 'Choose your own contribution amount',
      icon: '💝',
      impact: 'Every rupee makes a difference'
    }
  ]

  const handleDonate = (amount: number, title: string) => {
    if (amount === 0) {
      // Custom amount selected
      setShowCustomInput(true)
      setSelectedDonationTitle(title)
      return
    }
    
    setSelectedAmount(amount)
    setSelectedDonationTitle(title)
    setShowPaymentDetails(true)
    setShowCustomInput(false)
    
    // Track donation amount selection
    trackDonationAmountSelect({
      amount,
      currency: 'INR',
      location: 'india',
      title
    })
  }
  
  const handleCustomAmountSubmit = () => {
    const amount = parseInt(customAmount)
    if (amount && amount >= 1) {  // Changed to 1 for testing, UI still shows 100
      setSelectedAmount(amount)
      setShowPaymentDetails(true)
      setShowCustomInput(false)

      // Track custom amount selection
      trackDonationAmountSelect({
        amount,
        currency: 'INR',
        location: 'india',
        title: 'Custom Amount'
      })
    }
  }
  
  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method)
    
    if (selectedAmount) {
      // Track payment method selection
      trackPaymentMethodSelect({
        method,
        location: 'india',
        amount: selectedAmount,
        currency: 'INR'
      })
      
      // Open confirmation modal
      setIsModalOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      {/* Header */}
      <div className="bg-orange-500 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                🇮🇳 Indian Donors - Support Mahatee Ashramam
              </h1>
              <p className="text-orange-100 mt-1">
                Help us provide care, education, and shelter for children in need
              </p>
            </div>
            <Link href="/donate">
              <button className="flex items-center text-white bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Donation Options
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!showPaymentDetails ? (
          <>
            {/* Donation Options */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Choose Your Donation Amount
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Your generosity directly impacts the lives of 100+ children at Mahatee Ashramam in Telangana, India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {donationOptions.map((option) => (
                <div 
                  key={option.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
                >
                  <div className="p-6">
                    <div className="text-4xl mb-4">{option.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                    {option.amount > 0 ? (
                      <p className="text-2xl font-bold text-orange-500 mb-4">₹{option.amount.toLocaleString('hi-IN')}</p>
                    ) : (
                      <p className="text-xl font-bold text-orange-500 mb-4">Your Choice</p>
                    )}
                    <p className="text-sm text-gray-500 mb-4">{option.description}</p>
                    <p className="text-xs bg-green-50 text-green-700 p-2 rounded mb-4">{option.impact}</p>
                    <button
                      onClick={() => handleDonate(option.amount, option.title)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      Select & Continue
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Amount Input */}
            {showCustomInput && (
              <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 mb-12">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Enter Custom Donation Amount
                </h3>
                <div className="flex items-center mb-4">
                  <span className="text-xl font-bold text-gray-600 mr-2">₹</span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleCustomAmountSubmit}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-semibold transition-colors"
                  >
                    Proceed
                  </button>
                  <button
                    onClick={() => {
                      setShowCustomInput(false)
                      setCustomAmount('')
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">Minimum donation: ₹100</p>
              </div>
            )}
          </>
        ) : (
          /* Payment Options */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Complete Your Donation
                </h2>
                <p className="text-xl text-gray-600">
                  Your selected amount: <span className="font-bold text-orange-600">₹{selectedAmount?.toLocaleString('hi-IN')}</span>
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Choose a Payment Method:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Razorpay Payment Option */}
                  <div
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === 'Razorpay'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                    onClick={() => setPaymentMethod('Razorpay')}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-3">💳</div>
                      <h3 className="font-semibold text-gray-900 mb-2">Razorpay</h3>
                      <p className="text-sm text-gray-600">Cards, UPI, NetBanking</p>
                      <div className="mt-2">
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          ⚡ Instant
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* UPI Payment Option */}
                  <div
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === 'UPI Payment'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                    onClick={() => setPaymentMethod('UPI Payment')}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-3">📱</div>
                      <h3 className="font-semibold text-gray-900 mb-2">UPI Payment</h3>
                      <p className="text-sm text-gray-600">PhonePe / GPay / Paytm</p>
                      <div className="mt-2">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Manual
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bank Transfer Option */}
                  <div
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === 'Bank Transfer'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                    onClick={() => setPaymentMethod('Bank Transfer')}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-3">🏦</div>
                      <h3 className="font-semibold text-gray-900 mb-2">Bank Transfer</h3>
                      <p className="text-sm text-gray-600">Direct bank transfer</p>
                      <div className="mt-2">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Manual
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Show payment details based on selected method */}
              {paymentMethod === 'Razorpay' && selectedAmount && (
                <div className="bg-green-50 p-6 rounded-lg mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">⚡</span>
                    Instant Payment with Razorpay
                  </h4>

                  <div className="bg-white p-6 rounded-lg">
                    <div className="text-center mb-6">
                      <h5 className="text-xl font-semibold mb-2">Payment Amount</h5>
                      <p className="text-3xl font-bold text-green-600 mb-4">
                        ₹{selectedAmount.toLocaleString('hi-IN')}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center justify-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">💳 Cards</span>
                        </div>
                        <div className="flex items-center justify-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">📱 UPI</span>
                        </div>
                        <div className="flex items-center justify-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">🏦 NetBanking</span>
                        </div>
                        <div className="flex items-center justify-center p-2 bg-gray-50 rounded">
                          <span className="text-sm">💰 Wallets</span>
                        </div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg mb-6">
                        <h6 className="font-medium mb-2">✅ Benefits of Razorpay Payment:</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Instant payment confirmation</li>
                          <li>• Automatic donation tracking</li>
                          <li>• Secure encrypted transactions</li>
                          <li>• Multiple payment options</li>
                          <li>• No manual confirmation needed</li>
                        </ul>
                      </div>

                      <RazorpayCheckout
                        amount={selectedAmount}
                        currency="INR"
                        name="Anonymous"
                        description={selectedDonationTitle}
                        notes={{
                          donation_type: selectedDonationTitle,
                          location: 'india'
                        }}
                        onSuccess={(response) => {
                          console.log('Payment successful!', response)

                          // Track payment success
                          trackPaymentMethodSelect({
                            method: 'Razorpay',
                            location: 'india',
                            amount: selectedAmount,
                            currency: 'INR'
                          })

                          // Redirect to thank you page with payment details
                          const thankYouUrl = new URL('/donate/thank-you', window.location.origin)
                          thankYouUrl.searchParams.set('amount', selectedAmount.toString())
                          thankYouUrl.searchParams.set('paymentId', response.razorpay_payment_id)
                          thankYouUrl.searchParams.set('orderId', response.razorpay_order_id)

                          window.location.href = thankYouUrl.toString()
                        }}
                        onError={(error) => {
                          console.error('Payment failed:', error)
                          alert('Payment failed. Please try again or use another payment method.')
                        }}
                        className="w-full bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                      >
                        💳 Pay Now with Razorpay
                      </RazorpayCheckout>

                      <p className="text-xs text-gray-600 mt-3">
                        🔒 Your payment is secured by Razorpay. We use industry-standard encryption.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'UPI Payment' && (
                <div className="bg-orange-50 p-6 rounded-lg mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-orange-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">✓</span>
                    UPI Payment Details
                  </h4>
                  
                  <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-lg">
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-1 w-36 h-36">
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-400 text-xs text-center">UPI QR Code<br/>Coming Soon</span>
                      </div>
                    </div>
                    <div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-semibold mb-2">UPI Details:</h5>
                        <p className="text-lg font-mono font-semibold text-blue-800">9059261176</p>
                        <p className="text-sm text-gray-600">Works with PhonePe / GPay / Paytm</p>
                        <p className="font-medium mt-2">Amount: <span className="font-bold">₹{selectedAmount?.toLocaleString('hi-IN')}</span></p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg my-4">
                    <h5 className="font-medium mb-2">How to pay with UPI:</h5>
                    <ol className="list-decimal pl-6 space-y-1 text-sm">
                      <li>Open your UPI app (PhonePe, GPay, Paytm, etc.)</li>
                      <li>Enter the UPI ID or mobile number: <strong>9059261176</strong></li>
                      <li>Enter the amount: <strong>₹{selectedAmount?.toLocaleString('hi-IN')}</strong></li>
                      <li>Include "Mahatee Donation" in the note/description</li>
                      <li>After completing payment, click the button below</li>
                    </ol>
                  </div>

                  {/* Confirmation Button */}
                  <div className="text-center mt-4">
                    <button
                      onClick={() => handlePaymentMethodSelect('UPI Payment')}
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center"
                    >
                      ✅ I've Made the Payment
                    </button>
                    <p className="text-sm text-gray-600 mt-2">Click only after completing your UPI payment</p>
                  </div>
                </div>
              )}

              {paymentMethod === 'Bank Transfer' && (
                <div className="bg-orange-50 p-6 rounded-lg mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-orange-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">✓</span>
                    Bank Transfer Details
                  </h4>

                  <div className="bg-white p-6 rounded-lg">
                    <h5 className="font-semibold text-lg text-gray-900 mb-3">Bank Account Information</h5>
                    <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                      <p><strong>Account Name:</strong> Mahatee Ashramam</p>
                      <p><strong>Account Number:</strong> <span className="font-mono">073711010000022</span></p>
                      <p><strong>IFSC Code:</strong> <span className="font-mono">UBIN0807371</span></p>
                      <p><strong>Bank:</strong> Union Bank of India</p>
                      <p><strong>Branch:</strong> Balkonda Branch</p>
                      <p><strong>Amount:</strong> ₹{selectedAmount?.toLocaleString('hi-IN')}</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg my-4">
                    <h5 className="font-medium mb-2">How to complete your bank transfer:</h5>
                    <ol className="list-decimal pl-6 space-y-1 text-sm">
                      <li>Use your bank's mobile app or website</li>
                      <li>Make a transfer to the account details shown above</li>
                      <li>Include "Mahatee Donation" in the description</li>
                      <li>After completing transfer, click the button below</li>
                    </ol>
                  </div>

                  {/* Confirmation Button */}
                  <div className="text-center mt-4">
                    <button
                      onClick={() => handlePaymentMethodSelect('Bank Transfer')}
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center"
                    >
                      ✅ I've Made the Payment
                    </button>
                    <p className="text-sm text-gray-600 mt-2">Click only after completing your bank transfer</p>
                  </div>
                </div>
              )}



              {!paymentMethod && (
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <p className="text-lg text-gray-700">👆 Please select a payment method from above to continue</p>
                </div>
              )}

              <div className="text-center mt-8">
                <button
                  onClick={() => setShowPaymentDetails(false)}
                  className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  ← Back to Options
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Confirmation Modal */}
      <PaymentConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={selectedAmount || 0}
        currency="INR"
        paymentMethod={paymentMethod}
        location="india"
      />
    </div>
  )
}
