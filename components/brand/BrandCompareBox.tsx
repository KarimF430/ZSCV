'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

interface Car {
  id: number
  name: string
  brand: string
  startingPrice: number
  slug: string
}

interface BrandCompareBoxProps {
  brandName: string
}

export default function BrandCompareBox({ brandName }: BrandCompareBoxProps) {
  const [selectedCars, setSelectedCars] = useState<number[]>([])

  const getCarsByBrand = (brand: string): Car[] => {
    const carData: Record<string, Car[]> = {
      maruti: [
        { id: 1, name: 'Swift', brand: 'Maruti', startingPrice: 585000, slug: 'maruti-swift' },
        { id: 2, name: 'Baleno', brand: 'Maruti', startingPrice: 635000, slug: 'maruti-baleno' },
        { id: 3, name: 'Grand Vitara', brand: 'Maruti', startingPrice: 1045000, slug: 'maruti-grand-vitara' }
      ],
      hyundai: [
        { id: 1, name: 'i20', brand: 'Hyundai', startingPrice: 704000, slug: 'hyundai-i20' },
        { id: 2, name: 'Venue', brand: 'Hyundai', startingPrice: 794000, slug: 'hyundai-venue' },
        { id: 3, name: 'Creta', brand: 'Hyundai', startingPrice: 1100000, slug: 'hyundai-creta' }
      ],
      tata: [
        { id: 1, name: 'Altroz', brand: 'Tata', startingPrice: 660000, slug: 'tata-altroz' },
        { id: 2, name: 'Nexon', brand: 'Tata', startingPrice: 780000, slug: 'tata-nexon' },
        { id: 3, name: 'Harrier', brand: 'Tata', startingPrice: 1549000, slug: 'tata-harrier' }
      ]
    }
    return carData[brand] || []
  }

  const cars = getCarsByBrand(brandName)

  const handleCompareClick = (carIds: number[]) => {
    const carSlugs = carIds.map(id => cars.find(car => car.id === id)?.slug).join(',')
    window.location.href = `/compare?cars=${carSlugs}`
  }

  const formatPrice = (price: number) => {
    return (price / 100000).toFixed(2)
  }

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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Compare {brandName.charAt(0).toUpperCase() + brandName.slice(1)} Cars
          </h2>
          <p className="text-gray-600 text-lg">
            Compare different {brandName.charAt(0).toUpperCase() + brandName.slice(1)} models side by side
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 pt-4 px-8 scrollbar-hide">
          {cars.map((car, index) => (
            <div key={car.id} className="flex-shrink-0 w-[320px] bg-white rounded-3xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-40 mb-6 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
                <CarSilhouette 
                  color={
                    brandName === 'maruti' 
                      ? (index === 0 ? '#10B981' : index === 1 ? '#3B82F6' : '#8B5CF6')
                      : brandName === 'hyundai'
                      ? (index === 0 ? '#EF4444' : index === 1 ? '#F59E0B' : '#10B981')
                      : '#DC2626'
                  } 
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">{car.brand}</p>
                  <h3 className="text-gray-900 font-bold text-2xl mt-1">{car.name}</h3>
                </div>
                <div className="text-gray-800 font-bold text-xl">
                  ₹ {formatPrice(car.startingPrice)} Lakh
                  <span className="text-gray-500 text-base font-normal ml-2">onwards</span>
                </div>
                
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

        <div className="text-center mt-10">
          <button
            onClick={() => window.location.href = '/compare'}
            className="w-full max-w-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-8 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Compare All {brandName.charAt(0).toUpperCase() + brandName.slice(1)} Cars
          </button>
        </div>
      </div>
    </section>
  )
}
