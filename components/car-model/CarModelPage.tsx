'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Heart, Star, Share2, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import Footer from '../Footer'
import ColorOptions from './ColorOptions'
import ProsAndCons from './ProsAndCons'
import ModelSummarySection from './ModelSummarySection'
import EngineHighlightsSection from './EngineHighlightsSection'
import MileageInformation from './MileageInformation'
import SimilarCarsSection from './SimilarCarsSection'
import CarComparisonSection from './CarComparisonSection'
import ModelNewsSection from './ModelNewsSection'
import YouTubeVideosSection from './YouTubeVideosSection'
import FAQSection from './FAQSection'
import UserReviewsSection from './UserReviewsSection'
import UpcomingCarsSection from './UpcomingCarsSection'
import NewLaunchesSection from './NewLaunchesSection'
import ConsultancyAdSection from './ConsultancyAdSection'
import FeedbackSection from './FeedbackSection'
import PageSection from '../common/PageSection'
import PageHeader from '../common/PageHeader'
import Card from '../common/Card'

// Mock data
const mockCarData = {
  name: "Renault Kwid",
  brand: "Renault",
  rating: 4.2,
  reviewCount: 1234,
  description: "The Renault Kwid is a compact hatchback that offers excellent fuel efficiency, modern features, and a spacious interior. Perfect for city driving with its compact dimensions and easy maneuverability.",
  priceRange: "₹4.64 - ₹6.45 Lakh",
  images: [
    "/api/placeholder/800/600",
    "/api/placeholder/800/600", 
    "/api/placeholder/800/600",
    "/api/placeholder/800/600"
  ],
  colors: [
    {
      name: "Ferrari Red",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop&auto=format",
      colorCode: "#DC143C"
    },
    {
      name: "Moonlight Silver",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop&auto=format",
      colorCode: "#C0C0C0"
    },
    {
      name: "Fiery Red",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop&auto=format",
      colorCode: "#DC143C"
    },
    {
      name: "Pearl White",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop&auto=format",
      colorCode: "#F8F8FF"
    },
    {
      name: "Midnight Black",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop&auto=format",
      colorCode: "#000000"
    }
  ],
  variants: [
    { id: 1, name: "Sigma", price: 619000 },
    { id: 2, name: "Delta", price: 720000 },
    { id: 3, name: "Zeta", price: 890000 },
    { id: 4, name: "Alpha", price: 1250000 }
  ],
  cities: [
    { id: 1, name: "Delhi" },
    { id: 2, name: "Mumbai" },
    { id: 3, name: "Bangalore" },
    { id: 4, name: "Chennai" }
  ]
}

const navigationSections = [
  { id: 'overview', label: 'Overview' },
  { id: '360-view', label: '360° View' },
  { id: 'variants', label: 'Variants' },
  { id: 'offers', label: 'Offers' },
  { id: 'expert-review', label: 'Expert Review' }
]

const CarModelPage = () => {
  const [activeSection, setActiveSection] = useState('overview')
  const [isLiked, setIsLiked] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(mockCarData.variants[0])
  const [selectedCity, setSelectedCity] = useState(mockCarData.cities[0])
  const [showVariantDropdown, setShowVariantDropdown] = useState(false)
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentColorIndex, setCurrentColorIndex] = useState(0)

  // Refs
  const variantDropdownRef = useRef<HTMLDivElement>(null)
  const cityDropdownRef = useRef<HTMLDivElement>(null)

  // Format price helper
  const formatPrice = (price: number) => {
    return `₹${(price / 100000).toFixed(2)} Lakh`
  }

  // Handle scroll for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (variantDropdownRef.current && !variantDropdownRef.current.contains(event.target as Node)) {
        setShowVariantDropdown(false)
      }
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setShowCityDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mockCarData.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + mockCarData.images.length) % mockCarData.images.length)
  }

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Cars', href: '/cars' },
    { label: mockCarData.brand, href: `/brands/${mockCarData.brand.toLowerCase()}` },
    { label: mockCarData.name }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title={`${mockCarData.brand} ${mockCarData.name}`}
        subtitle={`Explore ${mockCarData.brand} ${mockCarData.name} price, specifications, and reviews`}
        breadcrumbs={breadcrumbs}
        background="white"
      />

      {/* Sticky Navigation */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navigationSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeSection === section.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div>
        {/* Section 1: Overview */}
        <PageSection background="white" maxWidth="7xl">
          <div id="overview">
            {/* Hero Car Image */}
            <div className="relative mb-6">
              <div className="aspect-[16/9] bg-gradient-to-br from-orange-300 via-yellow-300 to-orange-400 rounded-lg overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=500&fit=crop&auto=format"
                  alt="Red Ferrari F40 sports car"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Car Details */}
            <div className="space-y-6">
              {/* Brand and Model with Heart */}
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    {mockCarData.brand} {mockCarData.name}
                  </h1>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex items-center bg-blue-600 text-white px-3 py-1.5 rounded-lg">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      <span className="font-semibold">{mockCarData.rating}</span>
                      <span className="ml-1">({mockCarData.reviewCount})</span>
                    </div>
                    <button className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-lg font-medium hover:bg-blue-200 transition-colors">
                      Rate & Review
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 transition-colors ${
                    isLiked ? 'text-red-600' : 'text-gray-400 hover:text-red-600'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Description */}
              <div>
                <p className="text-gray-600 leading-relaxed">
                  {showFullDescription 
                    ? mockCarData.description + " ...more detailed information about the vehicle's features, performance, and specifications."
                    : mockCarData.description
                  }
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-blue-600 hover:text-blue-700 font-medium ml-1"
                  >
                    {showFullDescription ? 'less' : '...more'}
                  </button>
                </p>
              </div>

              {/* Price Display */}
              <div className="mb-6">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {mockCarData.priceRange}
                </div>
                <div className="text-sm text-gray-600 mb-4">*Ex-showroom</div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Get On-Road Price
                </button>
              </div>

              {/* Variant and City Selection */}
              <div className="space-y-4">
                {/* Variant Selector */}
                <div className="relative" ref={variantDropdownRef}>
                  <button
                    onClick={() => setShowVariantDropdown(!showVariantDropdown)}
                    className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-white"
                  >
                    <div className="text-left">
                      <p className="text-gray-600 font-medium">Choose Variant</p>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-blue-600 transition-transform ${showVariantDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showVariantDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                      {mockCarData.variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => {
                            setSelectedVariant(variant)
                            setShowVariantDropdown(false)
                          }}
                          className="w-full text-left p-4 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg border-b border-gray-100 last:border-b-0"
                        >
                          <p className="font-medium text-gray-900">{variant.name}</p>
                          <p className="text-sm text-gray-600">{formatPrice(variant.price)}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* City Selector */}
                <div className="relative" ref={cityDropdownRef}>
                  <button
                    onClick={() => setShowCityDropdown(!showCityDropdown)}
                    className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-white"
                  >
                    <div className="text-left">
                      <p className="text-gray-600 font-medium">{selectedCity.name}</p>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-blue-600 transition-transform ${showCityDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showCityDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                      {mockCarData.cities.map((city) => (
                        <button
                          key={city.id}
                          onClick={() => {
                            setSelectedCity(city)
                            setShowCityDropdown(false)
                          }}
                          className="w-full text-left p-4 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg border-b border-gray-100 last:border-b-0"
                        >
                          <p className="font-medium text-gray-900">{city.name}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </PageSection>

        {/* Section 2: EMI Calculator */}
        <section id="emi-calculator" className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                {/* Kotak Logo and Bank Name */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-lg font-bold">K</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">kotak</h3>
                      <p className="text-gray-500 text-sm">Mahindra Bank</p>
                    </div>
                  </div>
                  
                  {/* EMI Amount Display */}
                  <div className="text-right">
                    <p className="text-gray-500 text-sm">Starting EMI</p>
                    <p className="text-2xl font-bold text-gray-900">₹12,700</p>
                    <p className="text-gray-500 text-sm">per month</p>
                  </div>
                </div>

                {/* Calculate EMI Button */}
                <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full transition-colors flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>Calculate EMI</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Model Highlights */}
        <section id="highlights" className="bg-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Renault Kwid Highlights</h2>
            
            {/* Category Tabs */}
            <div className="flex space-x-8 mb-6 border-b border-gray-200">
              <button className="pb-3 px-1 border-b-2 border-blue-600 text-blue-600 font-medium">
                Key & Features
              </button>
              <button className="pb-3 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                Space & Comfort
              </button>
              <button className="pb-3 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                Storage & Convenience
              </button>
            </div>

            {/* Horizontal Scrollable Grid */}
            <div className="overflow-x-auto">
              <div className="flex space-x-4 pb-4">
                {/* Feature Card 1 */}
                <div className="flex-shrink-0 w-64">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="aspect-square bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900">Advanced Safety Features</h3>
                  </div>
                </div>

                {/* Feature Card 2 */}
                <div className="flex-shrink-0 w-64">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="aspect-square bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900">Premium Interior</h3>
                  </div>
                </div>

                {/* Feature Card 3 */}
                <div className="flex-shrink-0 w-64">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="aspect-square bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900">Smart Technology</h3>
                  </div>
                </div>

                {/* Feature Card 4 */}
                <div className="flex-shrink-0 w-64">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="aspect-square bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900">Fuel Efficiency</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AD Banner Section */}
        <section className="bg-gray-300 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-600">AD Banner</h2>
          </div>
        </section>

        {/* Section 4: Model Price Details */}
        <section id="price-details" className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <h2 className="text-xl font-bold text-gray-900 mb-4">Renault Kwid Price</h2>
            
            {/* SEO Content */}
            <div className="mb-8">
              <p className="text-gray-700 text-sm leading-relaxed">
                Tata Nexon price for the base model starts at Rs. 8.00 Lakh and the top model price goes upto Rs. 15.60 Lakh (Avg. ex-showroom). Nexon price for 49 variants is listed below.
              </p>
            </div>

            {/* Variants Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Variants</h3>
              
              {/* Filter Options */}
              <div className="flex flex-wrap gap-4 mb-6">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  All
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Diesel
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg">
                  Petrol
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  CNG
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Automatic
                </button>
              </div>

              {/* Variant Cards */}
              <div className="space-y-4">
                {/* Variant Card 1 */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-red-600 text-lg">Smart (O) 1.2 Revotron</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>Petrol</span>
                        <span>Manual</span>
                        <span>86 Bhp</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Ex-Showroom</p>
                      <p className="text-lg font-bold text-gray-900">₹ 8.00 Lakhs</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Key Features:</p>
                    <p className="text-sm text-gray-600">Dual Airbags, ABS with EBD, Reverse Parking Sensors, Central Locking, Power Steering</p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Get On-Road Price
                    </button>
                    <button className="border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium">
                      Compare
                    </button>
                  </div>
                </div>

                {/* Variant Card 2 */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-red-600 text-lg">Smart Plus 1.2 Revotron</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>Petrol</span>
                        <span>Manual</span>
                        <span>86 Bhp</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Ex-Showroom</p>
                      <p className="text-lg font-bold text-gray-900">₹ 9.25 Lakhs</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Key Features:</p>
                    <p className="text-sm text-gray-600">All Smart features plus Touchscreen Infotainment, Steering Mounted Controls, Height Adjustable Driver Seat</p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Get On-Road Price
                    </button>
                    <button className="border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium">
                      Compare
                    </button>
                  </div>
                </div>

                {/* Variant Card 3 */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-red-600 text-lg">Smart (O) 1.2 Revotron</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>Petrol</span>
                        <span>Manual</span>
                        <span>86 Bhp</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Ex-Showroom</p>
                      <p className="text-lg font-bold text-gray-900">₹ 8.00 Lakhs</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Key Features:</p>
                    <p className="text-sm text-gray-600">Dual Airbags, ABS with EBD, Reverse Parking Sensors, Central Locking, Power Steering</p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Get On-Road Price
                    </button>
                    <button className="border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium">
                      Compare
                    </button>
                  </div>
                </div>

                {/* Variant Card 4 */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-red-600 text-lg">Smart Plus 1.2 Revotron</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>Petrol</span>
                        <span>Manual</span>
                        <span>86 Bhp</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Ex-Showroom</p>
                      <p className="text-lg font-bold text-gray-900">₹ 9.25 Lakhs</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Key Features:</p>
                    <p className="text-sm text-gray-600">All Smart features plus Touchscreen Infotainment, Steering Mounted Controls, Height Adjustable Driver Seat</p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Get On-Road Price
                    </button>
                    <button className="border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium">
                      Compare
                    </button>
                  </div>
                </div>
              </div>

              {/* Load More Button */}
              <div className="text-center mt-6">
                <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 font-medium">
                  View More Variants
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Color Options Section */}
        <ColorOptions 
          carName="Renault Kwid"
          colors={[
            {
              id: '1',
              name: 'Sun Corridor',
              hexCode: '#4A90E2',
              image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=400&fit=crop'
            },
            {
              id: '2', 
              name: 'Metallic Silver',
              hexCode: '#C0C0C0',
              image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=400&fit=crop'
            },
            {
              id: '3',
              name: 'Deep Black',
              hexCode: '#1C1C1C', 
              image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=400&fit=crop'
            },
            {
              id: '4',
              name: 'Racing Red',
              hexCode: '#DC143C',
              image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=400&fit=crop'
            },
            {
              id: '5',
              name: 'Ocean Blue',
              hexCode: '#1E90FF',
              image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=400&fit=crop'
            }
          ]}
        />

        {/* Pros and Cons Section */}
        <ProsAndCons 
          carName="Renault Kwid"
          data={{
            pros: [
              {
                id: '1',
                text: 'The safety is top notch with five-star BNCAP safety rating, six airbags as standard and ISOFIX anchors.',
                isVisible: true
              },
              {
                id: '2',
                text: 'The interior and exterior design is modern and features such as panoramic sunroof, JBL sound system and touchscreen infotainment.',
                isVisible: true
              },
              {
                id: '3',
                text: 'Excellent fuel efficiency with impressive mileage in both city and highway conditions.',
                isVisible: false
              },
              {
                id: '4',
                text: 'Spacious interior with comfortable seating for five passengers and ample boot space.',
                isVisible: false
              }
            ],
            cons: [
              {
                id: '1',
                text: 'The diesel engine can do with more refinement and the throttle response feels delayed up to 2,000 rpm.',
                isVisible: true
              },
              {
                id: '2',
                text: 'The CNG is limited to a manual transmission which may deter city drivers seeking easy shifting.',
                isVisible: true
              },
              {
                id: '3',
                text: 'Limited rear seat space may not be comfortable for tall passengers on long journeys.',
                isVisible: false
              },
              {
                id: '4',
                text: 'Build quality could be improved, especially for interior plastics and panel gaps.',
                isVisible: false
              }
            ]
          }}
        />

        {/* Model Summary Section */}
        <ModelSummarySection 
          carName="Renault Kwid"
          summaryData={{
            description: [
              "The Alto K10 Is A Hatchback That Belongs To The Entry-Level Hatchback Segment. It Is A More Powerful Version Of The Maruti Alto 800 And Was Launched In 2022.",
              "The Maruti Alto K10 comes with a simple front design. At the front, we have fish-eyed headlamps that are integrated with the bonnet. Below that, we have a big air dam and faux cutouts. On the side, we have a clean design with not many cuts and creases. At the rear, we squared tail lamps at the big bumper. Apart from that, it gets 13-inch steel wheels with full wheel covers, a roof antenna and body-coloured ORVMs."
            ],
            exteriorDesign: [
              "The Maruti Alto K10 comes with a simple front design. At the front, we have fish-eyed headlamps that are integrated with the bonnet. Below that, we have a big air dam and faux cutouts.",
              "On the side, we have a clean design with not many cuts and creases. At the rear, we squared tail lamps at the big bumper. Apart from that, it gets 13-inch steel wheels with full wheel covers, a roof antenna and body-coloured ORVMs."
            ],
            comfortConvenience: [
              "On the inside, the Alto K10 comes with an all-black interior design layout. We have a coloured dashboard with a center-placed infotainment system. This infotainment system is a 7-inch touchscreen infotainment that gets - wired Android Auto and Apple CarPlay. We also have power steer.",
              "Steering-mounted controls with voice control, gear shift indicator, manual air conditioning with power steer. The Alto K10 also gets a manual transmission and power steering for enhanced driving comfort."
            ]
          }}
        />

        {/* Engine Highlights Section */}
        <EngineHighlightsSection 
          carName="Renault Kwid"
          engines={[
            {
              id: 1,
              name: "1.2 Liter Turbo Petrol",
              displacement: "1.2L",
              power: "87 Bhp",
              torque: "113 Nm",
              transmission: "6-Speed",
              fuelType: "Petrol",
              description: "Suitable For Both City Driving And Highway Cruising. The 1.2 Litre Engine Of The Tata Altroz Offers Adequate Power For City And Highway Driving. The Engine Provides Smooth Acceleration Without Compromising On Fuel Efficiency",
              specifications: {
                manual: {
                  power: "87 Bhp",
                  torque: "113 Nm",
                  transmission: "6-Speed"
                },
                automatic: {
                  power: "87 Bhp",
                  torque: "113 Nm",
                  transmission: "6-Speed"
                },
                imt: {
                  power: "87 Bhp",
                  torque: "113 Nm",
                  transmission: "6-Speed"
                }
              }
            },
            {
              id: 2,
              name: "2.5 Liter Diesel",
              displacement: "2.5L",
              power: "87 Bhp",
              torque: "113 Nm",
              transmission: "6-Speed",
              fuelType: "Diesel",
              description: "Suitable For Both City Driving And Highway Cruising. The 1.2 Liter Engine Of The Tata Altroz Offers Adequate Power For City And Highway Driving. The Engine Provides Smooth Acceleration Without Compromising On Fuel Efficiency",
              specifications: {
                manual: {
                  power: "87 Bhp",
                  torque: "113 Nm",
                  transmission: "6-Speed"
                },
                imt: {
                  power: "87 Bhp",
                  torque: "113 Nm",
                  transmission: "6-Speed"
                }
              }
            },
            {
              id: 3,
              name: "1.5 Liter Diesel",
              displacement: "1.5L",
              power: "87 Bhp",
              torque: "113 Nm",
              transmission: "6-Speed",
              fuelType: "Diesel",
              description: "Suitable For Both City Driving And Highway Cruising. The 1.2 Liter Engine Of The Tata Altroz Offers Adequate Power For City And Highway Driving. The Engine Provides Smooth Acceleration Without Compromising On Fuel Efficiency",
              specifications: {
                imt: {
                  power: "87 Bhp",
                  torque: "113 Nm",
                  transmission: "6-Speed"
                }
              }
            }
          ]}
        />

        {/* Mileage Information Section */}
        <MileageInformation 
          carName="Renault Kwid"
          mileageData={[
            {
              id: '1',
              engineType: '1.5 Litre Turbo Petrol',
              transmission: 'DCT',
              companyClaimed: '56.2 Km/l',
              cityRealWorld: '56.2 Km/l',
              highwayRealWorld: '56.2 Km/l'
            },
            {
              id: '2',
              engineType: '1.2 Litre Petrol',
              transmission: 'Manual',
              companyClaimed: '22.5 Km/l',
              cityRealWorld: '18.3 Km/l',
              highwayRealWorld: '24.1 Km/l'
            },
            {
              id: '3',
              engineType: '1.0 Litre Turbo',
              transmission: 'AMT',
              companyClaimed: '25.8 Km/l',
              cityRealWorld: '21.2 Km/l',
              highwayRealWorld: '27.5 Km/l'
            }
          ]}
        />

        {/* AD Banner Section */}
        <section className="bg-gray-300 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-600">AD Banner</h2>
          </div>
        </section>

        {/* Similar Cars Section */}
        <SimilarCarsSection 
          carName="Renault Kwid"
          similarCars={[
            {
              id: '1',
              name: 'Maruti Suzuki Alto K10',
              brand: 'Maruti Suzuki',
              price: '3.99 Lakh',
              fuelType: 'Petrol',
              seating: '5 Seater',
              mileage: '24.39 kmpl',
              location: 'Delhi',
              image: ''
            },
            {
              id: '2',
              name: 'Renault Kwid',
              brand: 'Renault',
              price: '4.59 Lakh',
              fuelType: 'Petrol',
              seating: '5 Seater',
              mileage: '22.3 kmpl',
              location: 'Mumbai',
              image: ''
            },
            {
              id: '3',
              name: 'Tata Tiago',
              brand: 'Tata',
              price: '5.65 Lakh',
              fuelType: 'Petrol',
              seating: '5 Seater',
              mileage: '19.5 kmpl',
              location: 'Bangalore',
              image: ''
            },
            {
              id: '4',
              name: 'Hyundai Grand i10',
              brand: 'Hyundai',
              price: '5.92 Lakh',
              fuelType: 'Petrol',
              seating: '5 Seater',
              mileage: '20.7 kmpl',
              location: 'Chennai',
              image: ''
            }
          ]}
        />

        {/* Car Comparison Section */}
        <CarComparisonSection 
          comparisonCars={[
            {
              id: '1',
              name: 'Tucson',
              brand: 'Hyundai',
              price: '7.99 - 15.96 Lakhs',
              image: ''
            },
            {
              id: '2',
              name: 'Nexon',
              brand: 'Tata',
              price: '7.70 - 14.18 Lakhs',
              image: ''
            },
            {
              id: '3',
              name: 'Tucson',
              brand: 'Hyundai',
              price: '7.99 - 15.96 Lakhs',
              image: ''
            },
            {
              id: '4',
              name: 'Creta',
              brand: 'Hyundai',
              price: '10.87 - 18.73 Lakhs',
              image: ''
            },
            {
              id: '5',
              name: 'Seltos',
              brand: 'Kia',
              price: '10.90 - 18.45 Lakhs',
              image: ''
            }
          ]}
        />

        {/* Model News Section */}
        <ModelNewsSection 
          carName="Renault Kwid"
          newsArticles={[
            {
              id: '1',
              title: 'Maruti Suzuki Grand Vitara Hybrid Review: Best Fuel Economy in Segment',
              excerpt: 'We test drive the new Grand Vitara hybrid to see if it lives up to the fuel efficiency claims and overall performance expectations.',
              author: 'Rajesh Kumar',
              date: '15 Mar',
              readTime: '5 min read',
              views: '12,500',
              comments: '45',
              category: 'Review',
              image: ''
            },
            {
              id: '2',
              title: 'Upcoming Electric Cars in India 2024: Complete List',
              excerpt: 'From Tata to Mahindra, here are all the electric vehicles launching in India this year with expected prices and specifications.',
              author: 'Priya Sharma',
              date: '12 Mar',
              readTime: '8 min read',
              views: '8,200',
              comments: '23',
              category: 'News',
              image: ''
            },
            {
              id: '3',
              title: 'Best Budget Cars Under 10 Lakhs in 2024',
              excerpt: 'Detailed comparison of the most value-for-money cars available in India under 10 lakhs with features and specifications.',
              author: 'Amit Singh',
              date: '10 Mar',
              readTime: '6 min read',
              views: '15,800',
              comments: '67',
              category: 'Featured',
              image: ''
            }
          ]}
        />

        {/* YouTube Videos Section */}
        <YouTubeVideosSection 
          carName="Renault Kwid"
          videos={[
            {
              id: '1',
              title: 'Maruti Suzuki Grand Vitara Detailed Review | Hybrid vs Petrol | Which One...',
              channel: 'MotorOctane',
              views: '2.5M views',
              likes: '45K likes',
              duration: '12:45',
              uploadDate: '2 days ago',
              thumbnail: '',
              videoUrl: ''
            },
            {
              id: '2',
              title: 'Top 5 Cars Under 10 Lakhs in 2024',
              channel: 'MotorOctane',
              views: '1.2M views',
              likes: '28K likes',
              duration: '8:30',
              uploadDate: '1 week ago',
              thumbnail: '',
              videoUrl: ''
            },
            {
              id: '3',
              title: 'Electric vs Petrol Cars: Complete Cost Analysis',
              channel: 'MotorOctane',
              views: '890K views',
              likes: '19K likes',
              duration: '15:20',
              uploadDate: '3 days ago',
              thumbnail: '',
              videoUrl: ''
            },
            {
              id: '4',
              title: 'Hyundai Creta 2024 First Drive Review',
              channel: 'MotorOctane',
              views: '1.8M views',
              likes: '35K likes',
              duration: '10:15',
              uploadDate: '5 days ago',
              thumbnail: '',
              videoUrl: ''
            }
          ]}
        />

        {/* FAQ Section */}
        <FAQSection 
          carName="Renault Kwid"
          faqs={[
            {
              id: '1',
              question: 'What is the price range of Maruti cars?',
              answer: 'Maruti cars range from ₹3.5 lakhs for entry-level models like Alto to ₹15+ lakhs for premium models like Ciaz and XL6. The price varies based on variant, features, and location.'
            },
            {
              id: '2',
              question: 'Which Maruti car has the best mileage?',
              answer: 'The Maruti Alto K10 offers the best mileage with up to 24.39 kmpl, followed by the Wagon R and Swift which deliver around 23+ kmpl in real-world conditions.'
            },
            {
              id: '3',
              question: 'Are Maruti cars reliable?',
              answer: 'Yes, Maruti cars are known for their reliability, low maintenance costs, and excellent after-sales service network across India. They have proven track records for durability.'
            },
            {
              id: '4',
              question: 'Which Maruti car is best for families?',
              answer: 'For families, the Maruti Ertiga, XL6, and Swift Dzire are excellent choices offering spacious interiors, safety features, and comfortable seating for 5-7 passengers.'
            },
            {
              id: '5',
              question: 'Do Maruti cars have good resale value?',
              answer: 'Maruti cars typically retain 60-70% of their value after 3-4 years, making them one of the best choices for resale value in the Indian automotive market.'
            }
          ]}
        />

        {/* User Reviews Section */}
        <UserReviewsSection 
          carName="Maruti Suzuki Maruti Suzuki Alto K10"
          overallRating={4.2}
          totalReviews={1543}
          ratingBreakdown={{
            5: 856,
            4: 324,
            3: 189,
            2: 26,
            1: 13
          }}
          reviews={[
            {
              id: '1',
              userName: 'Rajesh Kumar',
              userAvatar: '',
              rating: 5,
              date: '15/01/2024',
              title: 'Excellent car with great mileage',
              content: 'I have been using this car for 6 months now. The mileage is excellent in city conditions. Build quality is good and maintenance cost is reasonable.',
              helpful: 24,
              notHelpful: 2,
              verified: true
            },
            {
              id: '2',
              userName: 'Priya Sharma',
              userAvatar: '',
              rating: 4,
              date: '10/01/2024',
              title: 'Good family car',
              content: 'Perfect for family use. Spacious interior and comfortable seats. Only issue is the road noise at high speeds.',
              helpful: 18,
              notHelpful: 1,
              verified: true
            }
          ]}
        />

        {/* AD Banner Section */}
        <section className="bg-gray-300 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-600">AD Banner</h2>
          </div>
        </section>

        {/* Upcoming Cars Section */}
        <UpcomingCarsSection 
          upcomingCars={[
            {
              id: '1',
              name: 'Maruti Suzuki Fronx',
              brand: 'Maruti Suzuki',
              expectedPrice: '7-12 Lakh',
              launchDate: 'March 2024',
              fuelType: 'Petrol/CNG',
              seating: 'SUV',
              image: '',
              status: 'Coming'
            },
            {
              id: '2',
              name: 'Hyundai Exter',
              brand: 'Hyundai',
              expectedPrice: '6-10 Lakh',
              launchDate: 'April 2024',
              fuelType: 'Petrol',
              seating: 'SUV',
              image: '',
              status: 'Expected'
            }
          ]}
        />

        {/* New Launches Section */}
        <NewLaunchesSection 
          newLaunches={[
            {
              id: '1',
              name: 'Maruti Suzuki Grand Vitara',
              brand: 'Maruti Suzuki',
              price: '10.99 Lakh',
              launchDate: 'Launched January 2024',
              fuelType: 'Petrol/Hybrid',
              seating: '5 Seater',
              image: '',
              isNew: true
            },
            {
              id: '2',
              name: 'Hyundai Tucson Facelift',
              brand: 'Hyundai',
              price: '29.99 Lakh',
              launchDate: 'Launched February 2024',
              fuelType: 'Petrol/Diesel',
              seating: '5 Seater',
              image: '',
              isNew: true
            }
          ]}
        />

        {/* Consultancy Ad Section */}
        <ConsultancyAdSection />

        {/* Feedback Section */}
        <FeedbackSection />
      </div>
      
      <Footer />
    </div>
  )
}

export default CarModelPage
