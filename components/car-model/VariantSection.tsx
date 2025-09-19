'use client'

import { useState } from 'react'
import { Filter, Star, Fuel, Zap, Settings } from 'lucide-react'

interface CarData {
  brand: string
  model: string
  fullName: string
}

interface VariantSectionProps {
  carData: CarData
}

export default function VariantSection({ carData }: VariantSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState('all')

  const variants = [
    {
      name: 'LXI',
      price: 619000,
      transmission: 'Manual',
      fuelType: 'Petrol',
      mileage: '23.76 kmpl',
      engine: '1.2L',
      power: '89 bhp',
      features: ['Power Steering', 'Central Locking', 'Dual Airbags', 'Manual AC'],
      rating: 4.1,
      popular: false,
      valueForMoney: true
    },
    {
      name: 'VXI',
      price: 689000,
      transmission: 'Manual',
      fuelType: 'Petrol',
      mileage: '23.76 kmpl',
      engine: '1.2L',
      power: '89 bhp',
      features: ['Power Windows', 'Music System', 'Central Locking', 'Auto AC'],
      rating: 4.3,
      popular: true,
      valueForMoney: true
    },
    {
      name: 'ZXI',
      price: 759000,
      transmission: 'Manual',
      fuelType: 'Petrol',
      mileage: '23.76 kmpl',
      engine: '1.2L',
      power: '89 bhp',
      features: ['Touchscreen', 'Alloy Wheels', 'Fog Lamps', 'Auto Climate Control'],
      rating: 4.4,
      popular: true,
      valueForMoney: false
    },
    {
      name: 'ZXI+ AMT',
      price: 829000,
      transmission: 'AMT',
      fuelType: 'Petrol',
      mileage: '22.56 kmpl',
      engine: '1.2L',
      power: '89 bhp',
      features: ['AMT', 'Push Start', 'Reverse Camera', 'Premium Interior'],
      rating: 4.5,
      popular: false,
      valueForMoney: false
    }
  ]

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'petrol', label: 'Fuel Type' },
    { id: 'manual', label: 'Transmission Type' },
    { id: 'value', label: 'Value for Money Variants' }
  ]

  const filteredVariants = variants.filter(variant => {
    if (selectedFilter === 'all') return true
    if (selectedFilter === 'petrol') return variant.fuelType === 'Petrol'
    if (selectedFilter === 'manual') return variant.transmission === 'Manual'
    if (selectedFilter === 'value') return variant.valueForMoney
    return true
  })

  const VariantCard = ({ variant }: { variant: typeof variants[0] }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-lg font-bold text-gray-900">{variant.name}</h3>
            {variant.popular && (
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">Popular</span>
            )}
            {variant.valueForMoney && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Value</span>
            )}
          </div>
          <div className="text-xl font-bold text-orange-600 mb-1">
            ₹{(variant.price / 100000).toFixed(2)} Lakh
          </div>
          <div className="text-xs text-gray-500">Ex-showroom price</div>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{variant.rating}</span>
        </div>
      </div>

      {/* Key Highlights */}
      <div className="mb-3">
        <div className="flex flex-wrap gap-1 mb-2">
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
            {variant.mileage}
          </span>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
            {variant.transmission}
          </span>
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
            {variant.power}
          </span>
        </div>
        <p className="text-xs text-gray-600">
          Key features: {variant.features.slice(0, 3).join(', ')}
        </p>
      </div>

      {/* Action Button */}
      <button 
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
        onClick={() => {
          // Navigate to detailed variant page
          console.log(`Navigate to ${variant.name} details`)
        }}
      >
        View Details
      </button>
    </div>
  )

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {carData.fullName} - Variants
      </h2>

      {/* Filters */}
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="h-4 w-4 text-gray-600" />
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === filter.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Variants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {filteredVariants.map((variant) => (
          <VariantCard key={variant.name} variant={variant} />
        ))}
      </div>

      {/* More Variants Button */}
      <div className="text-center">
        <button className="bg-white border border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-2 rounded-lg font-medium transition-colors">
          More Variants
        </button>
      </div>
    </div>
  )
}
