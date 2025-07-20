'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function GetInvolvedPage() {

  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    availability: ''
  })



  const volunteerOpportunities = [
    {
      title: 'Teaching & Tutoring',
      description: 'Help children with homework and conduct educational workshops',
      commitment: '2-4 hours/week',
      skills: 'Teaching experience preferred'
    },
    {
      title: 'Arts & Crafts',
      description: 'Conduct creative workshops and art classes',
      commitment: '1-2 hours/week',
      skills: 'Artistic skills, creativity'
    },
    {
      title: 'Sports & Activities',
      description: 'Organize sports, games, and physical activities',
      commitment: '2-3 hours/week',
      skills: 'Sports background helpful'
    },
    {
      title: 'Administrative Support',
      description: 'Help with paperwork, documentation, and organization',
      commitment: 'Flexible',
      skills: 'Computer skills, organization'
    }
  ]

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle volunteer form submission
    console.log('Volunteer form submitted:', volunteerForm)
    alert('Thank you for your interest! We will contact you soon.')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get <span className="text-orange-500">Involved</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us in transforming lives. Every contribution, big or small, 
            makes a difference in a child's future.
          </p>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Make a <span className="text-orange-500">Donation</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Your generosity directly supports the children's education, nutrition, 
              and overall well-being. We provide localized donation experiences for donors worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* For US Donors */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-5xl mb-4">🇺🇸</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  US Donors
                </h3>
                <p className="text-gray-600 mb-6">
                  Donation options in USD with international transfer options
                </p>
                <div className="space-y-2 mb-6 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>• Sponsor One Day Meal:</span>
                    <span className="font-semibold">$50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Sponsor a Child:</span>
                    <span className="font-semibold">$1000/year</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Monthly Meals:</span>
                    <span className="font-semibold">$1500</span>
                  </div>
                </div>
                <Link href="/donate/us">
                  <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                    Donate from US
                  </button>
                </Link>
              </div>
            </div>

            {/* For Indian Donors */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-5xl mb-4">🇮🇳</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Indian Donors
                </h3>
                <p className="text-gray-600 mb-6">
                  Donation options in INR with local payment methods
                </p>
                <div className="space-y-2 mb-6 text-sm text-gray-700">
                  <div>• UPI Payments (GPay, PhonePe)</div>
                  <div>• Direct Bank Transfer</div>
                  <div>• Razorpay Integration</div>
                  <div>• 80G Tax Benefits Available</div>
                </div>
                <Link href="/donate/india">
                  <button className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                    Donate from India
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Not sure which option? Let us detect your location automatically:
            </p>
            <Link href="/donate">
              <button className="bg-green-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                🌍 Auto-Detect & Donate
              </button>
            </Link>
          </div>
        </div>
      </section>



      {/* Sponsor a Child */}
      <section className="py-16 bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Sponsor a Child
              </h2>
              <p className="text-orange-100 text-lg mb-6">
                For just ₹1,500 per month, you can provide a child with:
              </p>
              <ul className="space-y-3 text-orange-100">
                <li className="flex items-center">
                  <span className="mr-3">✓</span>
                  Complete nutrition - 3 meals a day
                </li>
                <li className="flex items-center">
                  <span className="mr-3">✓</span>
                  Safe shelter and accommodation
                </li>
                <li className="flex items-center">
                  <span className="mr-3">✓</span>
                  Quality education and school supplies
                </li>
                <li className="flex items-center">
                  <span className="mr-3">✓</span>
                  Healthcare and medical support
                </li>
                <li className="flex items-center">
                  <span className="mr-3">✓</span>
                  Love, care, and guidance
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Start Sponsoring Today
              </h3>
              <Link href="/donate">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors mb-4">
                  Start Sponsoring Today
                </button>
              </Link>
              <p className="text-gray-600 text-center text-sm">
                You'll receive updates about your sponsored child's progress
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Volunteer With Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Share your time and skills to make a direct impact on children's lives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {volunteerOpportunities.map((opportunity, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {opportunity.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {opportunity.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Time Commitment:</span>
                    <span className="text-gray-600">{opportunity.commitment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Skills Needed:</span>
                    <span className="text-gray-600">{opportunity.skills}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Volunteer Form */}
          <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Volunteer Application
            </h3>
            <form onSubmit={handleVolunteerSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={volunteerForm.name}
                    onChange={(e) => setVolunteerForm({...volunteerForm, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={volunteerForm.email}
                    onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={volunteerForm.phone}
                  onChange={(e) => setVolunteerForm({...volunteerForm, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills & Experience
                </label>
                <textarea
                  rows={4}
                  value={volunteerForm.skills}
                  onChange={(e) => setVolunteerForm({...volunteerForm, skills: e.target.value})}
                  placeholder="Tell us about your skills, experience, and how you'd like to help..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <input
                  type="text"
                  value={volunteerForm.availability}
                  onChange={(e) => setVolunteerForm({...volunteerForm, availability: e.target.value})}
                  placeholder="e.g., Weekends, weekday evenings, flexible"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Partner With Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We welcome collaborations with organizations that share our mission
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🏫</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Schools & Colleges
              </h3>
              <p className="text-gray-600">
                Educational partnerships for student exchange programs and learning initiatives
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Corporate Partners
              </h3>
              <p className="text-gray-600">
                CSR partnerships for sustainable impact and employee volunteer programs
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                NGO Collaborations
              </h3>
              <p className="text-gray-600">
                Joint initiatives with like-minded organizations for greater impact
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Discuss Partnership
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}