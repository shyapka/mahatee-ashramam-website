'use client'

import { motion } from 'framer-motion'
import { Utensils, Home, GraduationCap, Palette, Heart, Clock, Users, Award } from 'lucide-react'

export default function ProgramsPage() {
  const programs = [
    {
      icon: Utensils,
      title: 'Food & Nutrition',
      description: 'Three wholesome meals a day, clean drinking water, and hygiene education to help children grow healthy and strong.',
      features: [
        'Nutritious breakfast, lunch, and dinner',
        'Clean drinking water access',
        'Hygiene and health education',
        'Special dietary care for medical needs'
      ],
      color: 'primary'
    },
    {
      icon: Home,
      title: 'Residential Care',
      description: 'Round-the-clock shelter, safety, and community living in a clean, loving environment.',
      features: [
        '24/7 supervised care',
        'Safe and secure dormitories',
        'Clean facilities and maintenance',
        'Family-like environment'
      ],
      color: 'secondary'
    },
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'Children are enrolled in local schools and receive tutoring, digital literacy training, and personal development support.',
      features: [
        'Enrollment in quality local schools',
        'After-school tutoring support',
        'Digital literacy training',
        'Career guidance and counseling'
      ],
      color: 'primary'
    },
    {
      icon: Palette,
      title: 'Life Skills & Extra-Curriculars',
      description: 'From dance and art to yoga and spoken English, our children participate in a variety of enriching activities.',
      features: [
        'Arts and crafts workshops',
        'Dance and music classes',
        'Yoga and physical fitness',
        'Spoken English and communication skills'
      ],
      color: 'secondary'
    }
  ]

  const stats = [
    { icon: Clock, number: '24/7', label: 'Care & Support' },
    { icon: Users, number: '100+', label: 'Children Served' },
    { icon: Award, number: '15+', label: 'Years Experience' },
    { icon: Heart, number: '100%', label: 'Love & Dedication' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-primary-500">Programs</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive care that addresses every aspect of a child's development, 
              from basic needs to education and personal growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Detail */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Care Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each program is designed to support the holistic development of every child
            </p>
          </motion.div>

          <div className="space-y-16">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className={`bg-${program.color}-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                    <program.icon className={`h-8 w-8 text-${program.color}-500`} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {program.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {program.description}
                  </p>
                  <ul className="space-y-3">
                    {program.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full bg-${program.color}-500`}></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`bg-white p-8 rounded-lg shadow-lg ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <program.icon className={`h-24 w-24 text-${program.color}-300`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              A Day in the Life
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how our structured daily routine supports learning and growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { time: '6:00 AM', activity: 'Wake up & Morning Exercise', icon: '🌅' },
              { time: '7:00 AM', activity: 'Personal Hygiene & Breakfast', icon: '🥐' },
              { time: '8:30 AM', activity: 'School Time', icon: '📚' },
              { time: '3:30 PM', activity: 'Return from School & Lunch', icon: '🍽️' },
              { time: '4:30 PM', activity: 'Homework & Study Time', icon: '✏️' },
              { time: '6:00 PM', activity: 'Extracurricular Activities', icon: '🎨' },
              { time: '7:30 PM', activity: 'Dinner & Family Time', icon: '👨‍👩‍👧‍👦' },
              { time: '8:30 PM', activity: 'Evening Studies', icon: '📖' },
              { time: '10:00 PM', activity: 'Rest & Sleep', icon: '😴' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-1">{item.time}</h4>
                <p className="text-gray-600 text-sm">{item.activity}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Support Our Programs
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Your contribution helps us maintain and improve these essential programs 
              that transform children's lives every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-500 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                Sponsor a Program
              </button>
              <button className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                Make a Donation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}