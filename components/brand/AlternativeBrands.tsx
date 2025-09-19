'use client'

import { ArrowRight } from 'lucide-react'

interface Brand {
  id: string
  name: string
  logo: string
  description: string
  popularModel: string
  startingPrice: string
}

interface AlternativeBrandsProps {
  currentBrand: string
}

export default function AlternativeBrands({ currentBrand }: AlternativeBrandsProps) {
  const allBrands: Brand[] = [
    { id: 'maruti', name: 'Maruti Suzuki', logo: '/brands/maruti.png', description: 'India\'s most trusted car brand', popularModel: 'Swift', startingPrice: '₹5.85 Lakh' },
    { id: 'hyundai', name: 'Hyundai', logo: '/brands/hyundai.png', description: 'Premium features & technology', popularModel: 'Creta', startingPrice: '₹11.00 Lakh' },
    { id: 'tata', name: 'Tata Motors', logo: '/brands/tata.png', description: 'Safety & innovation leader', popularModel: 'Nexon', startingPrice: '₹7.80 Lakh' },
    { id: 'mahindra', name: 'Mahindra', logo: '/brands/mahindra.png', description: 'Tough & rugged SUVs', popularModel: 'XUV700', startingPrice: '₹13.45 Lakh' },
    { id: 'kia', name: 'Kia', logo: '/brands/kia.png', description: 'Modern design & features', popularModel: 'Seltos', startingPrice: '₹10.90 Lakh' },
    { id: 'toyota', name: 'Toyota', logo: '/brands/toyota.png', description: 'Reliability & quality', popularModel: 'Innova Crysta', startingPrice: '₹19.99 Lakh' }
  ]

  // Filter out the current brand
  const alternativeBrands = allBrands.filter(brand => brand.id !== currentBrand)

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Alternative Brands
            </h2>
            <p className="text-gray-600">
              Explore other popular car brands in India
            </p>
          </div>
          <button className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-medium">
            View All Brands
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {alternativeBrands.slice(0, 5).map((brand) => (
            <div key={brand.id} className="group cursor-pointer">
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                {/* Brand Logo */}
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-2xl font-bold text-blue-600">
                    {brand.name.charAt(0)}
                  </span>
                </div>
                
                {/* Brand Info */}
                <div className="text-center">
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">
                    {brand.description}
                  </p>
                  
                  {/* Popular Model */}
                  <div className="bg-white rounded-lg p-3 border border-gray-100">
                    <div className="text-sm font-medium text-gray-900">{brand.popularModel}</div>
                    <div className="text-xs text-blue-600 font-semibold">{brand.startingPrice}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
            View All Brands
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </section>
  )
}
