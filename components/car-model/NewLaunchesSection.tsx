'use client'

import { useState } from 'react'
import { Calendar, Fuel, Users, ChevronRight } from 'lucide-react'

interface NewLaunchCar {
  id: string
  name: string
  brand: string
  price: string
  launchDate: string
  fuelType: string
  seating: string
  image: string
  isNew: boolean
}

interface NewLaunchesSectionProps {
  newLaunches: NewLaunchCar[]
}

export default function NewLaunchesSection({ newLaunches }: NewLaunchesSectionProps) {
  return (
    <section className="py-8 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          New Launched Cars
        </h2>

        {/* Horizontal Scrollable Cars */}
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {newLaunches.map((car) => (
            <div key={car.id} className="flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden w-72">
              {/* Car Image */}
              <div className="relative h-32 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                {/* New Badge */}
                {car.isNew && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    NEW
                  </div>
                )}

                {/* Heart Icon */}
                <div className="absolute top-3 right-3 w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>

                {/* Car Placeholder */}
                <div className="text-center text-white">
                  <div className="w-20 h-12 bg-white bg-opacity-20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">CAR</span>
                  </div>
                  <p className="text-white text-sm font-medium">{car.name}</p>
                </div>
              </div>

              {/* Car Details */}
              <div className="p-4">
                {/* Car Name and Price */}
                <div className="mb-3">
                  <h3 className="text-gray-900 font-bold text-base mb-1">{car.name}</h3>
                  <p className="text-green-600 font-bold text-lg">₹ {car.price}</p>
                </div>

                {/* Car Specifications */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{car.launchDate}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <Fuel className="w-4 h-4 mr-2" />
                    <span>{car.fuelType}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{car.seating}</span>
                  </div>
                </div>

                {/* View Details Button */}
                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
