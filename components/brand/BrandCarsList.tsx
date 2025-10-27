'use client'

import { useState, useEffect } from 'react'
import { Star, ChevronRight, ChevronDown, X } from 'lucide-react'
import Link from 'next/link'
import { getBrandIdFromSlug, getModelsByBrand, FrontendModel } from '@/lib/models-api'
import { truncateCarName } from '@/lib/text-utils'
import BrandCarFilters, { FilterState } from './BrandCarFilters'

interface Car {
  id: number
  name: string
  price: string
  rating: number
  reviews: number
  power: string
  image: string
  isNew?: boolean
  seating: string
  fuelType: string
  transmission: string
  mileage: string
  safetyRating?: string
  variants: number
}

interface BrandCarsListProps {
  brand: string
}

export default function BrandCarsList({ brand }: BrandCarsListProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [models, setModels] = useState<FrontendModel[]>([])
  const [brandData, setBrandData] = useState<{ id: string; name: string; slug: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<FilterState>({
    sort: '',
    fuelType: [],
    transmission: [],
    priceRange: '',
    make: []
  })

  // Fetch models from backend
  useEffect(() => {
    async function fetchModels() {
      try {
        setLoading(true)
        setError(null)
        
        console.log('🔍 Fetching models for brand:', brand)
        
        // First try known brand IDs for speed
        const knownBrandIds: { [key: string]: string } = {
          'honda': '3445736621',
          'maruti-suzuki': '2909414098',
          'tata': '7756885863',
          'hyundai': '4741969225',
          'kia': '7908567021'
        }
        
        let brandId = knownBrandIds[brand.toLowerCase()]
        
        // If not in known brands, fetch from API dynamically
        if (!brandId) {
          console.log('🔍 Brand not in known list, fetching from API...')
          try {
            const brandsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}/api/brands`)
            if (brandsResponse.ok) {
              const brands = await brandsResponse.json()
              const foundBrand = brands.find((b: any) => {
                const normalizedBrandName = b.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                return normalizedBrandName === brand.toLowerCase()
              })
              if (foundBrand) {
                brandId = foundBrand.id
                console.log('✅ Found brand ID from API:', brandId, 'for', foundBrand.name)
              }
            }
          } catch (apiError) {
            console.error('❌ Error fetching brands from API:', apiError)
          }
        }
        
        console.log('🔍 Final brand ID:', brandId)
        
        if (!brandId) {
          console.error('❌ No brand ID found for:', brand)
          setError(`Brand "${brand}" not found`)
          return
        }

        console.log('🔍 Fetching models for brand ID:', brandId)
        
        // Fetch all models and filter by brand
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}/api/models`)
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        console.log('📊 Models response:', data)
        
        if (data && Array.isArray(data)) {
          // Filter models by brand ID
          const brandModels = data.filter((model: any) => model.brandId === brandId)
          console.log('🔍 Found models for brand:', brandModels.length)
          
          if (brandModels.length === 0) {
            setError(`No models found for brand ID: ${brandId}`)
            return
          }
          
          // Fetch all variants to calculate prices and counts
          const variantsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}/api/variants`)
          let allVariants: any[] = []
          
          if (variantsResponse.ok) {
            allVariants = await variantsResponse.json()
            console.log('📊 Total variants loaded:', allVariants.length)
          }
          
          // Process models with variant data
          const modelsWithVariants = brandModels.map((model: any) => {
            // Find variants for this model
            const modelVariants = allVariants.filter((variant: any) => variant.modelId === model.id)
            
            // Calculate lowest price and variant count
            let lowestPrice = 0
            let variantCount = modelVariants.length
            
            if (modelVariants.length > 0) {
              const prices = modelVariants.map((v: any) => v.price || 0).filter(p => p > 0)
              if (prices.length > 0) {
                lowestPrice = Math.min(...prices)
              }
            }
            
            // Convert backend model to frontend format
            return {
              id: model.id,
              name: model.name,
              price: lowestPrice > 0 ? (lowestPrice / 100000).toFixed(2) : '0.00',
              rating: 4.5, // Default rating
              reviews: 1247, // Default reviews
              power: '120 PS',
              image: model.heroImage ? `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}${model.heroImage}` : '/car-placeholder.jpg',
              isNew: model.isNew || false,
              seating: '5',
              fuelType: model.fuelTypes ? model.fuelTypes.join('/') : 'Petrol',
              transmission: model.transmissions ? model.transmissions.join('/') : 'Manual',
              mileage: '18.5 kmpl',
              variants: variantCount || 0,
              slug: model.name.toLowerCase().replace(/\s+/g, '-'),
              brandName: brandName
            }
          })
          
          setModels(modelsWithVariants)
          setBrandData({ id: brandId, name: brandName, slug: brand })
          console.log('✅ Models processed with variant data:', modelsWithVariants.length)
        } else {
          console.error('❌ Invalid models data structure:', data)
          setError('Invalid data structure received')
        }
      } catch (err) {
        console.error('❌ Error loading models:', err)
        setError('Failed to load models')
      } finally {
        setLoading(false)
      }
    }

    fetchModels()
  }, [brand])

  const brandName = brandData?.name || (brand === 'maruti-suzuki' ? 'Maruti Suzuki' : brand.charAt(0).toUpperCase() + brand.slice(1))

  // Apply filters to models
  const filteredModels = models.filter((model) => {
    // Filter by fuel type
    if (filters.fuelType.length > 0) {
      const modelFuelType = model.fuelType.toLowerCase()
      const hasMatchingFuel = filters.fuelType.some(filter => 
        modelFuelType.includes(filter)
      )
      if (!hasMatchingFuel) return false
    }

    // Filter by transmission
    if (filters.transmission.length > 0) {
      const modelTransmission = model.transmission.toLowerCase()
      const hasMatchingTransmission = filters.transmission.some(filter =>
        modelTransmission.includes(filter)
      )
      if (!hasMatchingTransmission) return false
    }

    return true
  })

  // Sort models
  const sortedModels = [...filteredModels].sort((a, b) => {
    if (filters.sort === 'price-low') {
      const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''))
      const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''))
      return priceA - priceB
    } else if (filters.sort === 'price-high') {
      const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ''))
      const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ''))
      return priceB - priceA
    }
    return 0
  })

  return (
    <>
      {/* Filters Section */}
      <BrandCarFilters filters={filters} onFilterChange={setFilters} />
      
      <section className="bg-white py-4">
        <div className="max-w-6xl mx-auto px-4">

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500">Loading models...</div>
          </div>
        )}


        {/* Show error */}
        {error && (
          <div className="flex flex-col justify-center items-center py-12 space-y-4">
            <div className="text-red-500 text-xl font-bold">Error: {error}</div>
            <div className="text-gray-600 text-sm">
              <p>Brand slug: {brand}</p>
              <p>Please check the browser console for more details.</p>
              <p className="mt-2">Trying to fetch from: {process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}/api/brands</p>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Car List */}
        {!loading && !error && (
          <div className="space-y-3">
            {models.length === 0 ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-gray-500">No models found for {brandName}</div>
              </div>
            ) : (
              sortedModels.map((car) => (
            <Link 
              key={car.id}
              href={`/${brand}-cars/${car.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="block group"
            >
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200">
                <div className="flex h-32">
                  {/* Car Image - Full Size */}
                  <div className="w-44 flex-shrink-0 relative overflow-hidden rounded-l-lg">
                    <img 
                      src={car.image.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}${car.image}` : car.image}
                      alt={`${brandName} ${car.name}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const parent = e.currentTarget.parentElement
                        if (parent) {
                          const fallback = document.createElement('div')
                          fallback.className = 'bg-gray-200 text-gray-600 text-sm font-semibold text-center flex items-center justify-center h-full'
                          fallback.innerHTML = `${brandName}<br/>${car.name}`
                          parent.appendChild(fallback)
                        }
                      }}
                    />
                    {car.isNew && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                        NEW
                      </span>
                    )}
                  </div>
                  
                  {/* Car Details */}
                  <div className="flex-1 p-3">
                    {/* Car Name with Arrow */}
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors pr-2 flex-1">
                        {truncateCarName(brandName, car.name, 18)}
                      </h3>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 text-green-600 fill-current" />
                      <span className="font-semibold text-gray-900 text-sm">{car.rating}/5</span>
                      <span className="text-gray-500 text-sm">{car.reviews} Ratings</span>
                    </div>
                    
                    {/* Variants */}
                    <div className="text-gray-700 text-sm font-medium mb-2">
                      {car.variants} Variants
                    </div>
                    
                    {/* Price */}
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-red-600">₹ {car.price} Lakh</span>
                        <span className="text-gray-500 text-sm ml-1">Onwards</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
              ))
            )}
          </div>
        )}
      </div>
    </section>
    </>
  )
}
