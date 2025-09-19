'use client'

import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Heart, Share, Star, ChevronDown, Search, MapPin, Menu } from 'lucide-react'
import StickyNavigation from './StickyNavigation'
import CarEMISection from './CarEMISection'
import ModelHighlights from './ModelHighlights'
import ModelPriceSEO from './ModelPriceSEO'
import VariantSection from './VariantSection'
import ModelColors from './ModelColors'
import ProsConsSection from './ProsConsSection'
import ModelSummarySEO from './ModelSummarySEO'
import EngineHighlightsSEO from './EngineHighlightsSEO'
import ModelMileage from './ModelMileage'
import SimilarCars from './SimilarCars'
import CompareCars from './CompareCars'
import FAQSection from './FAQSection'
import CarReviews from './CarReviews'
import CarVideos from './CarVideos'
import CarNews from './CarNews'
import UpcomingCars from './UpcomingCars'
import Footer from '../Footer'

interface CarData {
  brand: string
  model: string
  startingPrice: string
  endingPrice: string
  rating: number
  reviewCount: number
  launchYear: number
  description: string
  images: string[]
  specifications: {
    engine: string
    power: string
    torque: string
    transmission: string
    fuelType: string
    mileage: string
    seatingCapacity: number
    bootSpace: string
    groundClearance: string
    length: string
    width: string
    height: string
    wheelbase: string
    kerbWeight: string
    fuelTankCapacity: string
    turningRadius: string
    maxSpeed: string
    acceleration: string
    compressionRatio: string
    valvesPerCylinder: number
    maxPowerRpm: string
    maxTorqueRpm: string
    emissionStandard: string
    gearbox: string
    driveType: string
    steeringType: string
    frontSuspension: string
    rearSuspension: string
    frontBrakeType: string
    rearBrakeType: string
    wheelSize: string
    tyreSize: string
    alloyWheels: boolean
    spareTyre: string
  }
  colors: Array<{
    id: number
    name: string
    hexCode: string
    popular: boolean
  }>
  pros: string[]
  cons: string[]
  mileage: Array<{
    condition: string
    value: string
    unit: string
  }>
}

interface CarModelPageProps {
  carData: CarData
}

const CarModelPage: React.FC<CarModelPageProps> = ({ carData }) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [highlightsTab, setHighlightsTab] = useState('key-features')
  const [variantFilter, setVariantFilter] = useState('all')
  const [showAllVariants, setShowAllVariants] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carData.images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [carData.images.length])

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'hero', 'pricing', 'specifications', 'variants', 'highlights', 'colors', 
        'pros-cons', 'summary', 'engine', 'mileage', 'similar-cars', 'compare', 
        'news', 'videos', 'faq', 'reviews', 'upcoming', 'new-launches', 'consultation', 'emi-calculator'
      ]
      
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (current && current !== activeSection) {
        setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeSection])

  // Dynamic variant data
  const variantData = [
    {
      id: 1,
      name: 'Smart (O) 1.2 Revotron',
      fuelType: 'petrol',
      transmission: 'Manual',
      power: '86 Bhp',
      price: '8.00',
      features: 'Dual Airbags, ABS with EBD, Reverse Parking Sensors, Central Locking, Power Steering',
      isAutomatic: false
    },
    {
      id: 2,
      name: 'Smart Plus 1.2 Revotron',
      fuelType: 'petrol',
      transmission: 'Manual',
      power: '86 Bhp',
      price: '9.25',
      features: 'All Smart features plus Touchscreen Infotainment, Steering Mounted Controls, Height Adjustable Driver Seat',
      isAutomatic: false
    },
    {
      id: 3,
      name: 'Pure (S) 1.5 Revotorq',
      fuelType: 'diesel',
      transmission: 'Manual',
      power: '110 Bhp',
      price: '10.50',
      features: 'Diesel Engine, Enhanced Torque, Fuel Efficient, Manual Transmission',
      isAutomatic: false
    },
    {
      id: 4,
      name: 'Creative Plus 1.2 Revotron AMT',
      fuelType: 'petrol',
      transmission: 'AMT',
      power: '86 Bhp',
      price: '11.75',
      features: 'AMT Transmission, Touchscreen, Reverse Camera, Climate Control, Alloy Wheels',
      isAutomatic: true
    },
    {
      id: 5,
      name: 'Fearless Plus 1.5 Revotorq',
      fuelType: 'diesel',
      transmission: 'Manual',
      power: '110 Bhp',
      price: '13.20',
      features: 'Premium Interior, Sunroof, Connected Car Tech, 6 Airbags, ESP',
      isAutomatic: false
    },
    {
      id: 6,
      name: 'Fearless Plus S 1.2 Turbo DCT',
      fuelType: 'petrol',
      transmission: 'DCT',
      power: '120 Bhp',
      price: '15.60',
      features: 'Turbo Petrol Engine, DCT Automatic, Premium Features, Advanced Safety Suite',
      isAutomatic: true
    }
  ]

  // Filter variants based on selected filter
  const filteredVariants = variantData.filter(variant => {
    if (variantFilter === 'all') return true
    if (variantFilter === 'automatic') return variant.isAutomatic
    if (variantFilter === 'cng') return variant.fuelType === 'cng'
    return variant.fuelType === variantFilter
  })

  // Show only first 3 variants unless "show all" is clicked
  const displayedVariants = showAllVariants ? filteredVariants : filteredVariants.slice(0, 3)

  const toggleVariantDescription = (variantId: number) => {
    // This would typically update state to show/hide full description for specific variant
    console.log(`Toggle description for variant ${variantId}`)
  }

  const highlightsData = {
    'key-features': [
      { title: 'Advanced Safety Features', image: '/images/safety.jpg' },
      { title: 'Premium Interior', image: '/images/interior.jpg' },
      { title: 'Touchscreen Infotainment', image: '/images/touchscreen.jpg' },
      { title: 'Climate Control', image: '/images/climate.jpg' },
      { title: 'Alloy Wheels', image: '/images/wheels.jpg' },
      { title: 'LED Headlights', image: '/images/headlights.jpg' }
    ],
    'space-comfort': [
      { title: 'Spacious Cabin', image: '/images/cabin.jpg' },
      { title: 'Comfortable Seating', image: '/images/seats.jpg' },
      { title: 'Ample Legroom', image: '/images/legroom.jpg' },
      { title: 'Premium Upholstery', image: '/images/upholstery.jpg' },
      { title: 'Adjustable Seats', image: '/images/adjustable.jpg' },
      { title: 'Rear AC Vents', image: '/images/ac-vents.jpg' }
    ],
    'storage-convenience': [
      { title: 'Large Boot Space', image: '/images/boot.jpg' },
      { title: 'Multiple Storage', image: '/images/storage.jpg' },
      { title: 'Cup Holders', image: '/images/cups.jpg' },
      { title: 'Door Pockets', image: '/images/pockets.jpg' },
      { title: 'Glove Compartment', image: '/images/glove.jpg' },
      { title: 'Utility Hooks', image: '/images/hooks.jpg' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: '360-view', label: '360° View' },
              { id: 'variants', label: 'Variants' },
              { id: 'offers', label: 'Offers' },
              { id: 'expert-review', label: 'Expert Review' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-1 font-medium text-sm md:text-base transition-all duration-300 relative ${
                  tab.id === activeTab
                    ? 'text-teal-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
                {tab.id === activeTab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Show all sections when activeTab is overview */}
      {activeTab === 'overview' && (
        <>
          {/* Hero Section with Car Image */}
          <div id="hero" className="bg-gradient-to-br from-orange-300 via-orange-400 to-yellow-300 relative overflow-hidden">
            {/* Share Button */}
            <button className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white rounded-lg p-3 transition-all duration-300 shadow-md">
              <Share className="h-5 w-5 text-gray-700" />
            </button>

            {/* Navigation Arrow - Right */}
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-3 transition-all duration-300 shadow-md">
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>

            {/* Car Image Container */}
            <div className="relative h-96 flex items-center justify-center px-8 py-8">
              <div className="relative z-10 max-w-4xl w-full">
                <img
                  src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=500&fit=crop&auto=format"
                  alt={`${carData.brand} ${carData.model}`}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'block';
                  }}
                />
                <div className="hidden text-8xl text-white/90 text-center">🚗</div>
              </div>
            </div>
          </div>

          {/* Car Details Section */}
          <div className="bg-white px-4 py-6 md:py-8">
            <div className="max-w-6xl mx-auto">
              {/* Car Title and Heart */}
              <div className="flex items-start justify-between mb-4 md:mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2">
                    Renault Kwid
                  </h1>
                </div>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 md:p-3 rounded-full transition-all duration-300 ${
                    isLiked ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Heart className={`h-6 w-6 md:h-8 md:w-8 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Rating Section */}
              <div className="flex items-center space-x-4 mb-4 md:mb-6">
                <div className="flex items-center bg-teal-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
                  <Star className="h-4 w-4 md:h-5 md:w-5 fill-current mr-1.5 md:mr-2" />
                  <span className="font-bold text-base md:text-lg">4.7</span>
                  <span className="text-xs md:text-sm ml-1.5 md:ml-2">User Rating (21)</span>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-lg font-medium transition-colors text-sm md:text-base">
                  Rate & Win
                </button>
              </div>

              {/* Description */}
              <div className="mb-6 md:mb-8">
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  The price of Mercedes-Benz C-Class, a 5 seater Sedan, ranges from Rs. 61.00 - 68.00 Lakh. It is available in 3
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-blue-500 hover:text-blue-600 font-medium ml-2 transition-colors text-sm md:text-base"
                  >
                    ...more
                  </button>
                </p>
              </div>

              {/* Price Range */}
              <div className="mb-6 md:mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
                  <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600">
                    ₹65.5 - 78.8 Lakhs
                  </span>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base lg:text-lg">
                    Get On-Road Price
                  </button>
                </div>
              </div>

              {/* Variant and City Selection Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="relative">
                  <select className="w-full bg-white border-2 border-gray-300 rounded-xl px-4 py-3 md:px-6 md:py-4 text-gray-700 font-medium text-sm md:text-base appearance-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 cursor-pointer hover:border-gray-400">
                    <option>Choose Variant</option>
                    <option>RXE</option>
                    <option>RXL</option>
                    <option>RXT</option>
                    <option>Climber</option>
                  </select>
                  <ChevronDown className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-red-500 pointer-events-none" />
                </div>

                <div className="relative">
                  <select className="w-full bg-white border-2 border-gray-300 rounded-xl px-4 py-3 md:px-6 md:py-4 text-gray-700 font-medium text-sm md:text-base appearance-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 cursor-pointer hover:border-gray-400">
                    <option>Change City</option>
                    <option>New Delhi</option>
                    <option>Mumbai</option>
                    <option>Bangalore</option>
                    <option>Chennai</option>
                    <option>Kolkata</option>
                    <option>Hyderabad</option>
                    <option>Pune</option>
                  </select>
                  <ChevronDown className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-red-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* EMI Calculator Section */}
          <div id="emi-calculator" className="bg-gray-50 px-4 py-6 md:py-8">
            <div className="max-w-6xl mx-auto">
              {/* EMI Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg md:text-xl">K</span>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900">kotak</h3>
                      <p className="text-sm md:text-base text-gray-600">Mahindra Bank</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs md:text-sm text-gray-600">Starting EMI</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">₹12,700</p>
                    <p className="text-xs md:text-sm text-gray-600">per month</p>
                  </div>
                </div>
                
                <button className="w-full bg-red-500 text-white font-semibold py-3 px-6 rounded-full flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors text-sm md:text-base">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>Calculate EMI</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Tab Content */}
      {activeTab === 'variants' && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <VariantSection carData={carData} />
        </div>
      )}

      {activeTab === 'offers' && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {carData.model} - Current Offers
            </h2>
            <p className="text-gray-600">Offers section coming soon...</p>
          </div>
        </div>
      )}

      {activeTab === '360-view' && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {carData.model} - 360° View
            </h2>
            <p className="text-gray-600">360° view coming soon...</p>
          </div>
        </div>
      )}
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default CarModelPage
