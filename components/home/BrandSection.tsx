'use client'

import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface Brand {
  id: number
  name: string
  logo: string
  slug: string
  modelCount: number
  startingPrice: string
  popular: boolean
}

export default function BrandSection() {
  const [showAllBrands, setShowAllBrands] = useState(false)

  // Mock brand data - 34 brands total
  const brands: Brand[] = [
    { id: 1, name: 'Maruti Suzuki', logo: '/brands/maruti-suzuki.png', slug: 'maruti', modelCount: 16, startingPrice: '₹3.54 Lakh', popular: true },
    { id: 2, name: 'Hyundai', logo: '/brands/hyundai.png', slug: 'hyundai', modelCount: 12, startingPrice: '₹5.69 Lakh', popular: true },
    { id: 3, name: 'Tata', logo: '/brands/tata.png', slug: 'tata', modelCount: 14, startingPrice: '₹5.12 Lakh', popular: true },
    { id: 4, name: 'Mahindra', logo: '/brands/mahindra.png', slug: 'mahindra', modelCount: 10, startingPrice: '₹7.49 Lakh', popular: true },
    { id: 5, name: 'Kia', logo: '/brands/kia.png', slug: 'kia', modelCount: 6, startingPrice: '₹6.79 Lakh', popular: false },
    { id: 6, name: 'Honda', logo: '/brands/honda.png', slug: 'honda', modelCount: 8, startingPrice: '₹7.31 Lakh', popular: false },
    { id: 7, name: 'Toyota', logo: '/brands/toyota.png', slug: 'toyota', modelCount: 9, startingPrice: '₹6.86 Lakh', popular: false },
    { id: 8, name: 'Nissan', logo: '/brands/nissan.png', slug: 'nissan', modelCount: 4, startingPrice: '₹7.99 Lakh', popular: false },
    { id: 9, name: 'Renault', logo: '/brands/renault.png', slug: 'renault', modelCount: 5, startingPrice: '₹4.99 Lakh', popular: false },
    { id: 10, name: 'Skoda', logo: '/brands/skoda.png', slug: 'skoda', modelCount: 6, startingPrice: '₹11.89 Lakh', popular: false },
    { id: 11, name: 'Volkswagen', logo: '/brands/volkswagen.png', slug: 'volkswagen', modelCount: 4, startingPrice: '₹11.22 Lakh', popular: false },
    { id: 12, name: 'MG', logo: '/brands/mg.png', slug: 'mg', modelCount: 5, startingPrice: '₹10.38 Lakh', popular: false },
    { id: 13, name: 'BMW', logo: '/brands/bmw.png', slug: 'bmw', modelCount: 8, startingPrice: '₹42.50 Lakh', popular: false },
    { id: 14, name: 'Audi', logo: '/brands/audi.png', slug: 'audi', modelCount: 7, startingPrice: '₹34.99 Lakh', popular: false },
    { id: 15, name: 'Mercedes-Benz', logo: '/brands/mercedes.png', slug: 'mercedes', modelCount: 9, startingPrice: '₹41.25 Lakh', popular: false },
    { id: 16, name: 'Volvo', logo: '/brands/volvo.png', slug: 'volvo', modelCount: 4, startingPrice: '₹39.90 Lakh', popular: false },
    { id: 17, name: 'Jaguar', logo: '/brands/jaguar.png', slug: 'jaguar', modelCount: 3, startingPrice: '₹51.50 Lakh', popular: false },
    { id: 18, name: 'Land Rover', logo: '/brands/land-rover.png', slug: 'land-rover', modelCount: 5, startingPrice: '₹65.70 Lakh', popular: false },
    { id: 19, name: 'Jeep', logo: '/brands/jeep.png', slug: 'jeep', modelCount: 3, startingPrice: '₹16.49 Lakh', popular: false },
    { id: 20, name: 'Ford', logo: '/brands/ford.png', slug: 'ford', modelCount: 2, startingPrice: '₹10.99 Lakh', popular: false },
    { id: 21, name: 'Citroen', logo: '/brands/citroen.png', slug: 'citroen', modelCount: 2, startingPrice: '₹7.45 Lakh', popular: false },
    { id: 22, name: 'Isuzu', logo: '/brands/isuzu.png', slug: 'isuzu', modelCount: 2, startingPrice: '₹18.05 Lakh', popular: false },
    { id: 23, name: 'Force Motors', logo: '/brands/force.png', slug: 'force-motors', modelCount: 3, startingPrice: '₹14.99 Lakh', popular: false },
    { id: 24, name: 'BYD', logo: '/brands/byd.png', slug: 'byd', modelCount: 2, startingPrice: '₹29.15 Lakh', popular: false },
    { id: 25, name: 'Lexus', logo: '/brands/lexus.png', slug: 'lexus', modelCount: 4, startingPrice: '₹56.65 Lakh', popular: false },
    { id: 26, name: 'Porsche', logo: '/brands/porsche.png', slug: 'porsche', modelCount: 6, startingPrice: '₹85.68 Lakh', popular: false },
    { id: 27, name: 'Maserati', logo: '/brands/maserati.png', slug: 'maserati', modelCount: 3, startingPrice: '₹1.33 Crore', popular: false },
    { id: 28, name: 'Ferrari', logo: '/brands/ferrari.png', slug: 'ferrari', modelCount: 4, startingPrice: '₹3.50 Crore', popular: false },
    { id: 29, name: 'Lamborghini', logo: '/brands/lamborghini.png', slug: 'lamborghini', modelCount: 3, startingPrice: '₹3.15 Crore', popular: false },
    { id: 30, name: 'Bentley', logo: '/brands/bentley.png', slug: 'bentley', modelCount: 4, startingPrice: '₹4.10 Crore', popular: false },
    { id: 31, name: 'Rolls Royce', logo: '/brands/rolls-royce.png', slug: 'rolls-royce', modelCount: 3, startingPrice: '₹6.95 Crore', popular: false },
    { id: 32, name: 'McLaren', logo: '/brands/mclaren.png', slug: 'mclaren', modelCount: 2, startingPrice: '₹3.72 Crore', popular: false },
    { id: 33, name: 'Aston Martin', logo: '/brands/aston-martin.png', slug: 'aston-martin', modelCount: 3, startingPrice: '₹4.05 Crore', popular: false },
    { id: 34, name: 'Mini', logo: '/brands/mini.png', slug: 'mini', modelCount: 4, startingPrice: '₹41.20 Lakh', popular: false }
  ]

  // Show only first 4 brands initially
  const displayedBrands = showAllBrands ? brands : brands.slice(0, 4)

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Popular Brands</h2>
        
        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          {displayedBrands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow p-4 text-center"
            >
              {/* Brand Logo */}
              <div className="h-16 flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600 text-center leading-tight">
                    {brand.name.split(' ').map(word => word.charAt(0)).join('')}
                  </span>
                </div>
              </div>

              {/* Brand Name */}
              <h3 className="font-medium text-gray-900 text-sm mb-1">{brand.name}</h3>

              {/* Model Count */}
              <div className="text-xs text-gray-600">{brand.modelCount} Models</div>

              {/* Starting Price */}
              <div className="text-xs text-green-600 font-medium mt-1">From {brand.startingPrice}</div>

              {/* Popular Badge */}
              {brand.popular && (
                <div className="mt-2">
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                    Popular
                  </span>
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Show All Brands Button */}
        <div className="text-center">
          <button
            onClick={() => setShowAllBrands(!showAllBrands)}
            className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {showAllBrands ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Show Less Brands
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Show All 34 Brands
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
