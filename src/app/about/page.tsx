'use client'

import { motion } from 'framer-motion'
import { Heart, Users, Target, Shield, Book, Handshake } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Compassion and Care',
      description: 'Every decision we make is guided by love and empathy for the children in our care.'
    },
    {
      icon: Book,
      title: 'Inclusive Education',
      description: 'We believe education is the key to breaking the cycle of poverty and creating opportunities.'
    },
    {
      icon: Users,
      title: 'Holistic Development',
      description: 'We nurture not just academic growth, but emotional, social, and spiritual development.'
    },
    {
      icon: Shield,
      title: 'Transparency and Trust',
      description: 'We maintain complete transparency in our operations and use of donations.'
    }
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
            <div className="mb-8">
              <img 
                src="/images/logo/mahatee-logo.png" 
                alt="Mahatee Ashramam Logo" 
                className="h-16 w-auto mx-auto mb-6"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-primary-500">Mahatee Ashramam</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A beacon of hope for underprivileged children in Telangana, India. 
              Committed to providing a safe and nurturing environment for children who have no one else.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Mahatee Ashramam was founded over 15 years ago with a simple yet powerful dream: 
                to ensure no child in the region suffers due to poverty, abandonment, or neglect.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                What started as a small initiative to help a few children has grown into a 
                comprehensive care facility that provides round-the-clock support to over 100 children.
              </p>
              <p className="text-lg text-gray-600">
                Every child who comes to us carries their own story of struggle, but they leave 
                with hope, education, and the tools they need to build a brighter future.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-primary-50 p-8 rounded-lg"
            >
              <div className="text-center">
                <Target className="h-16 w-16 text-primary-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To provide orphaned and underprivileged children with love, shelter, 
                  education, and the opportunity to realize their full potential, breaking 
                  the cycle of poverty through compassionate care and quality education.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and shape the environment 
              we create for our children
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <value.icon className="h-6 w-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
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
              Our Leadership
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated individuals who make our mission possible
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-32 h-32 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Founder & Director
              </h3>
              <p className="text-gray-600 mb-4">
                Visionary leader who started this noble mission with a dream to 
                transform children's lives through love and education.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-32 h-32 bg-secondary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Book className="h-16 w-16 text-secondary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Education Coordinator
              </h3>
              <p className="text-gray-600 mb-4">
                Dedicated educator ensuring every child receives quality education 
                and academic support tailored to their needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-32 h-32 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Handshake className="h-16 w-16 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Community Outreach
              </h3>
              <p className="text-gray-600 mb-4">
                Building bridges with the community and creating partnerships 
                that benefit our children's development.
              </p>
            </motion.div>
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
              Join Our Mission
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Together, we can continue building brighter futures for these children. 
              Your support makes all the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-500 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                Get Involved
              </button>
              <button className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                Donate Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}