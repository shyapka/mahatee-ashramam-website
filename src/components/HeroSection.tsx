'use client'

import Link from 'next/link'
import { trackDonationClick } from '@/utils/analytics'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 to-blue-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <img 
                  src="/images/logo/mahatee-logo.png" 
                  alt="Mahatee Ashramam Logo" 
                  className="h-16 w-auto"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Every Child Deserves <br />
              <span className="text-orange-500">Love, Shelter & Education</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              At Mahatee Ashramam, we are building brighter futures for underprivileged 
              children in Telangana. Join us in nurturing not just their minds, but their 
              hearts and hopes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/donate" 
              onClick={() => trackDonationClick({ location: 'homepage', source: 'hero_sponsor' })}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
            >
              Sponsor a Child
            </Link>
            <Link href="/donate" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg">
              Donate Now
            </Link>
            <Link href="/get-involved" className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg">
              Volunteer
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">100+</h3>
              <p className="text-gray-600">Children Cared For</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Years of Service</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
              <p className="text-gray-600">Residential Care</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}