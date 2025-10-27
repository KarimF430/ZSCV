'use client'

import { useState, useEffect } from 'react'
import { Calendar, Fuel, Heart, Gauge } from 'lucide-react'

interface Car {
  id: string
  name: string
  brand: string
  brandName: string
  image: string
  startingPrice: number
  fuelTypes: string[]
  transmissions: string[]
  seating: number
  launchDate: string
  slug: string
  isNew: boolean
  isPopular: boolean
  popularRank: number | null
}

// Helper function to format launch date
const formatLaunchDate = (date: string): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const parts = date.split('-')
  if (parts.length === 2) {
    const year = parts[0]
    const monthIndex = parseInt(parts[1]) - 1
    return `${months[monthIndex]} ${year}`
  }
  return date
}

// Helper function to format transmission
const formatTransmission = (transmission: string): string => {
  const lower = transmission.toLowerCase()
  if (lower === 'manual') {
    return 'Manual'
  }
  if (lower === 'automatic') {
    return 'Automatic'
  }
  return transmission.toUpperCase()
}

// Helper function to format fuel type
const formatFuelType = (fuel: string): string => {
  const lower = fuel.toLowerCase()
  if (lower === 'cng') {
    return 'CNG'
  }
  return fuel.charAt(0).toUpperCase() + fuel.slice(1).toLowerCase()
}

export default function PopularCars() {
  const [popularCars, setPopularCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch popular cars from backend
  useEffect(() => {
    const fetchPopularCars = async () => {
      try {
        setLoading(true)
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'
        
        // Fetch all models, brands, and variants
        const [modelsRes, brandsRes, variantsRes] = await Promise.all([
          fetch(`${backendUrl}/api/models`),
          fetch(`${backendUrl}/api/brands`),
          fetch(`${backendUrl}/api/variants`)
        ])
        
        const models = await modelsRes.json()
        const brands = await brandsRes.json()
        const variants = await variantsRes.json()
        
        // Create a map of brand IDs to brand names
        const brandMap = brands.reduce((acc: any, brand: any) => {
          acc[brand.id] = brand.name
          return acc
        }, {})
        
        // Filter only popular models
        const popularModels = models.filter((model: any) => model.isPopular === true)
        
        // Process each popular model
        const processedCars: Car[] = popularModels.map((model: any) => {
          // Find all variants for this model
          const modelVariants = variants.filter((v: any) => v.modelId === model.id)
          
          // Find lowest price variant
          const lowestPrice = modelVariants.length > 0
            ? Math.min(...modelVariants.map((v: any) => v.price || 0))
            : model.price || 0
          
          // Get unique fuel types and transmissions from model or variants
          const fuelTypes = model.fuelTypes && model.fuelTypes.length > 0
            ? model.fuelTypes
            : Array.from(new Set(modelVariants.map((v: any) => v.fuel).filter(Boolean)))
          
          const transmissions = model.transmissions && model.transmissions.length > 0
            ? model.transmissions
            : Array.from(new Set(modelVariants.map((v: any) => v.transmission).filter(Boolean)))
          
          // Get hero image from model
          const heroImage = model.heroImage
            ? `${backendUrl}${model.heroImage}`
            : ''
          
          return {
            id: model.id,
            name: model.name,
            brand: model.brandId,
            brandName: brandMap[model.brandId] || 'Unknown',
            image: heroImage,
            startingPrice: lowestPrice,
            fuelTypes: fuelTypes.length > 0 ? fuelTypes : ['Petrol'],
            transmissions: transmissions.length > 0 ? transmissions : ['Manual'],
            seating: model.seating || 5,
            launchDate: model.launchDate ? `Launched ${formatLaunchDate(model.launchDate)}` : 'Launched',
            slug: `${(brandMap[model.brandId] || '').toLowerCase().replace(/\s+/g, '-')}-${model.name.toLowerCase().replace(/\s+/g, '-')}`,
            isNew: model.isNew || false,
            isPopular: model.isPopular || false,
            popularRank: model.popularRank || null
          }
        })
        
        // Sort by popularRank (ascending order - 1, 2, 3...)
        const sortedCars = processedCars.sort((a, b) => {
          const rankA = a.popularRank || 999
          const rankB = b.popularRank || 999
          return rankA - rankB
        })
        
        setPopularCars(sortedCars)
      } catch (error) {
        console.error('Error fetching popular cars:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPopularCars()
  }, [])

  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Cars</h2>
        
        {/* Cars Horizontal Scroll */}
        <div className="relative">
          {loading ? (
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-shrink-0 w-80 bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-6 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-8 bg-gray-200 animate-pulse rounded w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : popularCars.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No popular cars found.</p>
            </div>
          ) : (
            <div
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {popularCars.map((car) => (
                <div
                  key={car.id}
                  onClick={() => {
                    const brandSlug = car.brandName.toLowerCase().replace(/\s+/g, '-')
                    const modelSlug = car.name.toLowerCase().replace(/\s+/g, '-')
                    window.location.href = `/${brandSlug}-cars/${modelSlug}`
                  }}
                  className="flex-shrink-0 w-80 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                >
                {/* Car Image with Badges */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                  {/* NEW Badge */}
                  {car.isNew && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                      NEW
                    </div>
                  )}
                  
                  {/* Heart Icon */}
                  <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-10">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>

                  {/* Car Image */}
                  <div className="w-full h-full flex items-center justify-center">
                    {car.image ? (
                      <img 
                        src={car.image}
                        alt={`${car.brandName} ${car.name}`}
                        className="w-full h-full object-cover object-center scale-110 hover:scale-115 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%23374151'%3E%3Cpath d='M50 200h300c5.5 0 10-4.5 10-10v-80c0-16.6-13.4-30-30-30H70c-16.6 0-30 13.4-30 30v80c0 5.5 4.5 10 10 10z'/%3E%3Ccircle cx='100' cy='220' r='25' fill='%23111827'/%3E%3Ccircle cx='300' cy='220' r='25' fill='%23111827'/%3E%3Cpath d='M80 110h240l-20-30H100z' fill='%236B7280'/%3E%3C/svg%3E"
                        }}
                      />
                    ) : (
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='#374151' className="w-3/4 h-3/4">
                        <path d='M50 200h300c5.5 0 10-4.5 10-10v-80c0-16.6-13.4-30-30-30H70c-16.6 0-30 13.4-30 30v80c0 5.5 4.5 10 10 10z'/>
                        <circle cx='100' cy='220' r='25' fill='#111827'/>
                        <circle cx='300' cy='220' r='25' fill='#111827'/>
                        <path d='M80 110h240l-20-30H100z' fill='#6B7280'/>
                      </svg>
                    )}
                  </div>
                </div>

                {/* Car Info */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">{car.brandName} {car.name}</h3>
                  
                  <div className="flex items-baseline mb-4">
                    <span className="text-red-600 font-bold text-xl">₹ {(car.startingPrice / 100000).toFixed(2)} Lakh</span>
                    <span className="text-gray-500 text-sm ml-2">Onwards</span>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-3 text-gray-400" />
                      <span>{car.launchDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Fuel className="h-4 w-4 mr-3 text-gray-400" />
                      <span>{car.fuelTypes.map(f => formatFuelType(f)).join('/')}</span>
                    </div>
                    <div className="flex items-center">
                      <Gauge className="h-4 w-4 mr-3 text-gray-400" />
                      <span>{car.transmissions.map(t => formatTransmission(t)).join('/')}</span>
                    </div>
                  </div>

                  <button 
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-3 rounded-lg transition-all duration-200 text-sm font-semibold"
                    onClick={(e) => {
                      e.stopPropagation()
                      const brandSlug = car.brandName.toLowerCase().replace(/\s+/g, '-')
                      const modelSlug = car.name.toLowerCase().replace(/\s+/g, '-')
                      window.location.href = `/${brandSlug}-cars/${modelSlug}`
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
    </section>
  )
}
