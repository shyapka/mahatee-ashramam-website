'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      setIsSubmitting(false)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: '📍',
      title: 'Address',
      details: [
        'Mahatee Ashramam',
        'Village Name, District',
        'Telangana, India - 500XXX'
      ]
    },
    {
      icon: '📞',
      title: 'Phone',
      details: [
        '+91 XXXXX XXXXX',
        '+91 XXXXX XXXXX'
      ]
    },
    {
      icon: '📧',
      title: 'Email',
      details: [
        'contact@mahateeashramam.org',
        'info@mahateeashramam.org'
      ]
    },
    {
      icon: '🕒',
      title: 'Visiting Hours',
      details: [
        'Monday - Saturday: 9:00 AM - 6:00 PM',
        'Sunday: By appointment only'
      ]
    }
  ]

  const quickActions = [
    {
      title: 'Emergency Contact',
      description: 'For urgent matters regarding child welfare',
      action: 'Call Now',
      color: 'red'
    },
    {
      title: 'Volunteer Inquiry',
      description: 'Interested in volunteering with us?',
      action: 'Get Started',
      color: 'blue'
    },
    {
      title: 'Donation Help',
      description: 'Need assistance with donations?',
      action: 'Contact Support',
      color: 'green'
    },
    {
      title: 'Media & Press',
      description: 'Press inquiries and media requests',
      action: 'Media Kit',
      color: 'purple'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact <span className="text-orange-500">Us</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you. Get in touch with us for any questions, 
            support, or to learn more about our mission.
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center bg-gray-50 p-6 rounded-lg">
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="volunteer">Volunteer Opportunity</option>
                      <option value="donation">Donation Related</option>
                      <option value="partnership">Partnership Proposal</option>
                      <option value="media">Media Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Find Us
                </h3>
                <div className="aspect-video bg-gradient-to-br from-green-200 to-blue-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p className="text-gray-600 font-medium">Interactive Map</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Google Maps integration would be here
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                    Get Directions
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Quick Actions
                </h3>
                <div className="space-y-4">
                  {quickActions.map((action, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {action.title}
                          </h4>
                          <p className="text-gray-600 text-sm mb-3">
                            {action.description}
                          </p>
                        </div>
                      </div>
                      <button className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors ${
                        action.color === 'red' ? 'bg-red-500 hover:bg-red-600 text-white' :
                        action.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600 text-white' :
                        action.color === 'green' ? 'bg-green-500 hover:bg-green-600 text-white' :
                        'bg-purple-500 hover:bg-purple-600 text-white'
                      }`}>
                        {action.action}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our organization and services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How can I visit the ashramam?",
                answer: "Visitors are welcome during our visiting hours (9 AM - 6 PM, Mon-Sat). Please call ahead to schedule your visit."
              },
              {
                question: "What items can I donate?",
                answer: "We accept clothes, books, educational materials, toys, and non-perishable food items. Please contact us before bringing donations."
              },
              {
                question: "How do I become a volunteer?",
                answer: "Fill out our volunteer application form and attend an orientation session. We welcome volunteers for teaching, activities, and administrative support."
              },
              {
                question: "Is my donation tax-deductible?",
                answer: "Yes, we are a registered nonprofit organization. You will receive a tax-deductible receipt for all donations."
              },
              {
                question: "Can I sponsor a specific child?",
                answer: "Yes! Our child sponsorship program allows you to support a specific child's education and care. Contact us for more details."
              },
              {
                question: "How are funds utilized?",
                answer: "We maintain complete transparency. 85% goes directly to child care, 10% to infrastructure, and 5% to administration. Annual reports are available."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-sm">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
            <div className="text-4xl mb-4">🚨</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Emergency Contact
            </h2>
            <p className="text-gray-600 mb-6">
              For urgent matters regarding child welfare or emergency situations, 
              please contact us immediately.
            </p>
            <div className="space-y-3">
              <div className="text-xl font-semibold text-red-600">
                Emergency Hotline: +91 XXXXX XXXXX
              </div>
              <div className="text-gray-600">
                Available 24/7 for emergencies
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}