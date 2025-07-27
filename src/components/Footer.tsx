'use client'

import Link from 'next/link'
import { Heart, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/images/logo/mahatee-logo.png" 
                alt="Mahatee Ashramam Logo" 
                className="h-10 w-auto"
              />
              <Heart className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold">Mahatee Ashramam</span>
            </div>
            <p className="text-gray-300 mb-4">
              Building brighter futures for underprivileged children through love, education, 
              and care. Every child deserves a chance to dream and succeed.
            </p>
            <div className="flex space-x-2">
              <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm">
                100+ children cared for
              </span>
              <span className="bg-secondary-500 text-white px-3 py-1 rounded-full text-sm">
                15+ years of service
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/programs" className="text-gray-300 hover:text-white transition-colors">Programs</Link></li>
              <li><Link href="/gallery" className="text-gray-300 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link href="/get-involved" className="text-gray-300 hover:text-white transition-colors">Get Involved</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-500 mt-1" />
                <div>
                  <p className="text-gray-300 text-sm">Mahatee Ashramam</p>
                  <p className="text-gray-300 text-sm">Telangana, India</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-500" />
                <p className="text-gray-300 text-sm">+91 XXXXX XXXXX</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-500" />
                <p className="text-gray-300 text-sm">contact@mahateeashramam.org</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Mahatee Ashramam. All rights reserved. Built with ❤️ for a noble cause.
          </p>
        </div>
      </div>
    </footer>
  )
}