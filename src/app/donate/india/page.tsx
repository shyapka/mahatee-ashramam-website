'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function IndiaDonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>('')

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

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: '📱',
      description: 'GPay, PhonePe, Paytm आदि से तुरंत भुगतान'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: '🏦',
      description: 'Direct bank account transfer'
    },
    {
      id: 'razorpay',
      name: 'Razorpay',
      icon: '💳',
      description: 'Credit/Debit Card, Net Banking'
    }
  ]

  const handleDonate = (amount: number) => {
    setSelectedAmount(amount)
  }

  const handlePaymentMethod = (method: string) => {
    setPaymentMethod(method)
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
                Donate with local payment options
              </p>
            </div>
            <Link href="/donate" className="text-orange-100 hover:text-white">
              ← Change Location
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!selectedAmount ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Choose Your <span className="text-orange-500">Impact</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Your contribution makes a direct difference in the lives of 100+ children at Mahatee Ashramam in Telangana, India.
              </p>
            </div>

            {/* Donation Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {donationOptions.map((option) => (
                <div
                  key={option.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-200"
                >
                  <div className="p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-3">{option.icon}</div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {option.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {option.subtitle}
                      </p>
                      {option.amount > 0 && (
                        <div className="text-2xl font-bold text-orange-600 mb-3">
                          ₹{option.amount.toLocaleString('hi-IN')}
                        </div>
                      )}
                      <p className="text-gray-600 text-sm mb-4">
                        {option.description}
                      </p>
                      <div className="bg-green-50 p-3 rounded-lg mb-4">
                        <p className="text-xs text-green-800 font-medium">
                          Impact: {option.impact}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDonate(option.amount)}
                        className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
                      >
                        {option.amount > 0 ? `Donate ₹${option.amount.toLocaleString('hi-IN')}` : 'Choose Amount'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bank Details */}
            <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Bank Account Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-4">Direct Bank Transfer</h4>
                  <div className="space-y-3 text-sm">
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
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-4">UPI Details</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">UPI ID:</span>
                      <div className="text-gray-900">mahateashramam@upi</div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Name:</span>
                      <div className="text-gray-900">Mahatee Ashramam</div>
                    </div>
                    <div className="mt-4 text-center">
                      <div className="w-32 h-32 bg-white border-2 border-gray-300 rounded-lg mx-auto flex items-center justify-center">
                        <span className="text-gray-500 text-xs">QR Code</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">Scan for quick UPI payment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Benefits */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                🧾 Tax Benefits
              </h3>
              <p className="text-gray-700 text-center">
                80G certificate available for tax deduction. All donations are eligible for tax benefits under section 80G.
              </p>
            </div>
          </>
        ) : (
          /* Payment Method Selection */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Choose Payment Method
                </h2>
                <p className="text-lg text-gray-600">
                  Your selected amount: <span className="font-bold text-orange-600">₹{selectedAmount.toLocaleString('hi-IN')}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === method.id 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                    onClick={() => handlePaymentMethod(method.id)}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-3">{method.icon}</div>
                      <h3 className="font-semibold text-gray-900 mb-2">{method.name}</h3>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {paymentMethod && (
                <div className="bg-orange-50 p-6 rounded-lg mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Selected: {paymentMethods.find(m => m.id === paymentMethod)?.name}
                  </h4>
                  <p className="text-gray-700 text-sm mb-4">
                    This is a demo. In production, this would integrate with the actual payment gateway.
                  </p>
                  <button className="bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                    Proceed to Payment
                  </button>
                </div>
              )}

              <div className="text-center">
                <button
                  onClick={() => setSelectedAmount(null)}
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
