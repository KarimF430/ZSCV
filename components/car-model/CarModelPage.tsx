'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  ChevronLeft, ChevronRight, Heart, Share, Star, ChevronDown, Search, MapPin, Menu,
  Calculator, IndianRupee, TrendingUp, Calendar, Clock, User, Tag, Eye, MessageCircle,
  Play, ThumbsUp, ThumbsDown, Phone, Mail, Send, BookOpen, Award, Shield, Fuel,
  Gauge, Users, Package, Zap, Settings, Info, ExternalLink, Filter, Grid, List
} from 'lucide-react'
import Footer from '../Footer'

interface CarData {
  brand: string
  model: string
  fullName: string
  startingPrice: number
  endingPrice: number
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
    groundClearance: string
    safetyRating: string
    airbags: number
    abs: boolean
  }
  colors: Array<{
    id: string
    name: string
    hexCode: string
    popular: boolean
  }>
  pros: string[]
  cons: string[]
  mileage: {
    city: string
    highway: string
    combined: string
  }
}

interface CarModelPageProps {
  carData: CarData
}

const CarModelPage: React.FC<CarModelPageProps> = ({ carData }) => {
  const [activeSection, setActiveSection] = useState('hero')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState('')
  const [selectedCity, setSelectedCity] = useState('Delhi')
  const [highlightsTab, setHighlightsTab] = useState('key-features')
  const [variantFilter, setVariantFilter] = useState('all')
  const [showAllVariants, setShowAllVariants] = useState(false)
  const [showFullNews, setShowFullNews] = useState(false)
  const [showFullVideos, setShowFullVideos] = useState(false)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const sectionRefs = useRef<{[key: string]: HTMLElement | null}>({})

  // Navigation sections for sticky header
  const navigationSections = [
    { id: 'hero', label: 'Overview' },
    { id: 'pricing', label: 'Price' },
    { id: 'specifications', label: 'Specs' },
    { id: 'variants', label: 'Variants' },
    { id: 'highlights', label: 'Features' },
    { id: 'colors', label: 'Colors' },
    { id: 'pros-cons', label: 'Pros & Cons' },
    { id: 'mileage', label: 'Mileage' },
    { id: 'similar-cars', label: 'Similar Cars' },
    { id: 'compare', label: 'Compare' },
    { id: 'news', label: 'News' },
    { id: 'videos', label: 'Videos' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'faq', label: 'FAQ' }
  ]

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
      const scrollPosition = window.scrollY + 100

      for (const section of navigationSections) {
        const element = sectionRefs.current[section.id]
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mock data for various sections
  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata']
  
  const variants = [
    {
      id: 1,
      name: 'LXI',
      fuelType: 'petrol',
      transmission: 'Manual',
      power: '86 Bhp',
      price: '8.00',
      features: 'Dual Airbags, ABS with EBD, Reverse Parking Sensors',
      isAutomatic: false
    },
    {
      id: 2,
      name: 'VXI',
      fuelType: 'petrol', 
      transmission: 'Manual',
      power: '86 Bhp',
      price: '9.25',
      features: 'Touchscreen Infotainment, Steering Mounted Controls',
      isAutomatic: false
    },
    {
      id: 3,
      name: 'ZXI+ AMT',
      fuelType: 'petrol',
      transmission: 'AMT',
      power: '86 Bhp',
      price: '11.75',
      features: 'AMT Transmission, Reverse Camera, Climate Control',
      isAutomatic: true
    }
  ]

  const highlights = {
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
      { title: 'Premium Upholstery', image: '/images/upholstery.jpg' }
    ],
    'storage-convenience': [
      { title: 'Large Boot Space', image: '/images/boot.jpg' },
      { title: 'Multiple Storage', image: '/images/storage.jpg' },
      { title: 'Cup Holders', image: '/images/cups.jpg' },
      { title: 'Door Pockets', image: '/images/pockets.jpg' }
    ]
  }

  const newsArticles = [
    {
      id: 1,
      title: `${carData.brand} ${carData.model} 2024 Review: Complete Analysis`,
      excerpt: 'Our comprehensive review of the latest model with detailed analysis.',
      author: 'Auto Expert',
      publishedAt: '2024-01-15',
      readTime: 8,
      category: 'review'
    },
    {
      id: 2,
      title: `${carData.brand} ${carData.model} vs Competition: Which is Better?`,
      excerpt: 'Detailed comparison with similar cars in the segment.',
      author: 'Car Guru',
      publishedAt: '2024-01-10',
      readTime: 6,
      category: 'comparison'
    }
  ]

  const videos = [
    {
      id: 1,
      title: `${carData.brand} ${carData.model} Test Drive Review`,
      thumbnail: '/video-thumbs/test-drive.jpg',
      duration: '12:45',
      views: '1.2M'
    },
    {
      id: 2,
      title: `${carData.brand} ${carData.model} Interior & Exterior Walkaround`,
      thumbnail: '/video-thumbs/walkaround.jpg',
      duration: '8:30',
      views: '856K'
    }
  ]

  const faqs = [
    {
      id: 1,
      question: `What is the starting price of ${carData.brand} ${carData.model}?`,
      answer: `The ${carData.brand} ${carData.model} starts at ₹${(carData.startingPrice / 100000).toFixed(2)} Lakh (ex-showroom).`
    },
    {
      id: 2,
      question: `What is the mileage of ${carData.brand} ${carData.model}?`,
      answer: `The ${carData.brand} ${carData.model} delivers a mileage of ${carData.specifications.mileage}.`
    },
    {
      id: 3,
      question: `How many variants are available?`,
      answer: `The ${carData.brand} ${carData.model} is available in ${variants.length} variants across different fuel types and transmissions.`
    }
  ]

  const userReviews = [
    {
      id: 1,
      author: 'Rajesh Kumar',
      location: 'Mumbai',
      rating: 4.5,
      title: 'Excellent car for city driving',
      review: 'Great fuel efficiency and comfortable interiors. Perfect for daily commute.',
      date: '2024-01-20',
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      author: 'Priya Sharma',
      location: 'Delhi',
      rating: 4.0,
      title: 'Value for money',
      review: 'Good features at this price point. Service network is excellent.',
      date: '2024-01-18',
      helpful: 8,
      verified: true
    }
  ]

  const formatPrice = (price: number) => {
    return `₹${(price / 100000).toFixed(2)} Lakh`
  }

  // Filter variants based on selected filter
  const filteredVariants = variants.filter(variant => {
    if (variantFilter === 'all') return true
    if (variantFilter === 'automatic') return variant.isAutomatic
    if (variantFilter === 'petrol') return variant.fuelType === 'petrol'
    if (variantFilter === 'diesel') return variant.fuelType === 'diesel'
    return variant.fuelType === variantFilter
  })

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Top Ribbon (Sticky Navigation Bar) */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 overflow-x-auto scrollbar-hide py-3">
            {navigationSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`whitespace-nowrap text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'text-primary-600 border-b-2 border-primary-600 pb-2'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Hero Section (Car Box Image) */}
      <section 
        id="hero" 
        ref={(el) => { sectionRefs.current['hero'] = el }}
        className="bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden"
      >
        {/* Share Button */}
        <button className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white rounded-lg p-3 transition-all duration-300 shadow-md">
          <Share className="h-5 w-5 text-gray-700" />
        </button>

        {/* Navigation Arrows */}
        <button 
          onClick={() => setCurrentImageIndex((prev) => prev === 0 ? carData.images.length - 1 : prev - 1)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-3 transition-all duration-300 shadow-md"
        >
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>
        
        <button 
          onClick={() => setCurrentImageIndex((prev) => (prev + 1) % carData.images.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-3 transition-all duration-300 shadow-md"
        >
          <ChevronRight className="h-6 w-6 text-gray-600" />
        </button>

        {/* Car Image Container */}
        <div className="relative h-96 flex items-center justify-center px-8 py-8">
          <div className="relative z-10 max-w-4xl w-full">
            <img
              src={carData.images[currentImageIndex] || "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=500&fit=crop&auto=format"}
              alt={carData.fullName}
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Car Details Below Hero */}
        <div className="bg-white px-4 py-6 md:py-8">
          <div className="max-w-7xl mx-auto">
            {/* Car Title and Heart */}
            <div className="flex items-start justify-between mb-4 md:mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2">
                  {carData.fullName}
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
              <div className="flex items-center bg-primary-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
                <Star className="h-4 w-4 md:h-5 md:w-5 fill-current mr-1.5 md:mr-2" />
                <span className="font-bold text-base md:text-lg">{carData.rating}</span>
                <span className="text-xs md:text-sm ml-1.5 md:ml-2">({carData.reviewCount})</span>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-lg font-medium transition-colors text-sm md:text-base">
                Rate & Review
              </button>
            </div>

            {/* Description */}
            <div className="mb-6 md:mb-8">
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                {showFullDescription ? carData.description : carData.description.substring(0, 150)}
                {carData.description.length > 150 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-blue-500 hover:text-blue-600 font-medium ml-2 transition-colors text-sm md:text-base"
                  >
                    {showFullDescription ? '...less' : '...more'}
                  </button>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pricing Section */}
      <section 
        id="pricing" 
        ref={(el) => { sectionRefs.current['pricing'] = el }}
        className="bg-white px-4 py-6 md:py-8 border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {carData.brand} {carData.model} Price
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600">
                  {formatPrice(carData.startingPrice)} - {formatPrice(carData.endingPrice)}
                </span>
                <span className="text-sm text-gray-500">*Ex-showroom</span>
              </div>
            </div>
            <Link
              href="/price-breakup"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-sm md:text-base lg:text-lg"
            >
              Get On-Road Price
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Variants & City Selector */}
      <section className="bg-gray-50 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="relative">
              <select 
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="w-full bg-white border-2 border-gray-300 rounded-xl px-4 py-3 md:px-6 md:py-4 text-gray-700 font-medium text-sm md:text-base appearance-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300 cursor-pointer hover:border-gray-400"
              >
                <option value="">Choose Variant</option>
                {variants.map((variant) => (
                  <option key={variant.id} value={variant.name}>
                    {variant.name} - ₹{variant.price} Lakh
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-primary-500 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-white border-2 border-gray-300 rounded-xl px-4 py-3 md:px-6 md:py-4 text-gray-700 font-medium text-sm md:text-base appearance-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300 cursor-pointer hover:border-gray-400"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-primary-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. EMI Box */}
      <section className="bg-white px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-6 border border-primary-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">EMI Calculator</h3>
                  <p className="text-sm text-gray-600">Starting EMI from</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl md:text-3xl font-bold text-primary-600">₹12,500</p>
                <p className="text-sm text-gray-600">per month</p>
              </div>
            </div>
            
            <Link
              href="/emi-calculator"
              className="w-full bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-primary-700 transition-colors"
            >
              <Calculator className="w-5 h-5" />
              <span>Calculate EMI</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Key Specifications */}
      <section 
        id="specifications" 
        ref={(el) => { sectionRefs.current['specifications'] = el }}
        className="bg-gray-50 px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {carData.brand} {carData.model} Key Specifications
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <Zap className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Engine</p>
              <p className="font-semibold text-sm">{carData.specifications.engine}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <Gauge className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Power</p>
              <p className="font-semibold text-sm">{carData.specifications.power}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <Settings className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Torque</p>
              <p className="font-semibold text-sm">{carData.specifications.torque}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Seating</p>
              <p className="font-semibold text-sm">{carData.specifications.seatingCapacity}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <Fuel className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Mileage</p>
              <p className="font-semibold text-sm">{carData.specifications.mileage}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <Shield className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Safety</p>
              <p className="font-semibold text-sm">{carData.specifications.safetyRating}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Model Highlights (Scrollable Grid) */}
      <section 
        id="highlights" 
        ref={(el) => { sectionRefs.current['highlights'] = el }}
        className="bg-white px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {carData.brand} {carData.model} Highlights
          </h2>
          
          {/* Highlights Tabs */}
          <div className="flex space-x-4 mb-6 border-b border-gray-200">
            {Object.keys(highlights).map((tab) => (
              <button
                key={tab}
                onClick={() => setHighlightsTab(tab)}
                className={`py-2 px-4 font-medium text-sm transition-colors ${
                  highlightsTab === tab
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' & ')}
              </button>
            ))}
          </div>
          
          {/* Scrollable Grid */}
          <div className="overflow-x-auto">
            <div className="flex space-x-4 pb-4">
              {highlights[highlightsTab as keyof typeof highlights].map((item, index) => (
                <div key={index} className="flex-shrink-0 w-48 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg mb-3 flex items-center justify-center">
                    <Package className="h-12 w-12 text-white" />
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Model Price Section */}
      <section className="bg-gray-50 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {carData.brand} {carData.model} Price
          </h2>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-gray-700 leading-relaxed">
              The {carData.fullName} is available in {variants.length} variants with prices ranging from {formatPrice(carData.startingPrice)} to {formatPrice(carData.endingPrice)} (ex-showroom). The vehicle offers excellent value for money with premium features and reliable performance across all variants.
              {!showFullDescription && (
                <button
                  onClick={() => setShowFullDescription(true)}
                  className="text-primary-600 hover:text-primary-700 font-medium ml-2"
                >
                  Read More
                </button>
              )}
            </p>
            
            {showFullDescription && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed">
                  Each variant comes with unique features and specifications tailored to different customer needs. The base variant offers essential features while the top variant includes premium amenities like advanced infotainment system, enhanced safety features, and superior comfort options.
                </p>
                <button
                  onClick={() => setShowFullDescription(false)}
                  className="text-primary-600 hover:text-primary-700 font-medium mt-2"
                >
                  Show Less
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 9. Variants Section */}
      <section 
        id="variants" 
        ref={(el) => { sectionRefs.current['variants'] = el }}
        className="bg-white px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {carData.brand} {carData.model} Variants
            </h2>
            
            {/* Filter Buttons */}
            <div className="flex space-x-2">
              {['all', 'petrol', 'diesel', 'automatic'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setVariantFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    variantFilter === filter
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid gap-4">
            {(showAllVariants ? filteredVariants : filteredVariants.slice(0, 2)).map((variant) => (
              <div key={variant.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {carData.brand} {carData.model} {variant.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{variant.fuelType}</span>
                      <span>{variant.transmission}</span>
                      <span>{variant.power}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600">₹{variant.price} Lakh</p>
                    <p className="text-sm text-gray-500">Ex-showroom</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mb-4">{variant.features}</p>
                
                <div className="flex space-x-3">
                  <Link
                    href={`/cars/${carData.brand.toLowerCase()}/${carData.model.toLowerCase()}/variants`}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    View Details
                  </Link>
                  <Link
                    href="/price-breakup"
                    className="bg-white hover:bg-gray-50 text-gray-900 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium transition-colors"
                  >
                    Get Price
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {filteredVariants.length > 2 && !showAllVariants && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAllVariants(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View All {filteredVariants.length} Variants
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 10. Model Colors */}
      <section 
        id="colors" 
        ref={(el) => { sectionRefs.current['colors'] = el }}
        className="bg-gray-50 px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {carData.brand} {carData.model} Colors
          </h2>
          
          <div className="overflow-x-auto">
            <div className="flex space-x-6 pb-4">
              {carData.colors.map((color) => (
                <div key={color.id} className="flex-shrink-0 text-center">
                  <div className="relative mb-3">
                    <div className="w-24 h-24 rounded-full border-4 border-gray-200 mb-2 overflow-hidden">
                      <div 
                        className="w-full h-full"
                        style={{ backgroundColor: color.hexCode }}
                      ></div>
                    </div>
                    {color.popular && (
                      <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-900">{color.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. Pros & Cons Section */}
      <section 
        id="pros-cons" 
        ref={(el) => { sectionRefs.current['pros-cons'] = el }}
        className="bg-white px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {carData.brand} {carData.model} Pros & Cons
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pros */}
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <div className="flex items-center mb-4">
                <ThumbsUp className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-lg font-bold text-green-800">Pros</h3>
              </div>
              <ul className="space-y-3">
                {carData.pros.map((pro, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-green-700">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Cons */}
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <div className="flex items-center mb-4">
                <ThumbsDown className="h-6 w-6 text-red-600 mr-2" />
                <h3 className="text-lg font-bold text-red-800">Cons</h3>
              </div>
              <ul className="space-y-3">
                {carData.cons.map((con, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-red-700">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Model Summary */}
      <section className="bg-gray-50 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {carData.brand} {carData.model} Summary
          </h2>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-gray-700 leading-relaxed text-lg">
              {carData.description}
            </p>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-1">{formatPrice(carData.startingPrice)}</div>
                  <div className="text-sm text-gray-600">Starting Price</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-1">{carData.specifications.mileage}</div>
                  <div className="text-sm text-gray-600">Mileage</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-1">{carData.specifications.safetyRating}</div>
                  <div className="text-sm text-gray-600">Safety Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Engine Highlights */}
      <section className="bg-white px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {carData.brand} {carData.model} Engine Highlights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
              <Zap className="h-12 w-12 text-primary-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Engine</h3>
              <p className="text-gray-600">{carData.specifications.engine}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
              <Gauge className="h-12 w-12 text-primary-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Max Power</h3>
              <p className="text-gray-600">{carData.specifications.power}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
              <Settings className="h-12 w-12 text-primary-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Max Torque</h3>
              <p className="text-gray-600">{carData.specifications.torque}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
              <Fuel className="h-12 w-12 text-primary-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Fuel Type</h3>
              <p className="text-gray-600">{carData.specifications.fuelType}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 14. Mileage Section */}
      <section 
        id="mileage" 
        ref={(el) => { sectionRefs.current['mileage'] = el }}
        className="bg-gray-50 px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {carData.brand} {carData.model} Mileage
          </h2>
          
          <div className="overflow-x-auto">
            <div className="flex space-x-6 pb-4">
              <div className="flex-shrink-0 bg-white rounded-lg p-6 border border-gray-200 text-center min-w-[200px]">
                <Fuel className="h-12 w-12 text-primary-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">City Mileage</h3>
                <p className="text-2xl font-bold text-primary-600">{carData.mileage.city}</p>
              </div>
              
              <div className="flex-shrink-0 bg-white rounded-lg p-6 border border-gray-200 text-center min-w-[200px]">
                <Fuel className="h-12 w-12 text-primary-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Highway Mileage</h3>
                <p className="text-2xl font-bold text-primary-600">{carData.mileage.highway}</p>
              </div>
              
              <div className="flex-shrink-0 bg-white rounded-lg p-6 border border-gray-200 text-center min-w-[200px]">
                <Fuel className="h-12 w-12 text-primary-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Combined Mileage</h3>
                <p className="text-2xl font-bold text-primary-600">{carData.mileage.combined}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 15. Similar Cars Section */}
      <section 
        id="similar-cars" 
        ref={(el) => { sectionRefs.current['similar-cars'] = el }}
        className="bg-white px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Cars Similar to {carData.brand} {carData.model}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mock similar cars */}
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-white text-6xl">🚗</div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Similar Car {index}</h3>
                <p className="text-primary-600 font-semibold mb-3">₹8.50 - 12.00 Lakh</p>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    View Details
                  </button>
                  <button className="flex-1 bg-white hover:bg-gray-50 text-gray-900 py-2 px-4 rounded-lg border border-gray-300 text-sm font-medium transition-colors">
                    Compare
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16. Compare Cars Section */}
      <section 
        id="compare" 
        ref={(el) => { sectionRefs.current['compare'] = el }}
        className="bg-gray-50 px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Compare {carData.brand} {carData.model}
          </h2>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Cars to Compare</h3>
              <p className="text-gray-600">Choose up to 3 cars to compare specifications and features</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🚗</span>
                </div>
                <p className="font-medium text-gray-900">{carData.fullName}</p>
                <p className="text-sm text-primary-600">Selected</p>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-300 cursor-pointer">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600">Add Car 2</p>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-300 cursor-pointer">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600">Add Car 3</p>
              </div>
            </div>
            
            <div className="text-center">
              <Link
                href="/compare"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
              >
                <ExternalLink className="h-5 w-5" />
                <span>Go to Compare Tool</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 17. Model News Section */}
      <section 
        id="news" 
        ref={(el) => { sectionRefs.current['news'] = el }}
        className="bg-white px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {carData.brand} {carData.model} News
            </h2>
            <Link
              href="/news"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(showFullNews ? newsArticles : newsArticles.slice(0, 2)).map((article) => (
              <article key={article.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    article.category === 'review' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500 ml-3">{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-3">{article.author}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{article.readTime} min read</span>
                  </div>
                  <Link
                    href={`/news/${article.id}`}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
          
          {newsArticles.length > 2 && !showFullNews && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowFullNews(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Load More News
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 18. Model Videos */}
      <section 
        id="videos" 
        ref={(el) => { sectionRefs.current['videos'] = el }}
        className="bg-gray-50 px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {carData.brand} {carData.model} Videos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showFullVideos ? videos : videos.slice(0, 2)).map((video) => (
              <div key={video.id} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <div className="relative h-48 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                  <Play className="h-16 w-16 text-white opacity-80" />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{video.views} views</span>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 font-medium">
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {videos.length > 2 && !showFullVideos && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowFullVideos(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Load More Videos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 19. FAQ Section */}
      <section 
        id="faq" 
        ref={(el) => { sectionRefs.current['faq'] = el }}
        className="bg-white px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {carData.brand} {carData.model} FAQ
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-gray-50 rounded-lg border border-gray-200">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      expandedFAQ === faq.id ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 20. User Reviews */}
      <section 
        id="reviews" 
        ref={(el) => { sectionRefs.current['reviews'] = el }}
        className="bg-gray-50 px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {carData.brand} {carData.model} User Reviews
            </h2>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Write a Review
            </button>
          </div>
          
          <div className="grid gap-6">
            {userReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">{review.author}</p>
                        {review.verified && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{review.location}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium text-gray-900">{review.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                <p className="text-gray-700 mb-4">{review.review}</p>
                
                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700">
                    <ThumbsUp className="h-4 w-4" />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                  <button className="text-sm text-primary-600 hover:text-primary-700">
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 21. Upcoming Cars */}
      <section className="bg-white px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Cars</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg mb-4 flex items-center justify-center">
                  <Calendar className="h-12 w-12 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Upcoming Car {index}</h3>
                <p className="text-primary-600 font-semibold mb-2">Expected Price: ₹10-15 Lakh</p>
                <p className="text-sm text-gray-600 mb-4">Launch Date: Q2 2024</p>
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  Get Notified
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 22. New Launches */}
      <section className="bg-gray-50 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">New Launches</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg mb-4 flex items-center justify-center">
                  <Award className="h-12 w-12 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">New Launch {index}</h3>
                <p className="text-primary-600 font-semibold mb-2">₹8.50 - 12.00 Lakh</p>
                <p className="text-sm text-gray-600 mb-4">Recently Launched</p>
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 23. Consultancy Ad Section */}
      <section className="bg-gradient-to-r from-primary-600 to-blue-600 px-4 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Expert Car Buying Advice?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get personalized recommendations from our automotive experts. We'll help you find the perfect car that fits your needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>Call Now</span>
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Get Free Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 24. Feedback Section */}
      <section className="bg-white px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Share Your Feedback</h2>
              <p className="text-gray-600">Help us improve by sharing your thoughts about this page</p>
            </div>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Tell us what you think about this car page..."
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Submit Feedback</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 25. Footer */}
      <Footer />
    </div>
  )
}

export default CarModelPage