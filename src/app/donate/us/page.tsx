'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function USDonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [showBankDetails, setShowBankDetails] = useState(false)

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
    }
  ]

  const handleDonateNow = (amount: number) => {
    setSelectedAmount(amount)
    setShowBankDetails(true)
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
                        onClick={() => handleDonateNow(option.amount)}
                        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                      >
                        Donate ${option.amount}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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

              <div className="bg-orange-50 p-6 rounded-lg mb-8">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  📧 Important: After Donating
                </h4>
                <p className="text-gray-700">
                  After donating, please email us at <strong>donate@mahatiashramam.org</strong> with your name and amount so we can acknowledge it.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">💱</div>
                  <h5 className="font-semibold text-gray-900">Wise</h5>
                  <p className="text-sm text-gray-600">Low fees, great rates</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">🚀</div>
                  <h5 className="font-semibold text-gray-900">Remitly</h5>
                  <p className="text-sm text-gray-600">Fast transfers</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">💸</div>
                  <h5 className="font-semibold text-gray-900">Xoom</h5>
                  <p className="text-sm text-gray-600">PayPal service</p>
                </div>
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
    </div>
  )
}
