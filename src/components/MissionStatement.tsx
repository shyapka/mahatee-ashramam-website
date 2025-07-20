'use client'

export default function MissionStatement() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Our Mission
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Founded with compassion and purpose, Mahatee Ashramam provides food, shelter, 
              and education to orphaned and downtrodden children. Our goal is to nurture 
              not just their minds, but their hearts and hopes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-orange-700 mb-3">
                  Our Vision
                </h3>
                <p className="text-gray-600">
                  To create a world where every child, regardless of their background, 
                  has access to love, care, and quality education that empowers them 
                  to build a better future.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">
                  Our Values
                </h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Compassion and Care</li>
                  <li>• Inclusive Education</li>
                  <li>• Holistic Development</li>
                  <li>• Transparency and Trust</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}