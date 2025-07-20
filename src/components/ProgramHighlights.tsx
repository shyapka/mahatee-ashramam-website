'use client'

import Link from 'next/link'

export default function ProgramHighlights() {
  const programs = [
    {
      icon: '🍽️',
      title: 'Nutritious Meals',
      description: 'Three wholesome meals a day, clean drinking water, and hygiene education to help children grow healthy and strong.',
      color: 'orange'
    },
    {
      icon: '🏠',
      title: 'Safe Shelter',
      description: 'Round-the-clock shelter, safety, and community living in a clean, loving environment.',
      color: 'blue'
    },
    {
      icon: '🎓',
      title: 'Quality Education',
      description: 'Children are enrolled in local schools and receive tutoring, digital literacy training, and personal development support.',
      color: 'orange'
    },
    {
      icon: '🎨',
      title: 'Arts & Extracurricular',
      description: 'From dance and art to yoga and spoken English, our children participate in a variety of enriching activities.',
      color: 'blue'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive care that addresses every aspect of a child's development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{program.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {program.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {program.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/programs" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Learn More About Our Programs
          </Link>
        </div>
      </div>
    </section>
  )
}