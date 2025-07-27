'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import PaymentConfirmationModal from '@/components/PaymentConfirmationModal'
import { trackDonationAmountSelect, trackPaymentMethodSelect } from '@/utils/analytics'

export default function IndiaNewDonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDonationTitle, setSelectedDonationTitle] = useState('')
  const [customAmount, setCustomAmount] = useState<string>('')
  const [showCustomInput, setShowCustomInput] = useState(false)
  // Following the US page pattern
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)

  const donationOptions = [
    {
      id: 1,
      title: 'Sponsor One Day Meal',
      subtitle: 'Feed all children for a day',
      amount: 3500,
      description: 'Provide nutritious meals for all children for one full day',
      icon: '🍽️',
      impact: 'Feeds 100+ children for an entire day'
    },
    {
      id: 2,
      title: 'Sponsor a Child',
      subtitle: 'Full year support',
      amount: 18000,
      description: 'Support one child\'s complete care for an entire year',
      icon: '👶',
      impact: 'Covers education, food, shelter & healthcare'
    },
    {
      id: 3,
      title: 'Monthly Meals',
      subtitle: 'One month of nutrition',
      amount: 27000,
      description: 'Ensure nutritious meals for all children for one month',
      icon: '🥘',
      impact: 'Provides 9000+ meals (100 children × 30 days × 3 meals)'
    },
    {
      id: 4,
      title: 'Custom Amount',
      subtitle: 'Choose your contribution',
      amount: 0,
      description: 'Donate according to your wish and capacity',
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
    setShowCustomInput(false)
    // Following US flow - show payment details after amount selection
    setShowPaymentDetails(true)
    
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
    if (amount && amount > 0) {
      setSelectedAmount(amount)
      setShowCustomInput(false)
      // Following US flow - show payment details after amount selection
      setShowPaymentDetails(true)
      
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
                🇮🇳 NEW PAGE - Indian Donors (US Flow)
              </h1>
              <p className="text-orange-100 mt-1">
                This is a new version using the US donation flow pattern
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
        {/* Following the US pattern - show payment details after selection */}
        {!showPaymentDetails ? (
          <>
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
                    <p className="text-gray-600 mb-2">{option.subtitle}</p>
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
                    min="100"
                    step="100"
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
          /* Payment Options - Visible after amount selection */
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
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  📋 Choose a Payment Method
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div 
                    className="p-6 rounded-lg border-2 cursor-pointer transition-all border-gray-200 hover:border-orange-300"
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-3">📱</div>
                      <h3 className="font-semibold text-gray-900 mb-2">UPI Payment</h3>
                      <p className="text-sm text-gray-600">PhonePe/GPay: 9059261176</p>
                    </div>
                  </div>

                  <div 
                    className="p-6 rounded-lg border-2 cursor-pointer transition-all border-gray-200 hover:border-orange-300"
                    onClick={() => setPaymentMethod('bank')}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-3">🏦</div>
                      <h3 className="font-semibold text-gray-900 mb-2">Bank Transfer</h3>
                      <p className="text-sm text-gray-600">Direct bank account transfer</p>
                    </div>
                  </div>
                  
                  <div 
                    className="p-6 rounded-lg border-2 cursor-pointer transition-all border-gray-200 hover:border-orange-300"
                    onClick={() => setPaymentMethod('razorpay')}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-3">💳</div>
                      <h3 className="font-semibold text-gray-900 mb-2">Razorpay</h3>
                      <p className="text-sm text-gray-600">Credit/Debit Card, Net Banking</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {paymentMethod === 'upi' && (
                <div className="bg-orange-50 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-orange-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">✓</span>
                    UPI Payment Details
                  </h4>
                  
                  <div className="bg-white p-6 rounded-lg mb-6 flex flex-col md:flex-row items-center justify-center gap-6">
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-1 w-40 h-40">
                      <img 
                        src="/images/payments/upi-qr.png" 
                        alt="UPI QR Code" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/150x150?text=UPI+QR';
                        }}
                      />
                    </div>
                    <div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-lg font-semibold">Scan QR or Pay Using:</p>
                        <p className="text-xl font-mono font-bold text-blue-800 mb-1">9059261176</p>
                        <p className="text-gray-600 text-sm">Works with PhonePe, GPay, Paytm</p>
                        <p className="text-lg mt-3 font-semibold">Amount: <span className="font-bold">₹{selectedAmount?.toLocaleString('hi-IN')}</span></p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h5 className="font-medium mb-2">How to Complete Your UPI Payment:</h5>
                    <ol className="list-decimal pl-6 space-y-1 text-sm">
                      <li>Open your UPI app (PhonePe, GPay, Paytm, etc.)</li>
                      <li>Scan the QR code or enter mobile number: <strong>9059261176</strong></li>
                      <li>Enter the amount: ₹{selectedAmount?.toLocaleString('hi-IN')}</li>
                      <li>Add "Mahatee Donation" in the description</li>
                      <li>After payment is complete, click "I've Made the Payment" below</li>
                    </ol>
                  </div>

                  {/* Confirmation Button */}
                  <div className="text-center">
                    <button
                      onClick={() => handlePaymentMethodSelect('UPI Payment')}
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2 mx-auto"
                    >
                      <span>✅</span> I've Made the Payment
                    </button>
                    <p className="text-sm text-gray-600 mt-2">Click here after you've sent the UPI payment</p>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'bank' && (
                <div className="bg-orange-50 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-orange-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">✓</span>
                    Bank Transfer Details
                  </h4>
                  
                  <div className="bg-white p-6 rounded-lg mb-6">
                    <h5 className="font-semibold text-lg text-gray-900 mb-3">Bank Account Information</h5>
                    <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                      <p><strong>Account Name:</strong> Mahatee Ashramam</p>
                      <p><strong>Account Number:</strong> <span className="font-mono font-medium">073711010000022</span></p>
                      <p><strong>IFSC Code:</strong> <span className="font-mono font-medium">UBIN0807371</span></p>
                      <p><strong>Bank:</strong> Union Bank of India</p>
                      <p><strong>Branch:</strong> Balkonda Branch</p>
                      <p><strong>Amount:</strong> ₹{selectedAmount?.toLocaleString('hi-IN')}</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h5 className="font-medium mb-2">How to Complete Your Bank Transfer:</h5>
                    <ol className="list-decimal pl-6 space-y-1 text-sm">
                      <li>Use your bank's mobile app, website, or visit a branch</li>
                      <li>Make a transfer to the account details shown above</li>
                      <li>Amount to transfer: ₹{selectedAmount?.toLocaleString('hi-IN')}</li>
                      <li>Include "Mahatee Donation" in the transfer description</li>
                      <li>After transfer is complete, click "I've Made the Payment" below</li>
                    </ol>
                  </div>

                  {/* Confirmation Button */}
                  <div className="text-center">
                    <button
                      onClick={() => handlePaymentMethodSelect('Bank Transfer')}
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center gap-2 mx-auto"
                    >
                      <span>✅</span> I've Made the Payment
                    </button>
                    <p className="text-sm text-gray-600 mt-2">Click here after you've completed the bank transfer</p>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'razorpay' && (
                <div className="bg-orange-50 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-orange-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">✓</span>
                    Online Payment
                  </h4>
                  
                  <div className="bg-white p-6 rounded-lg mb-6">
                    <div className="text-center">
                      <div className="text-5xl mb-4">💳</div>
                      <h5 className="text-xl font-semibold mb-2">Razorpay Payment Gateway</h5>
                      <p className="mb-2">Securely donate using credit/debit cards, net banking, UPI</p>
                      <p className="text-lg font-semibold">Amount: <span className="text-green-600 font-bold">₹{selectedAmount?.toLocaleString('hi-IN')}</span></p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h5 className="font-medium mb-2">Online Payment Process:</h5>
                    <ol className="list-decimal pl-6 space-y-1 text-sm">
                      <li>Click the "Proceed to Payment" button below</li>
                      <li>You'll be redirected to Razorpay's secure payment page</li>
                      <li>Complete your payment using your preferred method</li>
                      <li>You'll automatically return to our site when payment is complete</li>
                    </ol>
                  </div>

                  {/* Confirmation Button */}
                  <div className="text-center">
                    <button
                      onClick={() => handlePaymentMethodSelect('Razorpay')}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors mx-auto"
                    >
                      Proceed to Payment
                    </button>
                    <p className="text-sm text-gray-600 mt-2">You'll be redirected to Razorpay's secure payment page</p>
                  </div>
                </div>
              )}
              
              {!paymentMethod && (
                <div className="text-center text-gray-600 p-6 bg-blue-50 rounded-lg">
                  <p className="text-lg">👆 Please select a payment method from above to continue</p>
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
