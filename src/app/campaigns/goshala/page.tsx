'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Heart, Target, Calendar, Share2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function GoshalaCampaignPage() {
  const images = [
    '/images/goshala/94567927_1757642509576720_r.webp',
    '/images/goshala/94567927_1757642583759525_r.jpeg',
    '/images/goshala/94567927_1757642594454466_r.jpeg'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-orange-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <span className="text-3xl">🐄</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Support Our <span className="text-orange-500">Goshala</span> Project
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Help us build a proper cow shelter to provide better care for our beloved cows.
                Every contribution brings us closer to completing this sacred mission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.gofundme.com/f/funds-needed-to-build-cow-shed-india"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Donate on GoFundMe
                </a>
                <button className="inline-flex items-center px-8 py-4 border-2 border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-50 transition-colors">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share Campaign
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-video bg-white rounded-xl shadow-xl overflow-hidden">
                <Image
                  src={images[0]}
                  alt="Goshala cow shelter"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Campaign Progress */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Campaign Progress
            </h2>
            <p className="text-lg text-gray-600">
              Together we can provide a safe and comfortable home for our cows
            </p>
          </motion.div>

          <div className="bg-gradient-to-r from-orange-50 to-green-50 rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Target className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Goal</h3>
                <p className="text-lg text-gray-600">Building a proper cow shelter</p>
              </div>
              <div>
                <Heart className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Impact</h3>
                <p className="text-lg text-gray-600">Better care for our cows</p>
              </div>
              <div>
                <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Timeline</h3>
                <p className="text-lg text-gray-600">Ongoing construction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Project */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why This Project Matters
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Our Goshala (cow shelter) is home to several cows that have been rescued or
                  donated to our ashram. These gentle creatures are not just animals to us -
                  they are part of our spiritual and sustainable farming practices.
                </p>
                <p>
                  Currently, our cows are housed in temporary facilities that don't provide
                  adequate protection from harsh weather conditions. The new cow shed will
                  feature proper drainage, ventilation, and separate areas for feeding and rest.
                </p>
                <p>
                  This project aligns with our mission of compassionate care - not just for
                  children, but for all living beings under our care. The cows also contribute
                  to our ashram's sustainability through organic farming practices.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Project Benefits:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="text-gray-700">Weather-protected housing for cows</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="text-gray-700">Improved hygiene and health conditions</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="text-gray-700">Better milk production for the ashram</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="text-gray-700">Sustainable and ethical farming practices</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {images.slice(1).map((image, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`Goshala image ${index + 2}`}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Every Contribution Counts
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join us in creating a safe and comfortable home for our cows.
              Your support helps us practice compassionate care for all living beings.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.gofundme.com/f/funds-needed-to-build-cow-shed-india"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-orange-500 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Donate Now on GoFundMe
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-orange-500 transition-colors"
              >
                Contact Us for More Info
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-orange-400">
              <p className="text-lg opacity-90">
                Share this campaign with friends and family to help us reach our goal!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Connection to Main Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Part of Our Larger Mission
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              The Goshala project is an integral part of Mahatee Ashramam's commitment to
              compassionate care, sustainability, and holistic development. Just as we nurture
              children, we also care for all living beings in our community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/programs"
                className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Learn About Our Programs
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-50 transition-colors"
              >
                About Our Mission
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}