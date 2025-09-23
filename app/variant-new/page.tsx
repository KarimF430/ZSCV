'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Share2, Star, Heart, Upload, ChevronDown } from 'lucide-react'
import Footer from '../../components/Footer'

export default function VariantPage() {
  const [activeTab, setActiveTab] = useState('Overview')

  const navItems = ['Overview', 'Price', 'Specs', 'Variants', 'EMI', 'Features']

  return (
    <div className="bg-white">
      <header className="sticky top-0 bg-white z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 border-b border-gray-200">
            <nav className="flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  onClick={() => setActiveTab(item)}
                  className={`pb-4 text-sm font-medium ${
                    activeTab === item
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side: Image Gallery */}
          <div>
            <div className="relative bg-gray-100 rounded-lg p-4 h-[400px] flex items-center justify-center">
              <img
                src="https://imgd.aeplcdn.com/1200x900/n/cw/ec/1/versions/maruti-suzuki-fronx-sigma-12l-mt.jpg"
                alt="Maruti Suzuki Fronx"
                className="max-h-full max-w-full object-contain"
              />
              <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                <Upload className="h-5 w-5 text-gray-600" />
              </button>
              <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Right side: Car Details */}
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-900">
                Maruti Suzuki Maruti Suzuki Fronx
              </h1>
              <button className="p-2">
                <Heart className="h-6 w-6 text-gray-400" />
              </button>
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-md">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-bold text-sm">4.2</span>
                <span className="text-sm">(1543)</span>
              </div>
              <button className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-md text-sm font-semibold">
                Rate & Review
              </button>
            </div>

            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              The Maruti Suzuki Maruti Suzuki Fronx is a premium vehicle that combines performance, comfort, and advanced technology. With its sleek design and effi... 
              <a href="#" className="text-blue-600 font-semibold">more</a>
            </p>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800">Maruti Suzuki Maruti Suzuki Fronx Price</h2>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                ₹6.19 Lakh - ₹12.50 Lakh
                <span className="text-sm font-normal text-gray-500 ml-2">*Ex-showroom</span>
              </p>
              <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Get On-Road Price
              </button>
            </div>

            <div className="mt-8 space-y-4">
              <div className="relative">
                <select className="w-full appearance-none border border-gray-300 rounded-lg py-3 px-4 bg-white text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Choose Variant</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
              <div className="relative">
                <select className="w-full appearance-none border border-gray-300 rounded-lg py-3 px-4 bg-white text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Delhi</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
