'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DonatePage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Try to detect user location
    const detectLocationAndRedirect = async () => {
      try {
        // First try geolocation API
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              // For now, we'll use IP-based detection as backup
              detectByIP()
            },
            () => {
              // Geolocation failed, try IP detection
              detectByIP()
            },
            { timeout: 5000 }
          )
        } else {
          detectByIP()
        }
      } catch (err) {
        console.error('Location detection failed:', err)
        setError(true)
        setLoading(false)
      }
    }

    const detectByIP = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        
        if (data.country_code === 'US') {
          router.push('/donate/us')
        } else if (data.country_code === 'IN') {
          router.push('/donate/india')
        } else {
          // Default to US page for international donors
          router.push('/donate/us')
        }
      } catch (err) {
        console.error('IP detection failed:', err)
        // Default to showing both options
        setError(true)
        setLoading(false)
      }
    }

    detectLocationAndRedirect()
  }, [router])

  if (loading && !error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Detecting your location...
          </h2>
          <p className="text-gray-600">
            We're personalizing your donation experience
          </p>
        </div>
      </div>
    )
  }

  // Show manual selection if detection fails
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your <span className="text-orange-500">Donation</span> Experience
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide different donation methods based on your location for the best experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* US Donors */}
          <div 
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500"
            onClick={() => router.push('/donate/us')}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🇺🇸</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                US Donors
              </h3>
              <p className="text-gray-600 mb-6">
                Donation options in USD with international transfer instructions
              </p>
              <ul className="text-left space-y-2 mb-6 text-sm text-gray-700">
                <li>• Sponsor One Day Meal - $50</li>
                <li>• Sponsor a Child - $1000/year</li>
                <li>• Provide Monthly Meals - $1500</li>
              </ul>
              <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                Donate from US
              </button>
            </div>
          </div>

          {/* Indian Donors */}
          <div 
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-orange-500"
            onClick={() => router.push('/donate/india')}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🇮🇳</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Indian Donors
              </h3>
              <p className="text-gray-600 mb-6">
                Donation options in INR with local payment methods
              </p>
              <ul className="text-left space-y-2 mb-6 text-sm text-gray-700">
                <li>• UPI Payments</li>
                <li>• Direct Bank Transfer</li>
                <li>• Razorpay Integration</li>
              </ul>
              <button className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                Donate from India
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Can't find your location? Choose the option that works best for you above.
          </p>
        </div>
      </div>
    </div>
  )
}
