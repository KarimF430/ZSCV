'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CheckCircle, ChevronRight, ChevronUp, ChevronDown, MapPin, Calendar, Fuel, Settings, Users, Star, Phone, MessageCircle, Heart, Share2, ExternalLink, ArrowRight, Car, Shield, Zap, Smartphone, Wrench, Palette, Ruler, Gauge, Package } from 'lucide-react'
import Footer from '../Footer'
import PageSection from '../common/PageSection'
import SpecificationsContainer from './SpecificationsContainer'

interface VariantData {
  brand: string
  model: string
  variant: string
  fullName: string
  price: number
  originalPrice: number
  savings: number
  fuelType: string
  transmission: string
  seating: number
  mileage: number
  engine: string
  power: string
  torque: string
  rating: number
  reviewCount: number
  launchYear: number
  description: string
  images: string[]
  highlights: string[]
  cities: Array<{
    id: number
    name: string
  }>
}

interface VariantPageProps {
  brandName: string
  modelName: string
  variantName: string
}

// Mock variant data
const mockVariantData = {
  brand: "Renault",
  model: "Kwid",
  variant: "LXI",
  fullName: "Renault Kwid LXI",
  price: 8.00,
  originalPrice: 9.50,
  savings: 1.50,
  fuelType: "Petrol",
  transmission: "Manual",
  seating: 5,
  mileage: 22.3,
  engine: "1.0L",
  power: "68 PS",
  torque: "91 Nm",
  launchYear: 2015,
  rating: 4.2,
  reviewCount: 1234,
  description: "The Renault Kwid is a compact hatchback that offers excellent fuel efficiency, modern features, and a spacious interior. Perfect for city driving with its compact dimensions and easy maneuverability.",
  images: [
    "/api/placeholder/800/600",
    "/api/placeholder/800/600", 
    "/api/placeholder/800/600",
    "/api/placeholder/800/600"
  ],
  highlights: [
    'Best-in-class fuel efficiency',
    'Spacious cabin design',
    'Advanced safety features',
    'Modern infotainment system'
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
  { id: 'highlights', label: 'Key & Features' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'variants', label: 'Variants' },
  { id: 'offers', label: 'Offers' },
  { id: 'expert-review', label: 'Expert Review' }
]

export default function VariantPage({ 
  variantData = mockVariantData,
  brandName,
  modelName,
  variantName
}: { 
  variantData?: VariantData,
  brandName?: string,
  modelName?: string,
  variantName?: string
}) {
  const router = useRouter()
  const [expandedSpecs, setExpandedSpecs] = useState<Record<string, boolean>>({})
  const [activeSection, setActiveSection] = useState('')
  const [isSticky, setIsSticky] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [isLiked, setIsLiked] = useState(false)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(variantData.variant)
  const [selectedCity, setSelectedCity] = useState('Delhi')
  const [showVariantDropdown, setShowVariantDropdown] = useState(false)
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Backend data fetching states
  const [variant, setVariant] = useState<any>(null)
  const [model, setModel] = useState<any>(null)
  const [brand, setBrand] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [initialLoad, setInitialLoad] = useState(true)
  
  const variantDropdownRef = useRef<HTMLDivElement>(null)
  const cityDropdownRef = useRef<HTMLDivElement>(null)

  // Optimized data fetching - fetch only what we need
  useEffect(() => {
    const fetchData = async () => {
      if (!brandName || !modelName || !variantName) {
        setLoading(false)
        return
      }
      
      try {
        setLoading(true)
        setError(null)
        
        // First, find the brand to get brandId
        const brandsResponse = await fetch(`http://localhost:5001/api/brands`)
        if (!brandsResponse.ok) throw new Error('Failed to fetch brands')
        const brands = await brandsResponse.json()
        
        const foundBrand = brands.find((b: any) => 
          b.name.toLowerCase().replace(/\s+/g, '-') === brandName.toLowerCase()
        )
        
        if (!foundBrand) {
          setError('Brand not found')
          return
        }
        
        // Then fetch models for this brand only
        const modelsResponse = await fetch(`http://localhost:5001/api/models?brandId=${foundBrand.id}`)
        if (!modelsResponse.ok) throw new Error('Failed to fetch models')
        const models = await modelsResponse.json()
        
        const foundModel = models.find((m: any) => 
          m.name.toLowerCase().replace(/\s+/g, '-') === modelName.toLowerCase()
        )
        
        if (!foundModel) {
          setError('Model not found')
          return
        }
        
        // Finally fetch variants for this model only
        const variantsResponse = await fetch(`http://localhost:5001/api/variants?modelId=${foundModel.id}`)
        if (!variantsResponse.ok) throw new Error('Failed to fetch variants')
        const variants = await variantsResponse.json()
        
        // Find variant with flexible matching
        let foundVariant = variants.find((v: any) => 
          v.name.toLowerCase().replace(/\s+/g, '-') === variantName.toLowerCase()
        )
        
        if (!foundVariant) {
          foundVariant = variants.find((v: any) => 
            v.name.toLowerCase().includes(variantName.toLowerCase()) ||
            variantName.toLowerCase().includes(v.name.toLowerCase().split(' ')[0])
          )
        }
        
        if (!foundVariant && variants.length > 0) {
          foundVariant = variants[0] // Use first variant as fallback
        }

        setBrand(foundBrand)
        setModel(foundModel)
        setVariant(foundVariant)
        
        if (!foundVariant) {
          setError('Variant not found')
        } else {
          console.log('VariantPage: Successfully found variant:', foundVariant.name)
          console.log('VariantPage: Variant highlightImages:', foundVariant.highlightImages)
          console.log('VariantPage: Variant highlightImages count:', foundVariant.highlightImages?.length || 0)
          console.log('VariantPage: Comfort & Convenience specs:', {
            ventilatedSeats: foundVariant.ventilatedSeats,
            sunroof: foundVariant.sunroof,
            airPurifier: foundVariant.airPurifier,
            cruiseControl: foundVariant.cruiseControl,
            rainSensingWipers: foundVariant.rainSensingWipers
          })
          console.log('VariantPage: Safety specs:', {
            globalNCAPRating: foundVariant.globalNCAPRating,
            airbags: foundVariant.airbags,
            airbagsLocation: foundVariant.airbagsLocation,
            adasLevel: foundVariant.adasLevel,
            reverseCamera: foundVariant.reverseCamera
          })
          console.log('VariantPage: Entertainment & Connectivity specs:', {
            touchScreenInfotainment: foundVariant.touchScreenInfotainment,
            androidAppleCarplay: foundVariant.androidAppleCarplay,
            speakers: foundVariant.speakers,
            wirelessCharging: foundVariant.wirelessCharging
          })
          console.log('VariantPage: Engine & Transmission specs:', {
            engineName: foundVariant.engineName,
            engineCapacity: foundVariant.engineCapacity,
            fuel: foundVariant.fuel,
            transmission: foundVariant.transmission,
            maxPower: foundVariant.maxPower
          })
          console.log('VariantPage: Seating Comfort specs:', {
            seatUpholstery: foundVariant.seatUpholstery,
            seatsAdjustment: foundVariant.seatsAdjustment,
            driverSeatAdjustment: foundVariant.driverSeatAdjustment
          })
          console.log('VariantPage: Exteriors specs:', {
            headLights: foundVariant.headLights,
            tailLight: foundVariant.tailLight,
            frontFogLights: foundVariant.frontFogLights,
            roofRails: foundVariant.roofRails
          })
          console.log('VariantPage: Dimensions specs:', {
            groundClearance: foundVariant.groundClearance,
            length: foundVariant.length,
            width: foundVariant.width,
            height: foundVariant.height,
            wheelbase: foundVariant.wheelbase
          })
          console.log('VariantPage: Tyre & Suspension specs:', {
            frontTyreProfile: foundVariant.frontTyreProfile,
            rearTyreProfile: foundVariant.rearTyreProfile,
            spareTyreProfile: foundVariant.spareTyreProfile,
            frontSuspension: foundVariant.frontSuspension,
            rearSuspension: foundVariant.rearSuspension
          })
          console.log('VariantPage: Storage specs:', {
            cupholders: foundVariant.cupholders,
            fuelTankCapacity: foundVariant.fuelTankCapacity,
            bootSpace: foundVariant.bootSpace,
            bootSpaceAfterFoldingRearRowSeats: foundVariant.bootSpaceAfterFoldingRearRowSeats
          })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to load variant data')
      } finally {
        setLoading(false)
        setInitialLoad(false)
      }
    }

    fetchData()
  }, [brandName, modelName, variantName])

  // Extract brand, model, variant names from data (fallback to props or backend data)
  const displayBrandName = brand?.name || brandName || variantData.brand
  const displayModelName = model?.name || modelName || variantData.model
  const displayVariantName = variant?.name || variantName || variantData.variant

  // Helper function to parse bullet points from backend string
  const parseBulletPoints = (text: string | string[]): string[] => {
    if (Array.isArray(text)) return text
    if (!text) return []
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => line.replace(/^[•\-\*]\s*/, ''))
  }

  // Create dynamic variant data from backend
  const dynamicVariantData = variant ? {
    brand: displayBrandName,
    model: displayModelName,
    variant: displayVariantName,
    fullName: `${displayBrandName} ${displayModelName} ${displayVariantName}`,
    price: variant.price ? (variant.price / 100000) : variantData.price,
    originalPrice: variant.price ? (variant.price / 100000) : variantData.originalPrice,
    savings: 0,
    fuelType: (variant as any).fuel || variant.fuelType || variantData.fuelType,
    transmission: (variant as any).transmission || variantData.transmission,
    seating: 5, // Default or from specifications
    mileage: parseFloat((variant as any).mileageCompanyClaimed || '0') || variantData.mileage,
    engine: variant.engineName || (variant as any).engineCapacity || variantData.engine,
    power: (variant as any).maxPower || variant.enginePower || variantData.power,
    torque: (variant as any).torque || variant.engineTorque || variantData.torque,
    rating: 4.2, // Default or from reviews
    reviewCount: 1234, // Default or from reviews
    launchYear: 2024, // Default or from model data
    description: variant.headerSummary || variant.description || variant.keyFeatures || variantData.description,
    images: variant.highlightImages?.map((img: any) => `http://localhost:5001${img.url}`) || 
            model?.galleryImages?.map((img: any) => `http://localhost:5001${img.url}`) || 
            variantData.images,
    highlights: parseBulletPoints(variant.keyFeatures || variant.headerSummary || ''),
    cities: variantData.cities
  } : variantData

  // Use dynamic data if available, otherwise fallback to mock data
  // Don't show mock data during initial loading to avoid flash
  const currentVariantData = loading && !variant ? {
    ...variantData,
    fullName: `${displayBrandName || brandName || 'Loading'} ${displayModelName || modelName || 'Loading'} ${displayVariantName || variantName || 'Loading'}`,
    description: 'Loading variant details...',
    price: 0,
    rating: 4.2,
    reviewCount: 1234,
    fuelType: 'Loading...',
    transmission: 'Loading...',
    power: 'Loading...',
    torque: 'Loading...',
    engine: 'Loading...',
    mileage: 0
  } : (variant ? dynamicVariantData : variantData)

  // Mock variants data for the more variants section
  const mockVariants = [
    {
      id: 1,
      name: "Smart (O) 1.2 Revotron",
      fuel: "Petrol",
      transmission: "Manual",
      power: "86 Bhp",
      price: 8.00,
      features: "Dual Airbags, ABS with EBD, Reverse Parking Sensors, Central Locking, Power Steering"
    },
    {
      id: 2,
      name: "Smart Plus 1.2 Revotron",
      fuel: "Petrol",
      transmission: "Manual",
      power: "86 Bhp",
      price: 9.25,
      features: "All Smart features plus Touchscreen Infotainment, Steering Mounted Controls, Height Adjustable Driver Seat"
    },
    {
      id: 3,
      name: "Smart (O) 1.2 Revotron",
      fuel: "Petrol",
      transmission: "Manual",
      power: "86 Bhp",
      price: 8.00,
      features: "Dual Airbags, ABS with EBD, Reverse Parking Sensors, Central Locking, Power Steering"
    },
    {
      id: 4,
      name: "Smart Plus 1.2 Revotron",
      fuel: "Petrol",
      transmission: "Manual",
      power: "86 Bhp",
      price: 9.25,
      features: "All Smart features plus Touchscreen Infotainment, Steering Mounted Controls, Height Adjustable Driver Seat"
    }
  ]

  // Handle variant click function
  const handleVariantClick = (variant: any) => {
    if (!displayBrandName || !displayModelName || !variant?.name) return
    
    const slug = `${displayBrandName.toLowerCase().replace(/\s+/g, '-')}-${displayModelName.toLowerCase().replace(/\s+/g, '-')}-${variant.name.toLowerCase().replace(/\s+/g, '-')}`
    console.log('Navigating to variant page:', `/variants/${slug}`)
    router.push(`/variants/${slug}`)
  }

  // Available variants for the dropdown
  const availableVariants = [
    { id: 1, name: "RXE", price: 464000 },
    { id: 2, name: "RXL", price: 520000 },
    { id: 3, name: "RXT", price: 580000 },
    { id: 4, name: "RXT AMT", price: 645000 }
  ]

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

  // Toggle specification section
  const toggleSpecSection = (sectionKey: string) => {
    setExpandedSpecs(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }))
  }

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80 // Account for navigation ribbon
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  // Fast loading state - show skeleton instead of blank page
  const showSkeleton = loading || initialLoad

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => router.back()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navigation Ribbon */}
      <div className="variant-nav-ribbon bg-white border-b sticky top-0 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {navigationSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="py-3 px-4 font-medium text-sm whitespace-nowrap text-gray-500 hover:text-gray-700 transition-colors"
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div>
        {/* Section 1: Overview - Variant Specific */}
        <PageSection background="white" maxWidth="7xl">
          <div id="overview" className="space-y-6">
            {/* Hero Car Image with Gallery */}
            <div className="relative">
              <div className="aspect-[16/10] bg-gray-100 rounded-2xl overflow-hidden relative">
                {showSkeleton ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="text-gray-400">Loading image...</div>
                  </div>
                ) : (
                  <img
                    src={currentImageIndex === 0 && model?.heroImage ? `http://localhost:5001${model.heroImage}` :
                         model?.galleryImages?.[currentImageIndex === 0 ? 0 : currentImageIndex - 1]?.url ? `http://localhost:5001${model.galleryImages[currentImageIndex === 0 ? 0 : currentImageIndex - 1].url}` : 
                         'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=500&fit=crop&auto=format'}
                    alt={`${displayBrandName || 'Car'} ${displayModelName || 'Model'}`}
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Gallery Navigation - Single Right Arrow */}
                {!showSkeleton && ((model?.heroImage && model?.galleryImages && model.galleryImages.length > 0) || (model?.galleryImages && model.galleryImages.length > 1)) && (
                  <button 
                    onClick={() => {
                      const totalImages = (model?.heroImage ? 1 : 0) + (model?.galleryImages?.length || 0);
                      setCurrentImageIndex((prev: number) => prev === totalImages - 1 ? 0 : prev + 1);
                    }}
                    className="absolute bottom-4 right-4 bg-white rounded-full p-3 hover:bg-gray-50 transition-colors shadow-lg"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Car Title and Actions */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {showSkeleton ? (
                    <div className="bg-gray-200 animate-pulse h-9 w-96 rounded"></div>
                  ) : (
                    currentVariantData.fullName
                  )}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center space-x-4 mb-4">
                  {showSkeleton ? (
                    <div className="bg-gray-200 animate-pulse h-8 w-24 rounded"></div>
                  ) : (
                    <div className="flex items-center bg-gradient-to-r from-red-600 to-orange-500 text-white px-3 py-1 rounded">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      <span className="font-semibold">{currentVariantData.rating || 4.2}</span>
                      <span className="ml-1">({currentVariantData.reviewCount || 1234})</span>
                    </div>
                  )}
                  <button className="text-red-600 hover:text-orange-600 font-medium">
                    Rate & Review
                  </button>
                </div>
              </div>
              
              {/* Share and Heart Icons */}
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 transition-colors ${
                    isLiked ? 'text-red-600' : 'text-gray-400 hover:text-red-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="text-gray-700 leading-relaxed">
              <p>
                {showSkeleton ? (
                  <div className="space-y-2">
                    <div className="bg-gray-200 animate-pulse h-4 w-full rounded"></div>
                    <div className="bg-gray-200 animate-pulse h-4 w-3/4 rounded"></div>
                  </div>
                ) : (
                  showFullDescription ? currentVariantData.description : 
                   (currentVariantData.description?.length > 150 ? 
                    `${currentVariantData.description.substring(0, 150)}...` : 
                    currentVariantData.description)
                )}
                {!showSkeleton && !showFullDescription && currentVariantData.description?.length > 150 && (
                  <button
                    onClick={() => setShowFullDescription(true)}
                    className="text-red-600 hover:text-orange-600 font-medium ml-1"
                  >
                    ...more
                  </button>
                )}
                {!showSkeleton && showFullDescription && currentVariantData.description?.length > 150 && (
                  <button
                    onClick={() => setShowFullDescription(false)}
                    className="text-red-600 hover:text-orange-600 font-medium ml-2"
                  >
                    Show less
                  </button>
                )}
              </p>
            </div>

            {/* Single Price Display for Variant */}
            <div className="space-y-4">
              <div className="text-3xl font-bold text-green-600">
                {showSkeleton ? (
                  <div className="bg-gray-200 animate-pulse h-9 w-32 rounded"></div>
                ) : (
                  `₹${(currentVariantData.price || 0).toFixed(2)} Lakh`
                )}
              </div>
              <div className="text-sm text-gray-500">*Ex-showroom</div>
              
              <button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Get On-Road Price
              </button>
            </div>

            {/* Variant and City Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Variant Dropdown */}
              <div className="relative" ref={variantDropdownRef}>
                <button
                  onClick={() => setShowVariantDropdown(!showVariantDropdown)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-gray-400 transition-colors"
                >
                  <span className="text-gray-700">
                    {selectedVariant || 'Choose Variant'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showVariantDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showVariantDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {availableVariants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => {
                          setSelectedVariant(variant.name)
                          setShowVariantDropdown(false)
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-gray-900">{variant.name}</span>
                          <span className="text-gray-600">₹{(variant.price / 100000).toFixed(2)} L</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* City Dropdown */}
              <div className="relative" ref={cityDropdownRef}>
                <button
                  onClick={() => setShowCityDropdown(!showCityDropdown)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-gray-400 transition-colors"
                >
                  <span className="text-gray-700">
                    {selectedCity || 'Delhi'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showCityDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showCityDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {mockVariantData.cities.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => {
                          setSelectedCity(city.name)
                          setShowCityDropdown(false)
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        <span className="text-gray-900">{city.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* EMI Calculator Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-lg font-bold">K</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">kotak</h3>
                    <p className="text-gray-500 text-sm">Mahindra Bank</p>
                  </div>
                </div>
                
                {/* EMI Amount Display */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">₹12,700</p>
                  <p className="text-gray-500 text-sm">per month</p>
                </div>
              </div>

              {/* Calculate EMI Button */}
              <button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-full transition-colors flex items-center justify-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Calculate EMI</span>
              </button>
            </div>
          </div>
        </PageSection>

        {/* Section 2: AD Banner + Variant Highlights */}
        <PageSection background="white" maxWidth="7xl">
          <div id="highlights" className="space-y-8">
            {/* AD Banner */}
            <div className="bg-gray-300 rounded-lg py-20 text-center">
              <h2 className="text-3xl font-bold text-gray-600">AD Banner</h2>
            </div>

            {/* Key Features */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Key Features</h2>
              
              {/* Highlights Grid - Horizontal Scroll */}
              <div className="relative">
                <div className="highlights-scroll-container flex gap-4 overflow-x-auto scrollbar-hide pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {/* Dynamic Highlight Cards from Variant Backend */}
                  {showSkeleton ? (
                    /* Skeleton loading cards */
                    <>
                      {[1, 2, 3].map((index) => (
                        <div key={index} className="flex-shrink-0 w-64">
                          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div className="aspect-[4/3] bg-gray-200 animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (() => {
                    const variantHighlights = variant?.highlightImages || [];
                    
                    return variantHighlights.length > 0 ? (
                      variantHighlights.map((highlight: any, index: number) => (
                        <div key={index} className="flex-shrink-0 w-64">
                          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div className="aspect-[4/3] bg-gray-200 relative">
                              <img
                                src={`http://localhost:5001${highlight.url}`}
                                alt={highlight.caption || `${displayBrandName} ${displayModelName} Feature ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Fallback to placeholder if image fails to load
                                  e.currentTarget.src = `https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&crop=center`
                                }}
                              />
                              {/* Image Caption Overlay - Backend Caption */}
                              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2">
                                <p className="text-sm font-medium text-center">
                                  {highlight.caption || `${displayBrandName} ${displayModelName} Feature ${index + 1}`}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                    /* Fallback cards if no backend data */
                    <>
                      {/* Highlight Card 1 */}
                      <div className="flex-shrink-0 w-64">
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <div className="aspect-[4/3] bg-gray-200 relative">
                            <img
                              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&crop=center"
                              alt="Advanced Safety Features"
                              className="w-full h-full object-cover"
                            />
                            {/* Image Caption Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2">
                              <p className="text-sm font-medium text-center">Advanced Safety Features</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Highlight Card 2 */}
                      <div className="flex-shrink-0 w-64">
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <div className="aspect-[4/3] bg-gray-200 relative">
                            <img
                              src="https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop&crop=center"
                              alt="Premium Interior"
                              className="w-full h-full object-cover"
                            />
                            {/* Image Caption Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2">
                              <p className="text-sm font-medium text-center">Premium Interior</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Highlight Card 3 */}
                      <div className="flex-shrink-0 w-64">
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <div className="aspect-[4/3] bg-gray-200 relative">
                            <img
                              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop&crop=center"
                              alt="Fuel Efficiency"
                              className="w-full h-full object-cover"
                            />
                            {/* Image Caption Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2">
                              <p className="text-sm font-medium text-center">Fuel Efficiency</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </PageSection>

        {/* Section 3: SEO Text + Specifications */}
        <PageSection background="white" maxWidth="7xl">
          <div id="specifications" className="space-y-8">
            {/* SEO Text Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">{brandName} {modelName} Info</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>
                  Tata Nexon price for the base model starts at Rs. 8.00 Lakh and the top model price goes upto Rs. 15.60 Lakh (Avg. ex-showroom). Nexon price for 49 variants is listed below.
                </p>
              </div>
            </div>

            {/* Specifications Section */}
            <SpecificationsContainer
              variant={variant}
              showSkeleton={showSkeleton}
              brandName={brandName}
              modelName={modelName}
              variantName={variantName}
            />
          </div>
        </PageSection>

        {/* Section 4: AD Banner + More Variants */}
        <PageSection background="white" maxWidth="7xl">
          <div className="space-y-8">
            {/* AD Banner */}
            <div className="bg-gray-300 rounded-lg py-20 text-center">
              <h2 className="text-3xl font-bold text-gray-600">AD Banner</h2>
            </div>

            {/* More Variants Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">More {brandName} {modelName} Variants</h2>
                          {variant?.sunroof && (
                            <div className="flex justify-between items-center py-3">
                              <span className="text-gray-500">Sunroof</span>
                              <span className="text-gray-900 font-medium">{variant.sunroof}</span>
                            </div>
                          )}
                        </>
                      )}
                      
                      {/* Expandable content */}
                      {expandedSpecs['comfort'] && !showSkeleton && (
                        <>
                          {variant?.airPurifier && (
                            <div className="flex justify-between items-center py-3">
                              <span className="text-gray-500">Air Purifier</span>
                              <span className="text-gray-900 font-medium">{variant.airPurifier}</span>
                            </div>
                          )}
                        
                        {/* Heads Up Display (HUD) - Only show if data exists */}
                        {variant?.headsUpDisplay && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Heads Up Display (HUD)</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.headsUpDisplay}</span>
                          </div>
                        )}
                        
                        {/* Cruise Control - Only show if data exists */}
                        {variant?.cruiseControl && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Cruise Control</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.cruiseControl}</span>
                          </div>
                        )}
                        
                        {/* Rain Sensing Wipers - Only show if data exists */}
                        {variant?.rainSensingWipers && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Rain Sensing Wipers</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.rainSensingWipers}</span>
                          </div>
                        )}
                        
                        {/* Automatic Headlamp - Only show if data exists */}
                        {variant?.automaticHeadlamp && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Automatic Headlamp</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.automaticHeadlamp}</span>
                          </div>
                        )}
                        
                        {/* Follow Me Home Headlights - Only show if data exists */}
                        {variant?.followMeHomeHeadlights && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Follow Me Home Headlights</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.followMeHomeHeadlights}</span>
                          </div>
                        )}
                        
                        {/* Keyless Entry - Only show if data exists */}
                        {variant?.keylessEntry && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Keyless Entry</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.keylessEntry}</span>
                          </div>
                        )}
                        
                        {/* Ignition - Only show if data exists */}
                        {variant?.ignition && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Ignition</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.ignition}</span>
                          </div>
                        )}
                        
                        {/* Ambient Lighting - Only show if data exists */}
                        {variant?.ambientLighting && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Ambient Lighting</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.ambientLighting}</span>
                          </div>
                        )}
                        
                        {/* Steering Adjustment - Only show if data exists */}
                        {variant?.steeringAdjustment && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Steering Adjustment</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.steeringAdjustment}</span>
                          </div>
                        )}
                        
                        {/* Air Conditioning - Only show if data exists */}
                        {variant?.airConditioning && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Air Conditioning</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.airConditioning}</span>
                          </div>
                        )}
                        
                        {/* Climate Zones - Only show if data exists */}
                        {variant?.climateZones && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Climate Zones</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.climateZones}</span>
                          </div>
                        )}
                        
                        {/* Rear A/C Vents - Only show if data exists */}
                        {variant?.rearACVents && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Rear A/C Vents</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.rearACVents}</span>
                          </div>
                        )}
                        
                        {/* Front Armrest - Only show if data exists */}
                        {variant?.frontArmrest && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Front Armrest</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.frontArmrest}</span>
                          </div>
                        )}
                        
                        {/* Rear Armrest - Only show if data exists */}
                        {variant?.rearArmrest && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Rear Armrest</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.rearArmrest}</span>
                          </div>
                        )}
                        
                        {/* Inside Rear View Mirror - Only show if data exists */}
                        {variant?.insideRearViewMirror && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Inside Rear View Mirror</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.insideRearViewMirror}</span>
                          </div>
                        )}
                        
                        {/* Outside Rear View Mirrors - Only show if data exists */}
                        {variant?.outsideRearViewMirrors && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Outside Rear View Mirrors</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.outsideRearViewMirrors}</span>
                          </div>
                        )}
                        
                        {/* Steering Mounted Controls - Only show if data exists */}
                        {variant?.steeringMountedControls && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Steering Mounted Controls</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.steeringMountedControls}</span>
                          </div>
                        )}
                        
                        {/* Rear Windshield Defogger - Only show if data exists */}
                        {variant?.rearWindshieldDefogger && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Rear Windshield Defogger</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.rearWindshieldDefogger}</span>
                          </div>
                        )}
                        
                        {/* Front Windshield Defogger - Only show if data exists */}
                        {variant?.frontWindshieldDefogger && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Front Windshield Defogger</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.frontWindshieldDefogger}</span>
                          </div>
                        )}
                        
                        {/* Cooled Glovebox - Only show if data exists */}
                        {variant?.cooledGlovebox && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Cooled Glovebox</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.cooledGlovebox}</span>
                          </div>
                        )}
                      </>
                    )}
                    
                    <div className="pt-3 border-t border-gray-100">
                      <button 
                        onClick={() => toggleSpecSection('comfort')}
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 group"
                      >
                        <span>{expandedSpecs['comfort'] ? 'View Less' : 'View More'}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedSpecs['comfort'] ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Safety */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">SAFETY</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {/* Dynamic Safety Specifications from Backend - Only show fields with data */}
                    {showSkeleton ? (
                      /* Skeleton loading */
                      <>
                        {[1, 2, 3, 4, 5].map((index) => (
                          <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                            <div className="bg-gray-200 animate-pulse h-4 w-1/3 rounded"></div>
                            <div className="bg-gray-200 animate-pulse h-4 w-1/4 rounded"></div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {/* Global NCAP Rating - Only show if data exists */}
                        {variant?.globalNCAPRating && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Global NCAP Rating</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.globalNCAPRating}</span>
                          </div>
                        )}
                        
                        {/* Airbags - Only show if data exists */}
                        {variant?.airbags && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Airbags</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.airbags}</span>
                          </div>
                        )}
                        
                        {/* Airbags Location - Only show if data exists */}
                        {variant?.airbagsLocation && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Airbags Location</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.airbagsLocation}</span>
                          </div>
                        )}
                        
                        {/* ADAS Level - Only show if data exists */}
                        {variant?.adasLevel && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">ADAS Level</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.adasLevel}</span>
                          </div>
                        )}
                        
                        {/* ADAS Features - Only show if data exists */}
                        {variant?.adasFeatures && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">ADAS Features</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.adasFeatures}</span>
                          </div>
                        )}
                        
                        {/* Reverse Camera - Only show if data exists */}
                        {variant?.reverseCamera && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Reverse Camera</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.reverseCamera}</span>
                          </div>
                        )}
                        
                        {/* Reverse Camera Guidelines - Only show if data exists */}
                        {variant?.reverseCameraGuidelines && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Reverse Camera Guidelines</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.reverseCameraGuidelines}</span>
                          </div>
                        )}
                        
                        {/* Tyre Pressure Monitor (TPMS) - Only show if data exists */}
                        {variant?.tyrePressureMonitor && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Tyre Pressure Monitor (TPMS)</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.tyrePressureMonitor}</span>
                          </div>
                        )}
                        
                        {/* Hill Hold Assist - Only show if data exists */}
                        {variant?.hillHoldAssist && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Hill Hold Assist</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.hillHoldAssist}</span>
                          </div>
                        )}
                        
                        {/* Hill Descent Control - Only show if data exists */}
                        {variant?.hillDescentControl && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Hill Descent Control</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.hillDescentControl}</span>
                          </div>
                        )}
                        
                        {/* Roll Over Mitigation - Only show if data exists */}
                        {variant?.rollOverMitigation && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Roll Over Mitigation</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.rollOverMitigation}</span>
                          </div>
                        )}
                        
                        {/* Parking Sensor - Only show if data exists */}
                        {variant?.parkingSensor && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Parking Sensor</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.parkingSensor}</span>
                          </div>
                        )}
                        
                        {/* Disc Brakes - Only show if data exists */}
                        {variant?.discBrakes && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Disc Brakes</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.discBrakes}</span>
                          </div>
                        )}
                        
                        {/* Electronic Stability Program - Only show if data exists */}
                        {variant?.electronicStabilityProgram && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Electronic Stability Program</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.electronicStabilityProgram}</span>
                          </div>
                        )}
                        
                        {/* ABS - Only show if data exists */}
                        {variant?.abs && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">ABS</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.abs}</span>
                          </div>
                        )}
                        
                        {/* EBD - Only show if data exists */}
                        {variant?.ebd && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">EBD</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.ebd}</span>
                          </div>
                        )}
                        
                        {/* Brake Assist (BA) - Only show if data exists */}
                        {variant?.brakeAssist && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Brake Assist (BA)</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.brakeAssist}</span>
                          </div>
                        )}
                        
                        {/* ISOFIX Mounts - Only show if data exists */}
                        {variant?.isofixMounts && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">ISOFIX Mounts</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.isofixMounts}</span>
                          </div>
                        )}
                        
                        {/* Seatbelt Warning - Only show if data exists */}
                        {variant?.seatbeltWarning && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Seatbelt Warning</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.seatbeltWarning}</span>
                          </div>
                        )}
                        
                        {/* Speed Alert System - Only show if data exists */}
                        {variant?.speedAlertSystem && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Speed Alert System</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.speedAlertSystem}</span>
                          </div>
                        )}
                        
                        {/* Speed Sensing Door Locks - Only show if data exists */}
                        {variant?.speedSensingDoorLocks && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Speed Sensing Door Locks</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.speedSensingDoorLocks}</span>
                          </div>
                        )}
                        
                        {/* Immobiliser - Only show if data exists */}
                        {variant?.immobiliser && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Immobiliser</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.immobiliser}</span>
                          </div>
                        )}
                      </>
                    )}
                    
                    <div className="pt-3 border-t border-gray-100">
                      <button 
                        onClick={() => toggleSpecSection('safety')}
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 group"
                      >
                        <span>{expandedSpecs['safety'] ? 'View Less' : 'View More'}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedSpecs['safety'] ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Entertainment & Connectivity */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">ENTERTAINMENT & CONNECTIVITY</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {/* Dynamic Entertainment & Connectivity Specifications from Backend - Only show fields with data */}
                    {showSkeleton ? (
                      /* Skeleton loading */
                      <>
                        {[1, 2, 3, 4, 5].map((index) => (
                          <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                            <div className="bg-gray-200 animate-pulse h-4 w-1/3 rounded"></div>
                            <div className="bg-gray-200 animate-pulse h-4 w-1/4 rounded"></div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {/* Touch Screen Infotainment - Only show if data exists */}
                        {variant?.touchScreenInfotainment && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Touch Screen Infotainment</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.touchScreenInfotainment}</span>
                          </div>
                        )}
                        
                        {/* Android & Apple CarPlay - Only show if data exists */}
                        {variant?.androidAppleCarplay && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Android & Apple CarPlay</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.androidAppleCarplay}</span>
                          </div>
                        )}
                        
                        {/* Speakers - Only show if data exists */}
                        {variant?.speakers && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Speakers</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.speakers}</span>
                          </div>
                        )}
                        
                        {/* Tweeters - Only show if data exists */}
                        {variant?.tweeters && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Tweeters</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.tweeters}</span>
                          </div>
                        )}
                        
                        {/* Subwoofers - Only show if data exists */}
                        {variant?.subwoofers && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Subwoofers</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.subwoofers}</span>
                          </div>
                        )}
                        
                        {/* USB-C Charging Ports - Only show if data exists */}
                        {variant?.usbCChargingPorts && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">USB-C Charging Ports</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.usbCChargingPorts}</span>
                          </div>
                        )}
                        
                        {/* USB-A Charging Ports - Only show if data exists */}
                        {variant?.usbAChargingPorts && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">USB-A Charging Ports</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.usbAChargingPorts}</span>
                          </div>
                        )}
                        
                        {/* 12V Charging Ports - Only show if data exists */}
                        {variant?.twelvevChargingPorts && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">12V Charging Ports</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.twelvevChargingPorts}</span>
                          </div>
                        )}
                        
                        {/* Wireless Charging - Only show if data exists */}
                        {variant?.wirelessCharging && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Wireless Charging</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.wirelessCharging}</span>
                          </div>
                        )}
                        
                        {/* Connected Car Tech - Only show if data exists */}
                        {variant?.connectedCarTech && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Connected Car Tech</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.connectedCarTech}</span>
                          </div>
                        )}
                      </>
                    )}
                    
                    <div className="pt-3 border-t border-gray-100">
                      <button 
                        onClick={() => toggleSpecSection('entertainment')}
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 group"
                      >
                        <span>{expandedSpecs['entertainment'] ? 'View Less' : 'View More'}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedSpecs['entertainment'] ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Engine & Transmission */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">ENGINE & TRANSMISSION</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {/* Dynamic Engine & Transmission Specifications from Backend - Only show fields with data */}
                    {showSkeleton ? (
                      /* Skeleton loading */
                      <>
                        {[1, 2, 3, 4, 5].map((index) => (
                          <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                            <div className="bg-gray-200 animate-pulse h-4 w-1/3 rounded"></div>
                            <div className="bg-gray-200 animate-pulse h-4 w-1/4 rounded"></div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {/* Engine Name - Only show if data exists */}
                        {variant?.engineName && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Engine Name</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.engineName}</span>
                          </div>
                        )}
                        
                        {/* Engine Capacity - Only show if data exists */}
                        {variant?.engineCapacity && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Engine Capacity</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.engineCapacity}</span>
                          </div>
                        )}
                        
                        {/* Fuel - Only show if data exists */}
                        {variant?.fuel && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Fuel</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.fuel}</span>
                          </div>
                        )}
                        
                        {/* Transmission - Only show if data exists */}
                        {variant?.transmission && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Transmission</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.transmission}</span>
                          </div>
                        )}
                        
                        {/* No of Gears - Only show if data exists */}
                        {variant?.noOfGears && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">No of Gears</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.noOfGears}</span>
                          </div>
                        )}
                        
                        {/* Paddle Shifter - Only show if data exists */}
                        {variant?.paddleShifter && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Paddle Shifter</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.paddleShifter}</span>
                          </div>
                        )}
                        
                        {/* Max Power - Only show if data exists */}
                        {variant?.maxPower && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Max Power</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.maxPower}</span>
                          </div>
                        )}
                        
                        {/* Torque - Only show if data exists */}
                        {variant?.torque && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Torque</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.torque}</span>
                          </div>
                        )}
                        
                        {/* 0 to 100 Kmph Time - Only show if data exists */}
                        {variant?.zeroToHundredKmphTime && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">0 to 100 Kmph Time</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.zeroToHundredKmphTime}</span>
                          </div>
                        )}
                        
                        {/* Top Speed - Only show if data exists */}
                        {variant?.topSpeed && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Top Speed</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.topSpeed}</span>
                          </div>
                        )}
                        
                        {/* EV Battery Capacity - Only show if data exists */}
                        {variant?.evBatteryCapacity && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">EV Battery Capacity</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.evBatteryCapacity}</span>
                          </div>
                        )}
                        
                        {/* Hybrid Battery Capacity - Only show if data exists */}
                        {variant?.hybridBatteryCapacity && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Hybrid Battery Capacity</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.hybridBatteryCapacity}</span>
                          </div>
                        )}
                        
                        {/* Battery Type - Only show if data exists */}
                        {variant?.batteryType && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Battery Type</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.batteryType}</span>
                          </div>
                        )}
                        
                        {/* Electric Motor Placement - Only show if data exists */}
                        {variant?.electricMotorPlacement && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Electric Motor Placement</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.electricMotorPlacement}</span>
                          </div>
                        )}
                        
                        {/* EV Range - Only show if data exists */}
                        {variant?.evRange && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">EV Range</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.evRange}</span>
                          </div>
                        )}
                        
                        {/* EV Charging Time - Only show if data exists */}
                        {variant?.evChargingTime && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">EV Charging Time</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.evChargingTime}</span>
                          </div>
                        )}
                        
                        {/* Max Electric Motor Power - Only show if data exists */}
                        {variant?.maxElectricMotorPower && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Max Electric Motor Power</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.maxElectricMotorPower}</span>
                          </div>
                        )}
                        
                        {/* Turbo Charged - Only show if data exists */}
                        {variant?.turboCharged && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Turbo Charged</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.turboCharged}</span>
                          </div>
                        )}
                        
                        {/* Hybrid Type - Only show if data exists */}
                        {variant?.hybridType && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Hybrid Type</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.hybridType}</span>
                          </div>
                        )}
                        
                        {/* Drive Train - Only show if data exists */}
                        {variant?.driveTrain && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Drive Train</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.driveTrain}</span>
                          </div>
                        )}
                        
                        {/* Driving Modes - Only show if data exists */}
                        {variant?.drivingModes && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Driving Modes</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.drivingModes}</span>
                          </div>
                        )}
                        
                        {/* Off Road Modes - Only show if data exists */}
                        {variant?.offRoadModes && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Off Road Modes</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.offRoadModes}</span>
                          </div>
                        )}
                        
                        {/* Differential Lock - Only show if data exists */}
                        {variant?.differentialLock && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Differential Lock</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.differentialLock}</span>
                          </div>
                        )}
                        
                        {/* Limited Slip Differential - Only show if data exists */}
                        {variant?.limitedSlipDifferential && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Limited Slip Differential</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.limitedSlipDifferential}</span>
                          </div>
                        )}
                      </>
                    )}
                    
                    <div className="pt-3 border-t border-gray-100">
                      <button 
                        onClick={() => toggleSpecSection('engine')}
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 group"
                      >
                        <span>{expandedSpecs['engine'] ? 'View Less' : 'View More'}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedSpecs['engine'] ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Seating Comfort */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">SEATING COMFORT</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {/* Dynamic Seating Comfort Specifications from Backend - Only show fields with data */}
                    {showSkeleton ? (
                      /* Skeleton loading */
                      <>
                        {[1, 2, 3, 4, 5].map((index) => (
                          <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                            <div className="bg-gray-200 animate-pulse h-4 w-1/3 rounded"></div>
                            <div className="bg-gray-200 animate-pulse h-4 w-1/4 rounded"></div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {/* Seat Upholstery - Only show if data exists */}
                        {variant?.seatUpholstery && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Seat Upholstery</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.seatUpholstery}</span>
                          </div>
                        )}
                        
                        {/* Seats Adjustment - Only show if data exists */}
                        {variant?.seatsAdjustment && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Seats Adjustment</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.seatsAdjustment}</span>
                          </div>
                        )}
                        
                        {/* Driver Seat Adjustment - Only show if data exists */}
                        {variant?.driverSeatAdjustment && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Driver Seat Adjustment</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.driverSeatAdjustment}</span>
                          </div>
                        )}
                        
                        {/* Passenger Seat Adjustment - Only show if data exists */}
                        {variant?.passengerSeatAdjustment && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Passenger Seat Adjustment</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.passengerSeatAdjustment}</span>
                          </div>
                        )}
                        
                        {/* Rear Seat Adjustment - Only show if data exists */}
                        {variant?.rearSeatAdjustment && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Rear Seat Adjustment</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.rearSeatAdjustment}</span>
                          </div>
                        )}
                        
                        {/* Welcome Seats - Only show if data exists */}
                        {variant?.welcomeSeats && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Welcome Seats</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.welcomeSeats}</span>
                          </div>
                        )}
                        
                        {/* Memory Seats - Only show if data exists */}
                        {variant?.memorySeats && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Memory Seats</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.memorySeats}</span>
                          </div>
                        )}
                      </>
                    )}
                    
                    <div className="pt-3 border-t border-gray-100">
                      <button 
                        onClick={() => toggleSpecSection('seating')}
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 group"
                      >
                        <span>{expandedSpecs['seating'] ? 'View Less' : 'View More'}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedSpecs['seating'] ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Exteriors */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">EXTERIORS</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {/* Dynamic Exteriors Specifications from Backend - Only show fields with data */}
                    {showSkeleton ? (
                      /* Skeleton loading */
                      <>
                        {[1, 2, 3, 4, 5].map((index) => (
                          <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                            <div className="bg-gray-200 animate-pulse h-4 w-1/3 rounded"></div>
                            <div className="bg-gray-200 animate-pulse h-4 w-1/4 rounded"></div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {/* Head Lights - Only show if data exists */}
                        {variant?.headLights && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Head Lights</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.headLights}</span>
                          </div>
                        )}
                        
                        {/* Tail Light - Only show if data exists */}
                        {variant?.tailLight && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Tail Light</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.tailLight}</span>
                          </div>
                        )}
                        
                        {/* Front Fog Lights - Only show if data exists */}
                        {variant?.frontFogLights && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Front Fog Lights</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.frontFogLights}</span>
                          </div>
                        )}
                        
                        {/* Roof Rails - Only show if data exists */}
                        {variant?.roofRails && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Roof Rails</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.roofRails}</span>
                          </div>
                        )}
                        
                        {/* Radio Antenna - Only show if data exists */}
                        {variant?.radioAntenna && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Radio Antenna</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.radioAntenna}</span>
                          </div>
                        )}
                        
                        {/* Outside Rear View Mirror - Only show if data exists */}
                        {variant?.outsideRearViewMirror && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Outside Rear View Mirror</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.outsideRearViewMirror}</span>
                          </div>
                        )}
                        
                        {/* Day Time Running Lights (DRL's) - Only show if data exists */}
                        {variant?.dayTimeRunningLights && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Day Time Running Lights (DRL's)</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.dayTimeRunningLights}</span>
                          </div>
                        )}
                        
                        {/* Side Indicator - Only show if data exists */}
                        {variant?.sideIndicator && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Side Indicator</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.sideIndicator}</span>
                          </div>
                        )}
                        
                        {/* Rear Windshield Wiper / Washer - Only show if data exists */}
                        {variant?.rearWindshieldWiperWasher && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Rear Windshield Wiper / Washer</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.rearWindshieldWiperWasher}</span>
                          </div>
                        )}
                      </>
                    )}
                    
                    <div className="pt-3 border-t border-gray-100">
                      <button 
                        onClick={() => toggleSpecSection('exteriors')}
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 group"
                      >
                        <span>{expandedSpecs['exteriors'] ? 'View Less' : 'View More'}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedSpecs['exteriors'] ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Dimensions */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">DIMENSIONS</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {/* Dynamic Dimensions Specifications from Backend - Only show fields with data */}
                    {showSkeleton ? (
                      /* Skeleton loading */
                      <>
                        {[1, 2, 3, 4, 5].map((index) => (
                          <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                            <div className="bg-gray-200 animate-pulse h-4 w-1/3 rounded"></div>
                            <div className="bg-gray-200 animate-pulse h-4 w-1/4 rounded"></div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {/* Ground Clearance - Only show if data exists */}
                        {variant?.groundClearance && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Ground Clearance</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.groundClearance}</span>
                          </div>
                        )}
                        
                        {/* Length - Only show if data exists */}
                        {variant?.length && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Length</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.length}</span>
                          </div>
                        )}
                        
                        {/* Width - Only show if data exists */}
                        {variant?.width && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Width</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.width}</span>
                          </div>
                        )}
                        
                        {/* Height - Only show if data exists */}
                        {variant?.height && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Height</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.height}</span>
                          </div>
                        )}
                        
                        {/* Wheelbase - Only show if data exists */}
                        {variant?.wheelbase && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Wheelbase</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.wheelbase}</span>
                          </div>
                        )}
                        
                        {/* Turning Radius - Only show if data exists */}
                        {variant?.turningRadius && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Turning Radius</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.turningRadius}</span>
                          </div>
                        )}
                        
                        {/* Kerb Weight - Only show if data exists */}
                        {variant?.kerbWeight && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Kerb Weight</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.kerbWeight}</span>
                          </div>
                        )}
                      </>
                    )}
                    
                    <div className="pt-3 border-t border-gray-100">
                      <button 
                        onClick={() => toggleSpecSection('dimensions')}
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 group"
                      >
                        <span>{expandedSpecs['dimensions'] ? 'View Less' : 'View More'}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedSpecs['dimensions'] ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tyre & Suspension */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">TYRE & SUSPENSION</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {/* Dynamic Tyre & Suspension Specifications from Backend - Only show fields with data */}
                    {showSkeleton ? (
                      /* Skeleton loading */
                      <>
                        {[1, 2, 3, 4, 5].map((index) => (
                          <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                            <div className="bg-gray-200 animate-pulse h-4 w-1/3 rounded"></div>
                            <div className="bg-gray-200 animate-pulse h-4 w-1/4 rounded"></div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {/* Front Tyre Profile - Only show if data exists */}
                        {variant?.frontTyreProfile && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Front Tyre Profile</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.frontTyreProfile}</span>
                          </div>
                        )}
                        
                        {/* Rear Tyre Profile - Only show if data exists */}
                        {variant?.rearTyreProfile && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Rear Tyre Profile</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.rearTyreProfile}</span>
                          </div>
                        )}
                        
                        {/* Spare Tyre Profile - Only show if data exists */}
                        {variant?.spareTyreProfile && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Spare Tyre Profile</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.spareTyreProfile}</span>
                          </div>
                        )}
                        
                        {/* Spare Wheel Type - Only show if data exists */}
                        {variant?.spareWheelType && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Spare Wheel Type</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.spareWheelType}</span>
                          </div>
                        )}
                        
                        {/* Front Suspension - Only show if data exists */}
                        {variant?.frontSuspension && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Front Suspension</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.frontSuspension}</span>
                          </div>
                        )}
                        
                        {/* Rear Suspension - Only show if data exists */}
                        {variant?.rearSuspension && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Rear Suspension</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.rearSuspension}</span>
                          </div>
                        )}
                      </>
                    )}
                    
                    <div className="pt-3 border-t border-gray-100">
                      <button 
                        onClick={() => toggleSpecSection('tyre')}
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 group"
                      >
                        <span>{expandedSpecs['tyre'] ? 'View Less' : 'View More'}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedSpecs['tyre'] ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Storage */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">STORAGE</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {/* Dynamic Storage Specifications from Backend - Only show fields with data */}
                    {showSkeleton ? (
                      /* Skeleton loading */
                      <>
                        {[1, 2, 3, 4].map((index) => (
                          <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                            <div className="bg-gray-200 animate-pulse h-4 w-1/3 rounded"></div>
                            <div className="bg-gray-200 animate-pulse h-4 w-1/4 rounded"></div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {/* Cupholders - Only show if data exists */}
                        {variant?.cupholders && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Cupholders</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.cupholders}</span>
                          </div>
                        )}
                        
                        {/* Fuel Tank Capacity - Only show if data exists */}
                        {variant?.fuelTankCapacity && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Fuel Tank Capacity</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.fuelTankCapacity}</span>
                          </div>
                        )}
                        
                        {/* Boot Space - Only show if data exists */}
                        {variant?.bootSpace && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Boot Space</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.bootSpace}</span>
                          </div>
                        )}
                        
                        {/* Boot Space After Folding Rear Row Seats - Only show if data exists */}
                        {variant?.bootSpaceAfterFoldingRearRowSeats && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-gray-600 w-1/3">Boot Space After Folding Rear Row Seats</span>
                            <span className="text-gray-900 font-medium w-2/3">{variant.bootSpaceAfterFoldingRearRowSeats}</span>
                          </div>
                        )}
                      </>
                    )}
                    
                    <div className="pt-3 border-t border-gray-100">
                      <button 
                        onClick={() => toggleSpecSection('storage')}
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 group"
                      >
                        <span>{expandedSpecs['storage'] ? 'View Less' : 'View More'}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedSpecs['storage'] ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageSection>

        {/* Section 4: AD Banner + More Variants */}
        <PageSection background="white" maxWidth="7xl">
          <div className="space-y-8">
            {/* AD Banner */}
            <div className="bg-gray-300 rounded-lg py-20 text-center">
              <h2 className="text-3xl font-bold text-gray-600">AD Banner</h2>
            </div>

            {/* More Variants Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">More {brandName} {modelName} Variants</h2>
              
              {/* Filter Options */}
              <div className="flex flex-wrap gap-3">
                {['All', 'Diesel', 'Petrol', 'CNG', 'Automatic'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeFilter === filter
                        ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Variant Cards */}
              <div className="space-y-4">
                {mockVariants.map((variant) => (
                  <div 
                    key={variant.id} 
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    onClick={() => handleVariantClick(variant)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-red-600 mb-1">{variant.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{variant.fuel}</span>
                          <span>{variant.transmission}</span>
                          <span>{variant.power}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Ex-Showroom</p>
                        <p className="text-xl font-bold text-gray-900">₹ {variant.price.toFixed(2)} Lakhs</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Key Features:</p>
                      <p className="text-sm text-gray-600">
                        {variant.features}
                      </p>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button 
                        className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleVariantClick(variant)
                        }}
                      >
                        Get On-Road Price
                      </button>
                      <button 
                        className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded text-sm font-medium transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Compare
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* View More Button */}
              <div className="text-center pt-4">
                <button className="text-red-600 hover:text-orange-600 font-medium">
                  View More Variants
                </button>
              </div>
            </div>
          </div>
        </PageSection>

        {/* Section 5: Variant Summary, AD Banner, Engine & Mileage */}
        <PageSection background="white" maxWidth="7xl">
          <div className="space-y-8">
            {/* Variant Summary Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">{displayBrandName} {displayModelName} Summary</h2>
              
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <h3 className="text-lg font-bold text-gray-900">Description</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    The {displayBrandName} {displayModelName} is a {currentVariantData.fuelType} {currentVariantData.transmission.toLowerCase()} variant that belongs to the premium hatchback segment. It offers excellent value for money with modern features and was launched in {currentVariantData.launchYear}.
                  </p>
                  <button className="text-red-500 hover:text-red-600 text-sm font-medium">
                    Read More
                  </button>
                </div>

                {/* Exterior Design */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <h3 className="text-lg font-bold text-gray-900">Exterior Design</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    The {brandName} {modelName} comes with a modern and stylish exterior design. The front features sleek headlamps with integrated DRLs and a bold grille design that gives it a distinctive appearance.
                  </p>
                  <button className="text-red-500 hover:text-red-600 text-sm font-medium">
                    Read More
                  </button>
                </div>

                {/* Comfort & Convenience */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <h3 className="text-lg font-bold text-gray-900">Comfort & Convenience</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    The interior features a well-designed dashboard with premium materials. It comes equipped with a touchscreen infotainment system, automatic climate control, and various comfort features for an enhanced driving experience.
                  </p>
                  <button className="text-red-500 hover:text-red-600 text-sm font-medium">
                    Read More
                  </button>
                </div>
              </div>
            </div>

            {/* AD Banner */}
            <div className="bg-gray-300 rounded-lg py-20 text-center">
              <h2 className="text-3xl font-bold text-gray-600">AD Banner</h2>
            </div>

            {/* Engine Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">{displayBrandName} {displayModelName} Engine</h2>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Engine Header - Always Visible */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{currentVariantData.engine} {currentVariantData.fuelType}</h3>
                    </div>
                    <button className="text-red-500 hover:text-red-600 font-medium text-sm transition-colors">
                      Read More
                    </button>
                  </div>
                  
                  <p className="text-gray-600 text-sm mt-3">
                    Suitable for both city driving and highway cruising. The {currentVariantData.engine} engine offers excellent fuel efficiency with smooth acceleration.
                  </p>
                </div>

                {/* Engine Details */}
                <div className="px-6 pb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-3 text-center">{currentVariantData.transmission}</h4>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Power:</p>
                        <p className="font-medium text-gray-900">{currentVariantData.power}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Torque:</p>
                        <p className="font-medium text-gray-900">{currentVariantData.torque}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Transmission:</p>
                        <p className="font-medium text-gray-900">{currentVariantData.transmission}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mileage Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">{displayBrandName} {displayModelName} Mileage</h2>
              
              <div className="flex justify-center">
                <div className="w-64 bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-300">
                  {/* Engine Header */}
                  <div className="text-center mb-4">
                    <h3 className="text-red-500 font-bold text-sm mb-1">Engine & Transmission</h3>
                    <h4 className="text-red-500 font-bold text-base mb-1">{currentVariantData.engine} {currentVariantData.fuelType}</h4>
                    <p className="text-red-500 font-bold text-sm">{currentVariantData.transmission}</p>
                  </div>

                  {/* Mileage Details */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">Company Claimed</span>
                      <span className="text-gray-900 font-bold text-sm">{currentVariantData.mileage} Kmpl</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">City Real World</span>
                      <span className="text-gray-900 font-bold text-sm">{(currentVariantData.mileage * 0.85).toFixed(1)} Kmpl</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 text-sm">Highway Real World</span>
                      <span className="text-gray-900 font-bold text-sm">{(currentVariantData.mileage * 1.1).toFixed(1)} Kmpl</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Single Dot for Single Engine */}
              <div className="flex justify-center">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-600 to-orange-500"></div>
              </div>
            </div>
          </div>
        </PageSection>

        {/* Section 6: City On-Road Prices, AD Banner & Upcoming Cars */}
        <PageSection background="white" maxWidth="7xl">
          <div className="space-y-8">
            {/* City On-Road Prices */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">{brandName} {modelName} {variantName} Price across India</h2>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">City</h3>
                    <h3 className="text-lg font-semibold text-gray-900">On-Road Prices</h3>
                  </div>
                </div>
                
                {/* City Price List */}
                <div className="divide-y divide-gray-200">
                  {currentVariantData.cities.map((city, index) => (
                    <div key={city.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center">
                        <span className="text-red-600 font-medium hover:text-red-700 cursor-pointer">
                          {city.name}
                        </span>
                        <span className="text-gray-900 font-semibold">
                          Rs. {(currentVariantData.price + (index * 0.1) + 0.5).toFixed(2)} Lakh
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* View More Cities Button */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
                  <button className="text-gray-600 hover:text-gray-800 font-medium text-sm flex items-center justify-center space-x-1">
                    <span>View More Cities</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* AD Banner */}
            <div className="bg-gray-300 rounded-lg py-20 text-center">
              <h2 className="text-3xl font-bold text-gray-600">AD Banner</h2>
            </div>

            {/* Upcoming Cars Section */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Cars</h2>
                <button className="text-red-600 hover:text-orange-600 font-medium text-sm flex items-center space-x-1">
                  <span>View All Cars</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              
              {/* Cars Horizontal Scroll */}
              <div className="relative">
                <div
                  className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {[
                    {
                      id: 1,
                      name: 'Grand Vitara',
                      brand: 'Maruti Suzuki',
                      image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop&crop=center',
                      startingPrice: 1099000,
                      fuelType: 'Petrol/Hybrid',
                      seating: 5,
                      launchDate: 'Launched January 2024',
                      slug: 'maruti-suzuki-grand-vitara',
                      isNew: true
                    },
                    {
                      id: 2,
                      name: 'Safari',
                      brand: 'Tata',
                      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop&crop=center',
                      startingPrice: 2999000,
                      fuelType: 'Petrol/Diesel',
                      seating: 7,
                      launchDate: 'Launched March 2024',
                      slug: 'tata-safari',
                      isNew: true
                    },
                    {
                      id: 3,
                      name: 'Creta',
                      brand: 'Hyundai',
                      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&crop=center',
                      startingPrice: 1199000,
                      fuelType: 'Petrol/Diesel',
                      seating: 5,
                      launchDate: 'Launched February 2024',
                      slug: 'hyundai-creta',
                      isNew: false
                    },
                    {
                      id: 4,
                      name: 'Nexon',
                      brand: 'Tata',
                      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop&crop=center',
                      startingPrice: 799000,
                      fuelType: 'Petrol/Electric',
                      seating: 5,
                      launchDate: 'Launched April 2024',
                      slug: 'tata-nexon',
                      isNew: true
                    }
                  ].map((car) => (
                    <div
                      key={car.id}
                      className="flex-shrink-0 w-80 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      {/* Car Image with Badges */}
                      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                        {/* NEW Badge */}
                        {car.isNew && (
                          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                            NEW
                          </div>
                        )}
                        
                        {/* Heart Icon */}
                        <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-10">
                          <Heart className="h-5 w-5 text-gray-600" />
                        </button>

                        {/* Car Image */}
                        <div className="w-full h-full flex items-center justify-center">
                          <img 
                            src={car.image}
                            alt={`${car.brand} ${car.name}`}
                            className="w-full h-full object-cover object-center scale-110 hover:scale-115 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%23374151'%3E%3Cpath d='M50 200h300c5.5 0 10-4.5 10-10v-80c0-16.6-13.4-30-30-30H70c-16.6 0-30 13.4-30 30v80c0 5.5 4.5 10 10 10z'/%3E%3Ccircle cx='100' cy='220' r='25' fill='%23111827'/%3E%3Ccircle cx='300' cy='220' r='25' fill='%23111827'/%3E%3Cpath d='M80 110h240l-20-30H100z' fill='%236B7280'/%3E%3C/svg%3E"
                            }}
                          />
                        </div>
                      </div>

                      {/* Car Info */}
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 mb-2 text-lg">{car.brand} {car.name}</h3>
                        
                        <div className="flex items-center text-red-600 font-bold text-xl mb-4">
                          <span>₹ {(car.startingPrice / 100000).toFixed(2)} Lakh</span>
                        </div>

                        <div className="space-y-3 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-3 text-gray-400" />
                            <span>{car.launchDate}</span>
                          </div>
                          <div className="flex items-center">
                            <Fuel className="h-4 w-4 mr-3 text-gray-400" />
                            <span>{car.fuelType}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-3 text-gray-400" />
                            <span>{car.seating} Seater</span>
                          </div>
                        </div>

                        <button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-3 rounded-lg transition-all duration-200 text-sm font-semibold">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PageSection>

        {/* Section 7: New Launched Cars, AD Banner, Consultancy & Feedback */}
        <PageSection background="white" maxWidth="7xl">
          <div className="space-y-8">
            {/* New Launched Cars */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">New Launched Cars</h2>
                <button className="text-red-600 hover:text-orange-600 font-medium text-sm flex items-center space-x-1">
                  <span>View All Cars</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              
              {/* Cars Horizontal Scroll */}
              <div className="relative">
                <div
                  className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {[
                    {
                      id: 1,
                      name: 'Grand Vitara',
                      brand: 'Maruti Suzuki',
                      image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop&crop=center',
                      startingPrice: 1099000,
                      fuelType: 'Petrol/Hybrid',
                      seating: 5,
                      launchDate: 'Launched January 2024',
                      slug: 'maruti-suzuki-grand-vitara',
                      isNew: true
                    },
                    {
                      id: 2,
                      name: 'Safari',
                      brand: 'Tata',
                      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop&crop=center',
                      startingPrice: 2999000,
                      fuelType: 'Petrol/Diesel',
                      seating: 7,
                      launchDate: 'Launched March 2024',
                      slug: 'tata-safari',
                      isNew: true
                    },
                    {
                      id: 3,
                      name: 'Creta',
                      brand: 'Hyundai',
                      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&crop=center',
                      startingPrice: 1199000,
                      fuelType: 'Petrol/Diesel',
                      seating: 5,
                      launchDate: 'Launched February 2024',
                      slug: 'hyundai-creta',
                      isNew: false
                    },
                    {
                      id: 4,
                      name: 'Nexon',
                      brand: 'Tata',
                      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop&crop=center',
                      startingPrice: 799000,
                      fuelType: 'Petrol/Electric',
                      seating: 5,
                      launchDate: 'Launched April 2024',
                      slug: 'tata-nexon',
                      isNew: true
                    }
                  ].map((car) => (
                    <div
                      key={car.id}
                      className="flex-shrink-0 w-80 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      {/* Car Image with Badges */}
                      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                        {/* NEW Badge */}
                        {car.isNew && (
                          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                            NEW
                          </div>
                        )}
                        
                        {/* Heart Icon */}
                        <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-10">
                          <Heart className="h-5 w-5 text-gray-600" />
                        </button>

                        {/* Car Image */}
                        <div className="w-full h-full flex items-center justify-center">
                          <img 
                            src={car.image}
                            alt={`${car.brand} ${car.name}`}
                            className="w-full h-full object-cover object-center scale-110 hover:scale-115 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%23374151'%3E%3Cpath d='M50 200h300c5.5 0 10-4.5 10-10v-80c0-16.6-13.4-30-30-30H70c-16.6 0-30 13.4-30 30v80c0 5.5 4.5 10 10 10z'/%3E%3Ccircle cx='100' cy='220' r='25' fill='%23111827'/%3E%3Ccircle cx='300' cy='220' r='25' fill='%23111827'/%3E%3Cpath d='M80 110h240l-20-30H100z' fill='%236B7280'/%3E%3C/svg%3E"
                            }}
                          />
                        </div>
                      </div>

                      {/* Car Info */}
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 mb-2 text-lg">{car.brand} {car.name}</h3>
                        
                        <div className="flex items-center text-red-600 font-bold text-xl mb-4">
                          <span>₹ {(car.startingPrice / 100000).toFixed(2)} Lakh</span>
                        </div>

                        <div className="space-y-3 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-3 text-gray-400" />
                            <span>{car.launchDate}</span>
                          </div>
                          <div className="flex items-center">
                            <Fuel className="h-4 w-4 mr-3 text-gray-400" />
                            <span>{car.fuelType}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-3 text-gray-400" />
                            <span>{car.seating} Seater</span>
                          </div>
                        </div>

                        <button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-3 rounded-lg transition-all duration-200 text-sm font-semibold">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AD Banner */}
            <div className="bg-gray-300 rounded-lg py-20 text-center">
              <h2 className="text-3xl font-bold text-gray-600">AD Banner</h2>
            </div>

            {/* Consultancy Section */}
            <div>
              <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-lg p-6 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full"></div>
                  <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full"></div>
                </div>

                <div className="relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    {/* Content */}
                    <div>
                      <div className="flex items-center mb-3">
                        <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold mr-3">
                          FREE
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold">Car Buying Consultation</h2>
                      </div>
                      
                      <p className="text-blue-100 mb-4 text-lg">
                        Confused about which car to buy? Get expert advice from our certified car consultants.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-sm">Personalized Recommendations</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-sm">Budget Planning</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-sm">Loan Assistance</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-sm">Best Deal Negotiation</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center space-x-6 mb-6">
                        <div className="text-center">
                          <div className="flex items-center text-yellow-400 mb-1">
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                            <Star className="h-4 w-4 fill-current" />
                          </div>
                          <div className="text-xs text-blue-100">50,000+ Happy Customers</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                          <Phone className="h-5 w-5 mr-2" />
                          Call Now
                        </button>
                        
                        <button className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                          <MessageCircle className="h-5 w-5 mr-2" />
                          WhatsApp
                        </button>
                        
                        <button className="flex items-center justify-center bg-white text-red-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors">
                          <Calendar className="h-5 w-5 mr-2" />
                          Book Consultation
                        </button>
                      </div>
                    </div>

                    {/* Consultant Image/Illustration */}
                    <div className="text-center lg:text-right">
                      <div className="inline-block bg-white/10 rounded-lg p-6">
                        <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <Users className="h-16 w-16 text-white/80" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Expert Consultants</h3>
                        <p className="text-blue-100 text-sm">
                          Our certified automotive experts have helped thousands of customers find their perfect car.
                        </p>
                        <div className="mt-4 text-xs text-blue-200">
                          <p><strong>Limited Time:</strong> Get free consultation worth ₹2,000 absolutely FREE!</p>
                          <p className="mt-1">Average Savings: ₹50,000 | 5 Min & FREE</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Share Your Feedback</h2>
                <p className="text-gray-600">Help us improve by sharing your thoughts about this page</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <form className="space-y-6">
                  {/* Feedback Textarea */}
                  <div>
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Feedback
                    </label>
                    <textarea
                      id="feedback"
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                      placeholder="Tell us what you think about this car page..."
                    ></textarea>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Submit Feedback
                  </button>
                </form>
              </div>
            </div>
          </div>
        </PageSection>
      </div>

      <Footer />
    </div>
  )
}
