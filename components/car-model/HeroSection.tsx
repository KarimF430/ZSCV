'use client'

import { useState } from 'react'
import { Star, Share2, Heart, Camera, Play, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface HeroSectionProps {
  carData: {
    brand: string
    model: string
    fullName: string
    rating: number
    reviewCount: number
    description: string
    images: string[]
  }
}

export default function HeroSection({ carData }: HeroSectionProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % carData.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + carData.images.length) % carData.images.length)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
      {/* Car Name and Rating */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          {carData.fullName}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${
                    i < Math.floor(carData.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm sm:text-base font-semibold text-gray-900">{carData.rating}</span>
            <span className="text-xs sm:text-sm text-gray-600 ml-1">
              ({carData.reviewCount.toLocaleString()} reviews)
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                isWishlisted
                  ? 'bg-red-50 border-red-200 text-red-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">Wishlist</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Image */}
        <div className="lg:col-span-2">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video sm:aspect-[4/3]">
            <img
              src={carData.images[selectedImage] || '/api/placeholder/800/600'}
              alt={`${carData.fullName} - Image ${selectedImage + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
            </button>

            {/* Action Buttons Overlay */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex gap-2">
              <button 
                onClick={() => setIsFullscreen(true)}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
              >
                <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
              </button>
              <button className="w-8 h-8 sm:w-10 sm:h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors">
                <Camera className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
              </button>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black/50 text-white px-2 py-1 rounded text-xs sm:text-sm">
              {selectedImage + 1} / {carData.images.length}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-2 mt-3 sm:mt-4 overflow-x-auto pb-2">
            {carData.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-orange-500' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={image || '/api/placeholder/80/60'}
                  alt={`${carData.fullName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Car Info */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">About {carData.model}</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {carData.description}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2 sm:space-y-3">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-colors text-sm sm:text-base">
              Get On Road Price
            </button>
            <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-colors text-sm sm:text-base">
              Book Test Drive
            </button>
            <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-colors text-sm sm:text-base">
              Download Brochure
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white z-10"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={carData.images[selectedImage] || '/api/placeholder/800/600'}
            alt={`${carData.fullName} - Fullscreen`}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  )
}
