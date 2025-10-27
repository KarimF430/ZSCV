'use client'

import { useState, useEffect } from 'react'
import { MapPin, ArrowLeft, X, Navigation } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { indianCities, getPopularCities, searchCities, type City } from '@/lib/cities-data'

export default function LocationPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<City[]>([])
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const popularCities = getPopularCities()

  // Load saved city from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('selectedCity')
    if (saved) {
      setSelectedCity(saved)
    }
  }, [])

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([])
      return
    }
    
    const results = searchCities(searchQuery)
    setSearchResults(results)
  }, [searchQuery])

  const handleCitySelect = (city: City) => {
    const cityName = `${city.name}, ${city.state}`
    setSelectedCity(cityName)
    localStorage.setItem('selectedCity', cityName)
    // Navigate back after selection
    setTimeout(() => {
      router.back()
    }, 300)
  }

  const handleDetectLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would use reverse geocoding API
          alert('Location detection would use a geocoding API to find the nearest city')
        },
        (error) => {
          alert('Unable to detect location. Please select manually.')
        }
      )
    } else {
      alert('Geolocation is not supported by your browser')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search Bar */}
      <div className={`bg-white border-b border-gray-200 ${searchQuery.trim() === '' ? 'sticky top-0' : ''} z-10`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          {searchQuery.trim() === '' && (
            <div className="flex items-center gap-3 mb-4">
              {/* Back Button */}
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="h-6 w-6 text-gray-700" />
              </button>

              {/* Title */}
              <h1 className="text-xl font-semibold text-gray-900">Select your City</h1>

              {/* Close Button */}
              <button
                onClick={() => router.back()}
                className="ml-auto p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          )}

          {/* Search Input */}
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for area, street name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 placeholder-gray-500"
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

          {/* Detect Location Button - Only show when not searching */}
          {searchQuery.trim() === '' && (
            <button
              onClick={handleDetectLocation}
              className="w-full mt-3 flex items-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 bg-green-100 rounded-full">
                <Navigation className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-gray-900">Detect my location</div>
                <div className="text-sm text-gray-500">Using GPS</div>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {searchQuery.trim() === '' ? (
          <div>
            {/* Popular Cities */}
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              Popular Cities
            </h2>
            <div className="space-y-2">
              {popularCities.map((city) => (
                <button
                  key={`${city.name}-${city.state}`}
                  onClick={() => handleCitySelect(city)}
                  className="w-full flex items-center gap-4 px-4 py-4 bg-white rounded-lg border border-gray-200 hover:border-red-500 hover:shadow-md transition-all text-left"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-red-50 to-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{city.name}</div>
                    <div className="text-sm text-gray-500">{city.state}</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-16">
            <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No cities found</h2>
            <p className="text-gray-500 mb-4">No results for "{searchQuery}"</p>
            <p className="text-sm text-gray-400">
              Try searching for a different city or state name
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-4 text-sm text-gray-600">
              Found {searchResults.length} {searchResults.length === 1 ? 'city' : 'cities'}
            </div>
            <div className="bg-white rounded-lg divide-y divide-gray-100">
              {searchResults.map((city) => (
                <button
                  key={`${city.name}-${city.state}`}
                  onClick={() => handleCitySelect(city)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">{city.name}</div>
                      <div className="text-sm text-gray-500">{city.state}</div>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
