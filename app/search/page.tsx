'use client'

import { useState, useEffect } from 'react'
import { Search, ArrowLeft, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface CarModel {
  id: string
  name: string
  brandName: string
  slug: string
  heroImage: string
  startingPrice: number
}

export default function SearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<CarModel[]>([])
  const [allModels, setAllModels] = useState<CarModel[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch all models on component mount
  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true)
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'
        const [modelsRes, brandsRes] = await Promise.all([
          fetch(`${backendUrl}/api/models`),
          fetch(`${backendUrl}/api/brands`)
        ])
        
        const models = await modelsRes.json()
        const brands = await brandsRes.json()
        
        // Create brand map
        const brandMap = brands.reduce((acc: any, brand: any) => {
          acc[brand.id] = brand.name
          return acc
        }, {})
        
        // Process models
        const processedModels = models.map((model: any) => ({
          id: model.id,
          name: model.name,
          brandName: brandMap[model.brandId] || 'Unknown',
          slug: `${(brandMap[model.brandId] || '').toLowerCase().replace(/\s+/g, '-')}-${model.name.toLowerCase().replace(/\s+/g, '-')}`,
          heroImage: model.heroImage ? `${backendUrl}${model.heroImage}` : '',
          startingPrice: 0
        }))
        
        setAllModels(processedModels)
      } catch (error) {
        console.error('Error fetching models:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchModels()
  }, [])

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([])
      return
    }
    
    const query = searchQuery.toLowerCase()
    const filtered = allModels.filter(model => 
      model.name.toLowerCase().includes(query) ||
      model.brandName.toLowerCase().includes(query) ||
      `${model.brandName} ${model.name}`.toLowerCase().includes(query)
    )
    
    setSearchResults(filtered)
  }, [searchQuery, allModels])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search Bar */}
      <div className={`bg-white border-b border-gray-200 ${searchQuery.trim() === '' ? 'sticky top-0' : ''} z-10`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-6 w-6 text-gray-700" />
            </button>

            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for cars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-gray-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 placeholder-gray-500"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white rounded-lg p-4 flex items-center gap-4 animate-pulse">
                <div className="w-20 h-16 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery.trim() === '' ? (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Search for Cars</h2>
            <p className="text-gray-500">Type a car name or brand to start searching</p>
            
            {/* Popular Searches */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Popular Searches</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Honda Amaze', 'Hyundai Creta', 'Maruti Swift', 'Tata Nexon', 'Mahindra Scorpio'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:border-red-500 hover:text-red-600 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No cars found</h2>
            <p className="text-gray-500">No results for "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-red-600 hover:text-red-700 font-medium"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4 text-sm text-gray-600">
              Found {searchResults.length} {searchResults.length === 1 ? 'car' : 'cars'}
            </div>
            <div className="space-y-3">
              {searchResults.map((car) => (
                <Link
                  key={car.id}
                  href={`/models/${car.slug}`}
                  className="block bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="p-4 flex items-center gap-4">
                    {/* Car Image */}
                    <div className="w-24 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {car.heroImage ? (
                        <img
                          src={car.heroImage}
                          alt={`${car.brandName} ${car.name}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%23374151'%3E%3Cpath d='M50 200h300c5.5 0 10-4.5 10-10v-80c0-16.6-13.4-30-30-30H70c-16.6 0-30 13.4-30 30v80c0 5.5 4.5 10 10 10z'/%3E%3Ccircle cx='100' cy='220' r='25' fill='%23111827'/%3E%3Ccircle cx='300' cy='220' r='25' fill='%23111827'/%3E%3Cpath d='M80 110h240l-20-30H100z' fill='%236B7280'/%3E%3C/svg%3E"
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='#9CA3AF' className="w-16 h-16">
                            <path d='M50 200h300c5.5 0 10-4.5 10-10v-80c0-16.6-13.4-30-30-30H70c-16.6 0-30 13.4-30 30v80c0 5.5 4.5 10 10 10z'/>
                            <circle cx='100' cy='220' r='25' fill='#6B7280'/>
                            <circle cx='300' cy='220' r='25' fill='#6B7280'/>
                            <path d='M80 110h240l-20-30H100z' fill='#9CA3AF'/>
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Car Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        {car.brandName} {car.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {car.brandName}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
