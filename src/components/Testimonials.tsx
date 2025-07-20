'use client'

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Before I came here, I didn't know what school was. Now, I want to become a teacher.",
      author: "Anitha",
      age: "12 years old",
      image: "/images/testimonial-1.jpg"
    },
    {
      quote: "Mahatee Ashramam gave me hope when I had none. Today, I'm studying to become a doctor.",
      author: "Ravi",
      age: "16 years old",
      image: "/images/testimonial-2.jpg"
    },
    {
      quote: "The aunties here care for us like their own children. I feel loved and safe.",
      author: "Priya",
      age: "10 years old",
      image: "/images/testimonial-3.jpg"
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Voices of Hope
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from the children whose lives have been transformed through love and care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg relative"
            >
              <div className="text-4xl text-orange-200 absolute top-4 left-4">❞</div>
              <div className="pt-8">
                <p className="text-gray-600 text-lg italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-orange-500 font-semibold text-lg">
                      {testimonial.author[0]}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.author}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {testimonial.age}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-orange-500 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              Be Part of Their Story
            </h3>
            <p className="text-orange-100 mb-6">
              Your support can help write the next chapter of hope for these children
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                Sponsor a Child - ₹1,500/month
              </button>
              <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                Make a Donation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}