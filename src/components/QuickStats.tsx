'use client'

export default function QuickStats() {
  const stats = [
    {
      icon: '👥',
      number: '100+',
      label: 'Children Cared For',
      description: 'Currently providing love and support'
    },
    {
      icon: '🏠',
      number: '24x7',
      label: 'Residential Facility',
      description: 'Round-the-clock care and safety'
    },
    {
      icon: '📅',
      number: '15+',
      label: 'Years of Service',
      description: 'Dedicated to child welfare'
    },
    {
      icon: '💰',
      number: '100%',
      label: 'Donor-Funded',
      description: 'Transparent use of donations'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Impact by Numbers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how your support makes a real difference in the lives of children
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {stat.number}
              </h3>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {stat.label}
              </h4>
              <p className="text-gray-600 text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}