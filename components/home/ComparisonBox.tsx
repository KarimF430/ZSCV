'use client'

import Link from 'next/link'
import { IndianRupee, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Car {
  id: number
  name: string
  brand: string
  startingPrice: number
  slug: string
}

export default function ComparisonBox() {
  // Mock comparison cars data - matching the reference image
  const cars: Car[] = [
    {
      id: 1,
      name: 'Victoris',
      brand: 'Maruti',
      startingPrice: 1050000,
      slug: 'maruti-victoris'
    },
    {
      id: 2,
      name: 'Grand Vitara',
      brand: 'Maruti',
      startingPrice: 1142000,
      slug: 'maruti-grand-vitara'
    },
    {
      id: 3,
      name: 'Nexon',
      brand: 'Tata',
      startingPrice: 800000,
      slug: 'tata-nexon'
    }
  ]

  const handleCompareClick = (carIds: number[]) => {
    const carSlugs = carIds.map(id => cars.find(car => car.id === id)?.slug).join(',')
    window.location.href = `/compare?cars=${carSlugs}`
  }

  const formatPrice = (price: number) => {
    return (price / 100000).toFixed(2)
  }

  // Car silhouette SVG component with improved colors
  const CarSilhouette = ({ color = "#3B82F6" }: { color?: string }) => (
    <svg 
      width="240" 
      height="140" 
      viewBox="0 0 240 140" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      <path 
        d="M20 100h12l6-12h164l6 12h12c6 0 12-6 12-12V70c0-18-12-30-30-30H180l-12-12H72l-12 12H30c-18 0-30 12-30 30v18c0 6 6 12 12 12z" 
        fill={color}
      />
      <circle cx="55" cy="108" r="10" fill="#1F2937"/>
      <circle cx="185" cy="108" r="10" fill="#1F2937"/>
      <rect x="75" y="45" width="90" height="20" rx="3" fill="#F3F4F6"/>
      <rect x="85" y="50" width="70" height="12" rx="2" fill="#FFFFFF"/>
    </svg>
  )

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Compare Cars</h2>
          <p className="text-gray-600 text-lg">Find the perfect car for your needs</p>
        </div>

        {/* Horizontal Scrollable Car Cards */}
        <div className="flex gap-6 overflow-x-auto pb-8 pt-4 px-8 scrollbar-hide">
          {cars.map((car, index) => (
            <div key={car.id} className="flex-shrink-0 w-[320px] bg-white rounded-3xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Car Image */}
              <div className="relative h-40 mb-6 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
                <CarSilhouette 
                  color={
                    car.brand === 'Maruti' 
                      ? (car.name === 'Victoris' ? '#10B981' : '#3B82F6')
                      : '#EF4444'
                  } 
                />
              </div>
              
              {/* Car Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">{car.brand}</p>
                  <h3 className="text-gray-900 font-bold text-2xl mt-1">{car.name}</h3>
                </div>
                <div className="text-gray-800 font-bold text-xl">
                  ₹ {formatPrice(car.startingPrice)} Lakh
                  <span className="text-gray-500 text-base font-normal ml-2">onwards</span>
                </div>
                
                {/* Compare Now Button */}
                <button
                  onClick={() => handleCompareClick([car.id])}
                  className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Compare Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Compare Cars of Your Choice Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => window.location.href = '/compare'}
            className="w-full max-w-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-8 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Compare Cars of Your Choice
          </button>
        </div>
      </div>
    </section>
  )
}
