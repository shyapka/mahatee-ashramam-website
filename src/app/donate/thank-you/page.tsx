'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ThankYouContent() {
  const searchParams = useSearchParams()
  const amount = searchParams.get('amount')
  const orderId = searchParams.get('orderId')
  const paymentId = searchParams.get('paymentId')

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon with Animation */}
          <div className="mx-auto mb-6">
            <div className="w-24 h-24 mx-auto bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Main Thank You Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thank You!
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Your generous donation has been received successfully
          </p>

          {/* Payment Details */}
          {amount && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Donation Details
              </h2>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-semibold text-green-600">
                    ₹{parseInt(amount).toLocaleString('hi-IN')}
                  </span>
                </div>
                {paymentId && (
                  <div className="flex justify-between">
                    <span>Payment ID:</span>
                    <span className="font-mono text-xs">{paymentId}</span>
                  </div>
                )}
                {orderId && (
                  <div className="flex justify-between">
                    <span>Order ID:</span>
                    <span className="font-mono text-xs">{orderId}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{new Date().toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Impact Statement */}
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8 text-left">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-orange-800">
                  Your Impact
                </h3>
                <div className="mt-2 text-sm text-orange-700">
                  <p>
                    Your contribution goes a long way in helping provide meals, education,
                    and shelter for children in need. Thank you for making a difference in their lives.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="text-left mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              What happens next?
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                You'll receive a confirmation email with your donation receipt
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Your donation will be used immediately for ongoing programs
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                We'll keep you updated on the impact of your contribution
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 transition-colors"
            >
              Return to Home
            </a>
            <a
              href="/about"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Learn More About Us
            </a>
          </div>

          {/* Contact Information */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
            <p>
              Questions about your donation? Contact us at{' '}
              <a href="mailto:contact@mahateeashramam.org" className="text-orange-600 hover:text-orange-500">
                contact@mahateeashramam.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  )
}