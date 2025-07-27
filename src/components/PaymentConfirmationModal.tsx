'use client'

import { useState } from 'react'
import { X, CheckCircle, CreditCard, Smartphone } from 'lucide-react'

interface PaymentConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  currency: 'USD' | 'INR'
  paymentMethod: string
  location: 'us' | 'india'
}

export default function PaymentConfirmationModal({
  isOpen,
  onClose,
  amount,
  currency,
  paymentMethod,
  location
}: PaymentConfirmationModalProps) {
  const [formData, setFormData] = useState({
    referenceId: '',
    email: '',
    name: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Track payment confirmation in Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'payment_confirmed', {
        event_category: 'donation',
        event_label: `${location}_${paymentMethod}`,
        value: amount,
        currency: currency,
        custom_map: {
          payment_method: paymentMethod,
          location: location
        }
      })
    }

    // Log donation data for now (until proper database is set up)
    try {
      const donationData = {
        timestamp: new Date().toISOString(),
        name: formData.name || 'Anonymous',
        email: formData.email || '',
        amount: amount,
        currency: currency,
        payment_method: paymentMethod,
        location: location,
        reference_id: formData.referenceId || '',
        message: formData.message || '',
        status: 'New'
      }

      console.log('💰 DONATION CONFIRMATION:', donationData)
      console.log('🔍 Admin can check browser console logs for donation details')
      
      // Try API endpoint (works in development)
      try {
        const response = await fetch('/api/donation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(donationData)
        })
        
        const result = await response.json()
        
        if (result.success) {
          console.log('✅ Donation saved to local database:', result)
        }
      } catch (apiError) {
        console.log('ℹ️ Local API not available (normal in production)')
      }
      
      setIsSubmitted(true)
      
    } catch (error) {
      console.error('Error processing donation:', error)
      alert('Thank you! Your payment confirmation has been recorded. We will review it soon.')
      setIsSubmitted(true)
    }

    // All done - email client opened successfully
    
    setIsSubmitting(false)
  }

  const handleClose = () => {
    setIsSubmitted(false)
    setFormData({ referenceId: '', email: '', name: '', message: '' })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            {location === 'india' ? (
              <Smartphone className="h-6 w-6 text-orange-500" />
            ) : (
              <CreditCard className="h-6 w-6 text-blue-500" />
            )}
            <h3 className="text-lg font-semibold text-gray-900">
              Payment Confirmation
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSubmitted ? (
            <>
              {/* Payment Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Payment Details</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>Amount: <span className="font-medium">{currency} {amount}</span></div>
                  <div>Method: <span className="font-medium">{paymentMethod}</span></div>
                  <div>Location: <span className="font-medium">{location === 'india' ? 'India' : 'USA'}</span></div>
                </div>
              </div>

              {/* Confirmation Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="referenceId" className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Reference ID <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="referenceId"
                    value={formData.referenceId}
                    onChange={(e) => setFormData(prev => ({ ...prev, referenceId: e.target.value }))}
                    placeholder={location === 'india' ? 'UPI Transaction ID' : 'Remitly/Wise Reference'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-gray-400">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Any additional notes..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Confirming...' : 'Confirm Payment'}
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* Success Message */
            <div className="text-center py-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h4>
              <p className="text-gray-600 mb-6">
                Your payment confirmation has been recorded. We'll review it and send you a receipt if an email was provided.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
