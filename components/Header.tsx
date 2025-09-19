'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Menu, X, Car, Calculator, FileText, MapPin } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">MotorOctane</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/new-cars" className="text-gray-700 hover:text-primary-600 font-medium">
              New Cars
            </Link>
            <Link href="/compare" className="text-gray-700 hover:text-primary-600 font-medium">
              Compare
            </Link>
            <Link href="/emi-calculator" className="text-gray-700 hover:text-primary-600 font-medium">
              EMI Calculator
            </Link>
            <Link href="/offers" className="text-gray-700 hover:text-primary-600 font-medium">
              Offers
            </Link>
            <Link href="/news" className="text-gray-700 hover:text-primary-600 font-medium">
              News
            </Link>
          </nav>

          {/* Desktop Search & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="p-2 text-gray-500 hover:text-primary-600 md:hidden"
            >
              <Search className="h-5 w-5" />
            </button>
            
            {/* Desktop Search */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search cars, brands..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <button
              onClick={toggleMenu}
              className="p-2 text-gray-500 hover:text-primary-600 md:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search cars, brands..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/new-cars"
                className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Car className="h-5 w-5" />
                <span>New Cars</span>
              </Link>
              <Link
                href="/compare"
                className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText className="h-5 w-5" />
                <span>Compare</span>
              </Link>
              <Link
                href="/emi-calculator"
                className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Calculator className="h-5 w-5" />
                <span>EMI Calculator</span>
              </Link>
              <Link
                href="/offers"
                className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <MapPin className="h-5 w-5" />
                <span>Offers</span>
              </Link>
              <Link
                href="/news"
                className="flex items-center space-x-3 text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText className="h-5 w-5" />
                <span>News</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
