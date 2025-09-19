'use client'

import { useState } from 'react'
import { Check, IndianRupee, Fuel, Zap, Users } from 'lucide-react'

interface CarVariantsProps {
  carId: number
}

export default function CarVariants({ carId }: CarVariantsProps) {
  const [selectedVariant, setSelectedVariant] = useState(0)

  // Mock data - in real app, this would be fetched based on carId
  const variants = [
    {
      id: 1,
      name: 'LXI',
      price: '₹5.85 Lakh',
      fuelType: 'Petrol',
      transmission: 'Manual',
      mileage: '23.20 kmpl',
      engine: '1197 cc',
      power: '89 bhp',
      seating: 5,
      features: [
        'Driver Airbag',
        'ABS with EBD',
        'Central Locking',
        'Power Steering',
        'Manual AC',
        'Front Power Windows'
      ],
      isPopular: false
    },
    {
      id: 2,
      name: 'VXI',
      price: '₹6.49 Lakh',
      fuelType: 'Petrol',
      transmission: 'Manual',
      mileage: '23.20 kmpl',
      engine: '1197 cc',
      power: '89 bhp',
      seating: 5,
      features: [
        'Dual Airbags',
        'ABS with EBD',
        'Central Locking',
        'Power Steering',
        'Manual AC',
        'All Power Windows',
        'Music System',
        'Rear Parking Sensors'
      ],
      isPopular: true
    },
    {
      id: 3,
      name: 'ZXI',
      price: '₹7.46 Lakh',
      fuelType: 'Petrol',
      transmission: 'Manual',
      mileage: '23.20 kmpl',
      engine: '1197 cc',
      power: '89 bhp',
      seating: 5,
      features: [
        'Dual Airbags',
        'ABS with EBD',
        'Central Locking',
        'Power Steering',
        'Auto AC',
        'All Power Windows',
        'SmartPlay Pro+ Infotainment',
        'Rear Parking Sensors',
        'Push Button Start',
        'Cruise Control'
      ],
      isPopular: false
    },
    {
      id: 4,
      name: 'ZXI+ AMT',
      price: '₹8.67 Lakh',
      fuelType: 'Petrol',
      transmission: 'AMT',
      mileage: '22.38 kmpl',
      engine: '1197 cc',
      power: '89 bhp',
      seating: 5,
      features: [
        'Dual Airbags',
        'ABS with EBD',
        'Central Locking',
        'Power Steering',
        'Auto AC',
        'All Power Windows',
        'SmartPlay Pro+ Infotainment',
        'Rear Parking Sensors',
        'Push Button Start',
        'Cruise Control',
        'Auto Headlamps',
        'Rain Sensing Wipers'
      ],
      isPopular: false
    }
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Available Variants</h2>

      {/* Variant Selector - Mobile */}
      <div className="lg:hidden mb-6">
        <select
          value={selectedVariant}
          onChange={(e) => setSelectedVariant(Number(e.target.value))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {variants.map((variant, index) => (
            <option key={variant.id} value={index}>
              {variant.name} - {variant.price}
              {variant.isPopular ? ' (Popular)' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Variant Tabs - Desktop */}
      <div className="hidden lg:block mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {variants.map((variant, index) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(index)}
                className={`relative py-4 px-1 text-sm font-medium transition-colors ${
                  selectedVariant === index
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {variant.name}
                {variant.isPopular && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Selected Variant Details */}
      <div className="space-y-6">
        {/* Variant Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {variants[selectedVariant].name}
              {variants[selectedVariant].isPopular && (
                <span className="ml-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                  Popular
                </span>
              )}
            </h3>
            <p className="text-3xl font-bold text-primary-600 mb-1">
              {variants[selectedVariant].price}
            </p>
            <p className="text-sm text-gray-500">Ex-showroom price in Delhi</p>
          </div>
        </div>

        {/* Variant Specifications */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Fuel className="h-4 w-4 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">Mileage</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {variants[selectedVariant].mileage}
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="h-4 w-4 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">Engine</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {variants[selectedVariant].engine}
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-4 w-4 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">Transmission</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {variants[selectedVariant].transmission}
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <IndianRupee className="h-4 w-4 text-primary-600" />
              <span className="text-sm font-medium text-gray-700">Power</span>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {variants[selectedVariant].power}
            </p>
          </div>
        </div>

        {/* Features List */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Features & Equipment
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {variants[selectedVariant].features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
          <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
            Get Price Quote
          </button>
          <button className="flex-1 bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-6 rounded-lg border border-gray-300 transition-colors duration-200">
            Book Test Drive
          </button>
          <button className="flex-1 bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-6 rounded-lg border border-gray-300 transition-colors duration-200">
            Compare Variants
          </button>
        </div>
      </div>

      {/* Variant Comparison Note */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Prices may vary based on location and dealer. 
          Contact your nearest dealer for exact pricing and availability.
        </p>
      </div>
    </div>
  )
}
