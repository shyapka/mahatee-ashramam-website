'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CreditCard, DollarSign } from 'lucide-react'
import PaymentConfirmationModal from '@/components/PaymentConfirmationModal'
import { trackDonationAmountSelect, trackPaymentMethodSelect, trackPageView } from '@/utils/analytics'

export default function USDonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDonationTitle, setSelectedDonationTitle] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [showBankDetails, setShowBankDetails] = useState(false)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [showCustomInput, setShowCustomInput] = useState(false)

  const donationOptions = [
    {
      id: 1,
      title: 'Sponsor One Day Meal',
      amount: 50,
      description: 'Provide nutritious meals for all children for one day',
      icon: '🍽️',
      impact: 'Feeds 100+ children for a full day'
    },
    {
      id: 2,
      title: 'Sponsor a Child',
      amount: 1000,
      description: 'Support one child\'s complete care for an entire year',
      icon: '👶',
      impact: 'Covers education, food, shelter & healthcare'
    },
    {
      id: 3,
      title: 'Provide Monthly Meals',
      amount: 1500,
      description: 'Ensure nutritious meals for all children for one month',
      icon: '🥘',
      impact: 'Provides 9000+ meals (100 children × 30 days × 3 meals)'
    },
    {
      id: 4,
      title: 'Custom Amount',
      amount: 0,
      description: 'Choose your own contribution amount',
      icon: '💝',
      impact: 'Every dollar makes a difference'
    }
  ]

  const handleDonateNow = (amount: number, title: string) => {
    if (amount === 0) {
      // Custom amount selected
      setShowCustomInput(true)
      setSelectedDonationTitle(title)
      return
    }
    
    setSelectedAmount(amount)
    setSelectedDonationTitle(title)
    setShowBankDetails(true)
    setShowCustomInput(false)
    
    // Track donation amount selection
    trackDonationAmountSelect({
      amount,
      currency: 'USD',
      location: 'us',
      title
    })
  }
  
  const handleCustomAmountSubmit = () => {
    const amount = parseInt(customAmount)
    if (amount && amount >= 10) {
      setSelectedAmount(amount)
      setShowBankDetails(true)
      setShowCustomInput(false)
      
      // Track custom amount selection
      trackDonationAmountSelect({
        amount,
        currency: 'USD',
        location: 'us',
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
        location: 'us',
        amount: selectedAmount,
        currency: 'USD'
      })
      
      // Open confirmation modal
      setIsModalOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <div className="bg-blue-500 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                🇺🇸 US Donors - Support Mahatee Ashramam
              </h1>
              <p className="text-blue-100 mt-1">
                Making a difference from across the world
              </p>
            </div>
            <Link href="/donate" className="text-blue-100 hover:text-white">
              ← Change Location
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!showBankDetails ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Choose Your <span className="text-orange-500">Impact</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Your contribution from the US makes a direct difference in the lives of 100+ children at Mahatee Ashramam in Telangana, India.
              </p>
            </div>

            {/* Donation Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {donationOptions.map((option) => (
                <div
                  key={option.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200"
                >
                  <div className="p-8">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{option.icon}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {option.title}
                      </h3>
                      <div className="text-3xl font-bold text-blue-600 mb-4">
                        ${option.amount}
                      </div>
                      <p className="text-gray-600 mb-4">
                        {option.description}
                      </p>
                      <div className="bg-orange-50 p-4 rounded-lg mb-6">
                        <p className="text-sm text-orange-800 font-medium">
                          Impact: {option.impact}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDonateNow(option.amount, option.title)}
                        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                      >
                        {option.amount > 0 ? `Donate $${option.amount}` : 'Choose Amount'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Amount Input */}
            {showCustomInput && (
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">💝 Enter Custom Amount</h3>
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-2">
                      Amount ($)
                    </label>
                    <input
                      type="number"
                      id="customAmount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Enter amount in dollars"
                      min="10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={handleCustomAmountSubmit}
                    disabled={!customAmount || parseInt(customAmount) < 10}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-md transition-colors"
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
                <p className="text-sm text-gray-600 mt-2">Minimum donation: $10</p>
              </div>
            )}

            {/* Why Donate Section */}
            <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Why Your US Donation Matters
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    🏠 Safe Haven
                  </h4>
                  <p className="text-gray-600">
                    Providing 24/7 residential care for orphaned and underprivileged children in rural Telangana.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    📚 Education First
                  </h4>
                  <p className="text-gray-600">
                    All children attend local schools with additional tutoring and digital literacy support.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    🥗 Nutrition & Health
                  </h4>
                  <p className="text-gray-600">
                    Three wholesome meals daily plus healthcare to ensure children grow healthy and strong.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    💰 100% Transparency
                  </h4>
                  <p className="text-gray-600">
                    Every dollar goes directly to child care. Regular updates and photos shared with donors.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Bank Details Section */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  💸 For Donors in the U.S.
                </h2>
                <p className="text-lg text-gray-600">
                  Your selected donation: <span className="font-bold text-blue-600">${selectedAmount}</span>
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  We welcome your support! 
                </h3>
                <p className="text-gray-700 mb-6">
                  You can directly send contributions to Mahatee Ashramam's India bank account via <strong>Wise</strong>, <strong>Remitly</strong>, or <strong>Xoom</strong>. 
                  Please include <strong>"Mahatee Donation"</strong> in the message.
                </p>

                <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-4 text-center">Bank Account Details:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Bank Name:</span>
                      <div className="text-gray-900">Union Bank of India</div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Branch:</span>
                      <div className="text-gray-900">Balkonda Branch</div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Account Number:</span>
                      <div className="text-gray-900 font-mono">073711010000022</div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">IFSC Code:</span>
                      <div className="text-gray-900 font-mono">UBIN0807371</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* How to Donate Instructions */}
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  💸 How to Send Your Donation:
                </h4>
                <div className="space-y-3 text-gray-700 mb-4">
                  <p><strong>Step 1:</strong> Use one of these trusted services to send money to the bank account above:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-xl mb-1">💱</div>
                      <div className="font-semibold text-sm">Wise</div>
                      <div className="text-xs text-gray-600">wise.com</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-xl mb-1">🚀</div>
                      <div className="font-semibold text-sm">Remitly</div>
                      <div className="text-xs text-gray-600">remitly.com</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-xl mb-1">💸</div>
                      <div className="font-semibold text-sm">Xoom</div>
                      <div className="text-xs text-gray-600">xoom.com</div>
                    </div>
                  </div>
                  <p><strong>Step 2:</strong> Include <strong>"Mahatee Donation"</strong> in the transfer message</p>
                  <p><strong>Step 3:</strong> Once you've sent the money, click the button below to confirm your donation</p>
                </div>
              </div>

              {/* Confirmation Button */}
              <div className="text-center mb-8">
                <button
                  onClick={() => {
                    setPaymentMethod('Bank Transfer via Wise/Remitly/Xoom')
                    handlePaymentMethodSelect('Bank Transfer')
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center gap-2"
                >
                  ✅ I've Made the Payment
                </button>
                <p className="text-sm text-gray-600 mt-2">Click here after you've sent the donation</p>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowBankDetails(false)}
                  className="bg-gray-500 text-white py-2 px-6 rounded-lg mr-4 hover:bg-gray-600 transition-colors"
                >
                  ← Back to Options
                </button>
                <Link href="/contact">
                  <button className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors">
                    Contact Us
                  </button>
                </Link>
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
        currency="USD"
        paymentMethod={paymentMethod}
        location="us"
      />
    </div>
  )
}
