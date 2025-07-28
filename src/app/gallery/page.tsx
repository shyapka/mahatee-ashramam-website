'use client'

import { useState, useEffect } from 'react'
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from '@/config/gallery'

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const categories = GALLERY_CATEGORIES
  const galleryItems = GALLERY_IMAGES

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedImage) {
        closeModal()
      }
    }

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden' // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-orange-500">Gallery</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            "A picture is worth a thousand smiles" - Witness the joy, growth, 
            and precious moments of our children's journey.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => openModal(item.image)}
              >
                {/* Actual image */}
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.classList.add('bg-gradient-to-br', 'from-orange-200', 'to-blue-200', 'flex', 'items-center', 'justify-center');
                      target.parentElement!.innerHTML = '<div class="text-center p-4"><div class="text-4xl mb-2">📸</div><p class="text-sm text-gray-600 font-medium">' + item.title + '</p></div>';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-3">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      item.category === 'school' ? 'bg-blue-100 text-blue-800' :
                      item.category === 'daily' ? 'bg-green-100 text-green-800' :
                      item.category === 'celebrations' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {categories.find(c => c.id === item.category)?.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No photos in this category yet
              </h3>
              <p className="text-gray-600">
                Check back soon for more wonderful moments!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">500+</div>
              <p className="text-gray-600">Photos Captured</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-500 mb-2">50+</div>
              <p className="text-gray-600">Events Documented</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-500 mb-2">100+</div>
              <p className="text-gray-600">Smiles Preserved</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-500 mb-2">5+</div>
              <p className="text-gray-600">Years of Memories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Updates */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recent Highlights
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Latest moments and milestones from our children's journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-4xl">🎨</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Art Exhibition 2024
              </h3>
              <p className="text-gray-600 mb-3">
                Children showcased their artistic talents in our annual art exhibition
              </p>
              <span className="text-sm text-orange-500 font-medium">
                Added 2 days ago
              </span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-green-200 to-teal-200 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-4xl">🏆</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Academic Excellence Awards
              </h3>
              <p className="text-gray-600 mb-3">
                Celebrating our top performers in academics and extracurricular activities
              </p>
              <span className="text-sm text-orange-500 font-medium">
                Added 1 week ago
              </span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-yellow-200 to-orange-200 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-4xl">🎭</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Cultural Performance
              </h3>
              <p className="text-gray-600 mb-3">
                Traditional dance and music performance by our talented children
              </p>
              <span className="text-sm text-orange-500 font-medium">
                Added 2 weeks ago
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for full-size image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white text-4xl hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
              <img 
                src={selectedImage} 
                alt="Gallery image"
                className="w-full h-auto max-h-[80vh] object-contain"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'aspect-video bg-gradient-to-br from-orange-200 to-blue-200 flex items-center justify-center p-8';
                  fallback.innerHTML = '<div class="text-center"><div class="text-6xl mb-4">📸</div><p class="text-gray-600">Image could not be loaded</p></div>';
                  target.parentElement!.appendChild(fallback);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Be Part of These Memories
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Your support helps create these precious moments and bright futures for our children
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
              Sponsor a Child
            </button>
            <button className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              Volunteer With Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}