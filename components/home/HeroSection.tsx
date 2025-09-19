'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter } from 'lucide-react'

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Find Your Perfect
            <span className="block text-primary-200">New Car in India</span>
          </h1>
          <p className="text-lg sm:text-xl text-primary-100 max-w-2xl mx-auto">
            Compare prices, specifications, and reviews of new cars. Get the best deals and EMI options.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Search Input */}
              <div className="lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Cars
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by brand, model, or price..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  />
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Search Button */}
              <div className="lg:col-span-1 flex items-end">
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Search Cars</span>
                </button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 font-medium">Popular Searches:</span>
                <Link href="/cars/under-5-lakh" className="text-sm bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 px-3 py-1 rounded-full transition-colors">
                  Under ₹5 Lakh
                </Link>
                <Link href="/cars/suv" className="text-sm bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 px-3 py-1 rounded-full transition-colors">
                  SUV Cars
                </Link>
                <Link href="/cars/sedan" className="text-sm bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 px-3 py-1 rounded-full transition-colors">
                  Sedan Cars
                </Link>
                <Link href="/cars/hatchback" className="text-sm bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 px-3 py-1 rounded-full transition-colors">
                  Hatchback
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 lg:mt-16">
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary-200">500+</div>
            <div className="text-sm lg:text-base text-primary-100">Car Models</div>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary-200">50+</div>
            <div className="text-sm lg:text-base text-primary-100">Brands</div>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary-200">100+</div>
            <div className="text-sm lg:text-base text-primary-100">Cities</div>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-primary-200">1M+</div>
            <div className="text-sm lg:text-base text-primary-100">Happy Users</div>
          </div>
        </div>
      </div>
    </section>
  )
}
