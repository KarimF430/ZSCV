'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Mic, Bot } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/ai-search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white min-h-[60vh] flex items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            AI Car Search
          </h1>
        </div>

        {/* AI Search Section */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
            {/* Search Input */}
            <div className="relative mb-6">
              <div className="flex items-center bg-gray-50 rounded-2xl border-2 border-gray-200 focus-within:border-blue-500 transition-colors">
                <Search className="ml-4 h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your perfect car..."
                  className="flex-1 px-4 py-4 bg-transparent text-gray-900 placeholder-gray-500 text-lg focus:outline-none"
                />
                <button className="mr-2 p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Mic className="h-6 w-6" />
                </button>
                <button className="mr-4 p-2 text-blue-600 hover:text-blue-700 transition-colors">
                  <Bot className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Search Button */}
            <button 
              onClick={handleSearch}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-2xl transition-colors duration-200 flex items-center justify-center space-x-3 text-lg"
            >
              <Search className="h-6 w-6" />
              <span>Search Cars</span>
            </button>

            {/* Popular Searches */}
            <div className="mt-8">
              <div className="text-gray-700 font-medium mb-4">Popular Searches:</div>
              <div className="flex flex-wrap gap-3">
                <Link href="/ai-search?q=Under ₹5 Lakh" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-colors text-sm">
                  Under ₹5 Lakh
                </Link>
                <Link href="/ai-search?q=SUV Cars" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-colors text-sm">
                  SUV Cars
                </Link>
                <Link href="/ai-search?q=Sedan Cars" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-colors text-sm">
                  Sedan Cars
                </Link>
                <Link href="/ai-search?q=Hatchback" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-colors text-sm">
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
