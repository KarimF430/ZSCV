'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ComparisonCar {
  id: string
  name: string
  brand: string
  price: string
  image: string
}

interface CarComparisonSectionProps {
  comparisonCars: ComparisonCar[]
}

export default function CarComparisonSection({ comparisonCars }: CarComparisonSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextCar = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, comparisonCars.length - 2))
  }

  const prevCar = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, comparisonCars.length - 2)) % Math.max(1, comparisonCars.length - 2))
  }

  return (
    <section className="py-8 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Compare with similar cars
        </h2>

        {/* Comparison Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button 
            onClick={prevCar}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center justify-center group"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
          </button>

          <button 
            onClick={nextCar}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center justify-center group"
          >
            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
          </button>

          {/* Comparison Cards */}
          <div className="flex space-x-4 overflow-hidden relative">
            {comparisonCars.slice(currentIndex, currentIndex + 3).map((car, index) => (
              <div key={car.id} className="flex-1 min-w-0 relative">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Car Image */}
                  <div className="relative h-36 bg-gray-100 flex items-center justify-center p-2">
                    {/* Photorealistic car representations */}
                    <div className="w-full h-full flex items-center justify-center relative">
                      {index === 0 && (
                        <div className="relative w-full h-full">
                          {/* Blue Hyundai Tucson - More realistic representation */}
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-lg relative overflow-hidden">
                            {/* Car silhouette shape */}
                            <div className="absolute inset-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-md">
                              {/* Front section */}
                              <div className="absolute right-0 top-2 bottom-2 w-6 bg-gradient-to-l from-blue-700 to-blue-600 rounded-r-md"></div>
                              {/* Windshield */}
                              <div className="absolute top-1 left-4 right-8 h-4 bg-gradient-to-b from-sky-200 to-sky-300 rounded-t-lg opacity-80"></div>
                              {/* Side windows */}
                              <div className="absolute top-1 left-12 right-12 h-3 bg-gradient-to-b from-sky-100 to-sky-200 rounded opacity-70"></div>
                              {/* Wheels */}
                              <div className="absolute bottom-0 left-2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600"></div>
                              <div className="absolute bottom-0 right-8 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600"></div>
                              {/* Wheel centers */}
                              <div className="absolute bottom-2 left-4 w-2 h-2 bg-silver rounded-full"></div>
                              <div className="absolute bottom-2 right-10 w-2 h-2 bg-silver rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      )}
                      {index === 1 && (
                        <div className="relative w-full h-full">
                          {/* Red Tata Nexon - More realistic representation */}
                          <div className="w-full h-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-lg shadow-lg relative overflow-hidden">
                            {/* Car silhouette shape */}
                            <div className="absolute inset-2 bg-gradient-to-r from-red-400 to-red-600 rounded-md">
                              {/* Front section */}
                              <div className="absolute right-0 top-2 bottom-2 w-6 bg-gradient-to-l from-red-800 to-red-700 rounded-r-md"></div>
                              {/* Windshield */}
                              <div className="absolute top-1 left-4 right-8 h-4 bg-gradient-to-b from-orange-200 to-orange-300 rounded-t-lg opacity-80"></div>
                              {/* Side windows */}
                              <div className="absolute top-1 left-12 right-12 h-3 bg-gradient-to-b from-orange-100 to-orange-200 rounded opacity-70"></div>
                              {/* Wheels */}
                              <div className="absolute bottom-0 left-2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600"></div>
                              <div className="absolute bottom-0 right-8 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600"></div>
                              {/* Wheel centers */}
                              <div className="absolute bottom-2 left-4 w-2 h-2 bg-silver rounded-full"></div>
                              <div className="absolute bottom-2 right-10 w-2 h-2 bg-silver rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      )}
                      {index === 2 && (
                        <div className="relative w-full h-full">
                          {/* Blue Hyundai Tucson - More realistic representation */}
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg shadow-lg relative overflow-hidden">
                            {/* Car silhouette shape */}
                            <div className="absolute inset-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-md">
                              {/* Front section */}
                              <div className="absolute right-0 top-2 bottom-2 w-6 bg-gradient-to-l from-blue-700 to-blue-600 rounded-r-md"></div>
                              {/* Windshield */}
                              <div className="absolute top-1 left-4 right-8 h-4 bg-gradient-to-b from-sky-200 to-sky-300 rounded-t-lg opacity-80"></div>
                              {/* Side windows */}
                              <div className="absolute top-1 left-12 right-12 h-3 bg-gradient-to-b from-sky-100 to-sky-200 rounded opacity-70"></div>
                              {/* Wheels */}
                              <div className="absolute bottom-0 left-2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600"></div>
                              <div className="absolute bottom-0 right-8 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600"></div>
                              {/* Wheel centers */}
                              <div className="absolute bottom-2 left-4 w-2 h-2 bg-silver rounded-full"></div>
                              <div className="absolute bottom-2 right-10 w-2 h-2 bg-silver rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Car Details */}
                  <div className="p-4 text-center">
                    <p className="text-gray-600 text-sm mb-1">{car.brand}</p>
                    <h3 className="text-red-500 font-bold text-base mb-2">{car.name}</h3>
                    <p className="text-gray-700 text-sm">₹ {car.price}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* VS Badge positioned between first and second card */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-xs z-20 border-2 border-white shadow-lg">
              VS
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
