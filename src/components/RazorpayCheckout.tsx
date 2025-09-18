'use client'

import { useState, useEffect } from 'react'

interface RazorpayOrderOptions {
  key: string
  amount: number
  currency: string
  order_id: string
  name: string
  description: string
  image?: string
  handler: (response: any) => void
  prefill: {
    name: string
    email: string
    contact: string
  }
  notes: any
  theme: {
    color: string
  }
  modal: {
    ondismiss: () => void
  }
}

declare global {
  interface Window {
    Razorpay: any
  }
}

interface RazorpayCheckoutProps {
  amount: number
  currency?: string
  name?: string
  email?: string
  contact?: string
  description?: string
  notes?: Record<string, any>
  onSuccess?: (response: any) => void
  onError?: (error: any) => void
  className?: string
  children?: React.ReactNode
}

export default function RazorpayCheckout({
  amount,
  currency = 'INR',
  name = 'Anonymous',
  email = '',
  contact = '',
  description = 'Donation to Mahatee Ashramam',
  notes = {},
  onSuccess,
  onError,
  className = '',
  children
}: RazorpayCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      setRazorpayLoaded(true)
      return
    }

    // Load Razorpay script
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => {
      setRazorpayLoaded(true)
    }
    script.onerror = () => {
      setLoadError(true)
    }

    document.body.appendChild(script)

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  const handlePayment = async () => {
    if (!window.Razorpay) {
      console.error('Razorpay not loaded')
      return
    }

    setIsLoading(true)

    try {
      // Create order from our API
      const orderResponse = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          receipt: `donation_${Date.now()}`,
          notes: {
            donor_name: name,
            donor_email: email,
            donor_contact: contact,
            ...notes
          }
        })
      })

      const orderData = await orderResponse.json()

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order')
      }

      console.log('Order created:', orderData.orderId)

      // Razorpay checkout options
      const options: RazorpayOrderOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: orderData.amount, // Amount in paise
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: 'Mahatee Ashramam',
        description,
        image: '/logo.png', // Add your logo here
        handler: function (response: any) {
          console.log('Payment successful:', response)

          // Payment successful
          if (onSuccess) {
            onSuccess({
              ...response,
              amount: amount,
              currency: currency,
              donorName: name,
              donorEmail: email,
              donorContact: contact
            })
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: contact
        },
        notes: notes as any,
        theme: {
          color: '#f97316' // Orange color to match your site
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal closed')
            setIsLoading(false)
          }
        }
      }

      const razorpayInstance = new window.Razorpay(options)

      razorpayInstance.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error)

        if (onError) {
          onError(response.error)
        }

        setIsLoading(false)
      })

      // Open payment modal
      razorpayInstance.open()

    } catch (error) {
      console.error('Error initiating payment:', error)

      if (onError) {
        onError(error)
      }

      setIsLoading(false)
    }
  }

  // Show loading state if Razorpay is not loaded
  if (!razorpayLoaded && !loadError) {
    return (
      <button disabled className={`opacity-50 cursor-not-allowed ${className}`}>
        Loading payment...
      </button>
    )
  }

  // Show error if Razorpay failed to load
  if (loadError) {
    return (
      <button disabled className={`opacity-50 cursor-not-allowed ${className}`}>
        Payment unavailable
      </button>
    )
  }

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading || !amount}
      className={`${className} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Processing...
        </div>
      ) : (
        children || `Pay ₹${amount.toLocaleString('hi-IN')}`
      )}
    </button>
  )
}