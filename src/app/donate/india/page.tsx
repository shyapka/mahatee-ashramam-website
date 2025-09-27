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
  const [donorName, setDonorName] = useState<string>('')
  const [donorPhone, setDonorPhone] = useState<string>('')
  const [donorEmail, setDonorEmail] = useState<string>('')
  const [showDonorForm, setShowDonorForm] = useState(false)

  const donationOptions = [
    {
      id: 1,
      title: 'Support a Child (Annual)',
      amount: 72000,
      description: 'Support one child\'s complete care for an entire year',
      icon: '👶',
      impact: 'Covers education, food, shelter & healthcare'
    },
    {
      id: 2,
      title: 'Support All Children (One Day)',
      amount: 10000,
      description: 'Provide complete care for all children for one day',
      icon: '🏠',
      impact: 'Feeds and cares for 100+ children for a full day'
    },
    {
      id: 3,
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
    setShowDonorForm(true)
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
    if (amount && amount >= 100) {
      setSelectedAmount(amount)
      setSelectedDonationTitle('Custom Amount')
      setShowDonorForm(true)
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
        {!showDonorForm && !showPaymentDetails ? (
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
        ) : showDonorForm && !showPaymentDetails ? (
          /* Donor Information Form */
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Your Information
                </h2>
                <p className="text-gray-600">
                  Selected amount: <span className="font-bold text-orange-600">₹{selectedAmount?.toLocaleString('hi-IN')}</span>
                </p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault()
                if (donorPhone) {
                  setShowPaymentDetails(true)
                  setShowDonorForm(false)
                }
              }} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Receipt will be sent to this number</p>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800">
                    <span className="font-semibold">📋 Tax Benefit:</span> Your donation is eligible for tax exemption under Section 80G
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDonorForm(false)
                      setSelectedAmount(null)
                    }}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Razorpay Payment */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Complete Your Donation
                </h2>
                <p className="text-xl text-gray-600">
                  Amount: <span className="font-bold text-orange-600">₹{selectedAmount?.toLocaleString('hi-IN')}</span>
                </p>
                {donorName && (
                  <p className="text-lg text-gray-600 mt-2">
                    Donor: <span className="font-semibold">{donorName}</span>
                  </p>
                )}
              </div>

              {/* Razorpay Payment Section */}
              {selectedAmount && (
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
                        name={donorName || "Anonymous"}
                        email={donorEmail}
                        contact={donorPhone}
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

                          // Redirect to thank you page with payment details and donor info
                          const thankYouUrl = new URL('/donate/thank-you', window.location.origin)
                          thankYouUrl.searchParams.set('amount', selectedAmount.toString())
                          thankYouUrl.searchParams.set('paymentId', response.razorpay_payment_id)
                          thankYouUrl.searchParams.set('orderId', response.razorpay_order_id)
                          thankYouUrl.searchParams.set('name', donorName || 'Anonymous')
                          thankYouUrl.searchParams.set('phone', donorPhone)
                          if (donorEmail) thankYouUrl.searchParams.set('email', donorEmail)

                          window.location.href = thankYouUrl.toString()
                        }}
                        onError={(error) => {
                          console.error('Payment failed:', error)
                          alert('Payment failed. Please try again.')
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

              <div className="text-center mt-8">
                <button
                  onClick={() => {
                    setShowPaymentDetails(false)
                    setShowDonorForm(true)
                  }}
                  className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  ← Back
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
