'use client'

import { useState } from 'react'
import { Calendar, Fuel, Users, ChevronRight } from 'lucide-react'

interface UpcomingCar {
  id: string
  name: string
  brand: string
  expectedPrice: string
  launchDate: string
  fuelType: string
  seating: string
  image: string
  status: 'Coming' | 'Expected'
}

interface UpcomingCarsSectionProps {
  upcomingCars: UpcomingCar[]
}

export default function UpcomingCarsSection({ upcomingCars }: UpcomingCarsSectionProps) {
  return (
    <section className="py-8 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Upcoming Cars
        </h2>

        {/* Horizontal Scrollable Cars */}
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide mb-6">
          {upcomingCars.map((car) => (
            <div key={car.id} className="flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden w-72">
              {/* Car Image */}
              <div className="relative h-32 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                {/* Status Badge */}
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
                  car.status === 'Coming' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                }`}>
                  {car.status}
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
                  <p className="text-green-600 font-bold text-lg">₹ {car.expectedPrice}</p>
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

                {/* Get Notified Button */}
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors">
                  Get Notified
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AD Banner */}
        <div className="bg-gray-300 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-600">AD Banner</h3>
        </div>
      </div>
    </section>
  )
}
