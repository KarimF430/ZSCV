'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { FrontendBrand } from '@/lib/brand-api'

export default function BrandSection() {
  const [showAllBrands, setShowAllBrands] = useState(false)
  const [brands, setBrands] = useState<FrontendBrand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true)
        console.log('🚀 BrandSection: Fetching brands from /api/brands...')
        
        const response = await fetch('/api/brands', {
          cache: 'no-cache',
          headers: {
            'Cache-Control': 'no-cache'
          }
        })
        
        console.log('📡 BrandSection: Response status:', response.status)
        
        const result = await response.json()
        console.log('📊 BrandSection: API result:', result)
        
        if (result.success) {
          // Sort by ranking and get active brands
          const activeBrands = result.data
            .filter((brand: FrontendBrand) => brand.status === 'active')
            .sort((a: FrontendBrand, b: FrontendBrand) => a.ranking - b.ranking)
          
          setBrands(activeBrands)
          console.log(`✅ BrandSection: Loaded ${activeBrands.length} brands:`, activeBrands.map((b: FrontendBrand) => b.name))
        } else {
          throw new Error(result.error || 'Failed to fetch brands')
        }
      } catch (err) {
        console.error('❌ BrandSection: Error fetching brands:', err)
        setError(err instanceof Error ? err.message : 'Failed to load brands')
        // No fallback - show only backend data
        setBrands([])
      } finally {
        setLoading(false)
      }
    }

    fetchBrands()
  }, [])

  // Transform backend brands to match the display format
  const transformedBrands = brands.map(brand => ({
    id: brand.id,
    name: brand.name,
    logo: brand.logo,
    slug: brand.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    modelCount: parseInt(brand.models.replace(/[^\d]/g, '')) || 8,
    startingPrice: brand.startingPrice
  }))

  // Use only backend brands (no demo brands)
  const allBrands = transformedBrands

  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Brands</h2>
        
        {/* Brands Grid */}
        {loading ? (
          <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 text-center animate-pulse">
                <div className="h-16 flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
            {/* Show only backend brands */}
            {(showAllBrands ? allBrands : allBrands.slice(0, 6)).map((brand) => (
              <Link
                key={brand.id}
                href={`/${brand.slug}-cars`}
                className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 p-4 text-center"
              >
                {/* Brand Logo */}
                <div className="h-16 flex items-center justify-center mb-3">
                  {brand.logo && brand.logo.startsWith('http') ? (
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`w-12 h-12 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex items-center justify-center ${brand.logo && brand.logo.startsWith('http') ? 'hidden' : ''}`}>
                    <span className="text-sm font-bold text-white">
                      {brand.name.split(' ').map((word: string) => word.charAt(0)).join('')}
                    </span>
                  </div>
                </div>

                {/* Brand Name */}
                <h3 className="font-medium text-gray-900 text-sm">{brand.name}</h3>
              </Link>
            ))}
          </div>
        )}

        {/* Show All Brands Button */}
        <div className="text-center">
          <button
            onClick={() => setShowAllBrands(!showAllBrands)}
            className="inline-flex items-center bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-md"
          >
            {showAllBrands ? (
              <>
                <ChevronUp className="h-5 w-5 mr-2" />
                Show Less Brands
              </>
            ) : (
              <>
                <ChevronDown className="h-5 w-5 mr-2" />
                Show All {allBrands.length} Brands
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
