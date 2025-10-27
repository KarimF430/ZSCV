'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Heart, Star, Share2, ChevronDown, ChevronRight, Calendar, Users, Fuel, ChevronLeft, Clock, Eye, MessageCircle, ArrowRight, Play, ExternalLink, ThumbsUp, Phone, CheckCircle } from 'lucide-react'
import Footer from '../Footer'
import PageSection from '../common/PageSection'

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
  const [showSummaryDescription, setShowSummaryDescription] = useState(false)
  const [showSummaryExterior, setShowSummaryExterior] = useState(false)
  const [showSummaryComfort, setShowSummaryComfort] = useState(false)
  const [expandedEngine, setExpandedEngine] = useState<boolean>(false)
  
  // Backend data fetching states
  const [variant, setVariant] = useState<any>(null)
  const [model, setModel] = useState<any>(null)
  const [brand, setBrand] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [initialLoad, setInitialLoad] = useState(true)
  const [allModelVariants, setAllModelVariants] = useState<any[]>([])
  
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
        const brandsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}/api/brands`)
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
        const modelsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}/api/models?brandId=${foundBrand.id}`)
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
        const variantsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}/api/variants?modelId=${foundModel.id}`)
        if (!variantsResponse.ok) throw new Error('Failed to fetch variants')
        const variants = await variantsResponse.json()
        
        // Store all variants for the More Variants section
        setAllModelVariants(variants)
        
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
            rainSensingWipers: foundVariant.rainSensingWipers,
            automaticHeadlamp: foundVariant.automaticHeadlamp,
            followMeHomeHeadlights: foundVariant.followMeHomeHeadlights,
            ignition: foundVariant.ignition,
            ambientLighting: foundVariant.ambientLighting,
            airConditioning: foundVariant.airConditioning,
            climateZones: foundVariant.climateZones,
            rearACVents: foundVariant.rearACVents,
            frontArmrest: foundVariant.frontArmrest
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
            engineNamePage4: foundVariant.engineNamePage4,
            engineCapacity: foundVariant.engineCapacity,
            fuel: foundVariant.fuel,
            transmission: foundVariant.transmission,
            maxPower: foundVariant.maxPower
          })
          console.log('VariantPage: Seating Comfort specs:', {
            seatUpholstery: foundVariant.seatUpholstery,
            seatsAdjustment: foundVariant.seatsAdjustment,
            driverSeatAdjustment: foundVariant.driverSeatAdjustment,
            passengerSeatAdjustment: foundVariant.passengerSeatAdjustment,
            rearSeatAdjustment: foundVariant.rearSeatAdjustment,
            welcomeSeats: foundVariant.welcomeSeats,
            memorySeats: foundVariant.memorySeats
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

  // Transform backend variant data for More Variants section - exclude current variant and sort by price
  const transformedVariants = allModelVariants
    .filter(v => v.id !== variant?.id) // Exclude current variant
    .map(v => ({
      id: v.id,
      name: v.name,
      price: v.price ? (v.price / 100000) : 0, // Convert to lakhs
      fuel: v.fuel || 'Petrol',
      transmission: v.transmission || 'Manual',
      power: v.maxPower || 'N/A',
      features: v.keyFeatures || v.headerSummary || 'Key features not available'
    }))
    .sort((a, b) => a.price - b.price) // Sort by price in ascending order

  // Filter variants based on active filter
  const getFilteredVariants = () => {
    switch (activeFilter) {
      case 'Diesel':
        return transformedVariants.filter(v => v.fuel === 'Diesel')
      case 'Petrol':
        return transformedVariants.filter(v => v.fuel === 'Petrol')
      case 'CNG':
        return transformedVariants.filter(v => v.fuel === 'CNG')
      case 'Automatic':
        return transformedVariants.filter(v => v.transmission === 'Automatic')
      default:
        return transformedVariants
    }
  }

  const filteredVariants = getFilteredVariants()

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
    images: variant.highlightImages?.map((img: any) => `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}${img.url}`) || 
            model?.galleryImages?.map((img: any) => `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}${img.url}`) || 
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
  const handleVariantChange = (variant: typeof availableVariants[0]) => {
    if (!displayBrandName || !displayModelName || !variant?.name) return
    
    const brandSlug = displayBrandName.toLowerCase().replace(/\s+/g, '-')
    const modelSlug = displayModelName.toLowerCase().replace(/\s+/g, '-')
    const variantSlug = variant.name.toLowerCase().replace(/\s+/g, '-')
    const url = `/${brandSlug}-cars/${modelSlug}/${variantSlug}`
    console.log('Navigating to variant page:', url)
    router.push(url)
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
                    src={currentImageIndex === 0 && model?.heroImage ? `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}${model.heroImage}` :
                         model?.galleryImages?.[currentImageIndex === 0 ? 0 : currentImageIndex - 1]?.url ? `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}${model.galleryImages[currentImageIndex === 0 ? 0 : currentImageIndex - 1].url}` : 
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
                    <p className="text-gray-600 text-base">Mahindra Bank</p>
                  </div>
                </div>
                
                {/* EMI Amount Display */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">₹12,700</p>
                  <p className="text-gray-600 text-base">per month</p>
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
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}${highlight.url}`}
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
              <h2 className="text-2xl font-bold text-gray-900">{brandName} {modelName} {variantName} Info</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>
                  Tata Nexon price for the base model starts at Rs. 8.00 Lakh and the top model price goes upto Rs. 15.60 Lakh (Avg. ex-showroom). Nexon price for 49 variants is listed below.
                </p>
              </div>
            </div>

            {/* Specifications Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {brandName} {variantName} {modelName} Specifications & Features
              </h2>

              {/* Specifications Categories */}
              <div className="space-y-8">
                {/* Comfort & Convenience */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 pb-4">
                    <h3 className="text-xl font-bold text-gray-900">Comfort & Convenience</h3>
                    <button 
                      onClick={() => toggleSpecSection('comfort')}
                      className="p-1"
                    >
                      <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${expandedSpecs['comfort'] ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="px-6 pb-6">
                    {/* Always visible specs */}
                    <div className="space-y-4">
                      {showSkeleton ? (
                        /* Skeleton loading */
                        <>
                          {[1, 2].map((index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div className="bg-gray-200 animate-pulse h-4 text-base rounded"></div>
                              <div className="bg-gray-200 animate-pulse h-4 w-1/4 rounded"></div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {/* Show first 2 specs always */}
                          {variant?.ventilatedSeats && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-base">Ventilated Seats</span>
                              <span className="text-gray-900 font-medium text-base">{variant.ventilatedSeats}</span>
                            </div>
                          )}
                          
                          {variant?.sunroof && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-base">Sunroof</span>
                              <span className="text-gray-900 font-medium text-base">{variant.sunroof}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    
                    {/* Expanded content */}
                    {expandedSpecs['comfort'] && !showSkeleton && (
                      <div className="mt-4 space-y-4">
                        {variant?.airPurifier && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Air Purifier</span>
                            <span className="text-gray-900 font-medium text-base">{variant.airPurifier}</span>
                          </div>
                        )}
                        
                        {variant?.headsUpDisplay && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Heads Up Display (HUD)</span>
                            <span className="text-gray-900 font-medium text-base">{variant.headsUpDisplay}</span>
                          </div>
                        )}
                        
                        {variant?.cruiseControl && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Cruise Control</span>
                            <span className="text-gray-900 font-medium text-base">{variant.cruiseControl}</span>
                          </div>
                        )}
                        
                        {variant?.rainSensingWipers && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Rain Sensing Wipers</span>
                            <span className="text-gray-900 font-medium text-base">{variant.rainSensingWipers}</span>
                          </div>
                        )}
                        
                        {variant?.automaticHeadlamp && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Automatic Headlamp</span>
                            <span className="text-gray-900 font-medium text-base">{variant.automaticHeadlamp}</span>
                          </div>
                        )}
                        
                        {variant?.followMeHomeHeadlights && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Follow Me Home Headlights</span>
                            <span className="text-gray-900 font-medium text-base">{variant.followMeHomeHeadlights}</span>
                          </div>
                        )}
                        
                        {variant?.ignition && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Ignition</span>
                            <span className="text-gray-900 font-medium text-base">{variant.ignition}</span>
                          </div>
                        )}
                        
                        {variant?.ambientLighting && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Ambient Lighting</span>
                            <span className="text-gray-900 font-medium text-base">{variant.ambientLighting}</span>
                          </div>
                        )}
                        
                        {variant?.airConditioning && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Air Conditioning</span>
                            <span className="text-gray-900 font-medium text-base">{variant.airConditioning}</span>
                          </div>
                        )}
                        
                        {variant?.climateZones && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Climate Zones</span>
                            <span className="text-gray-900 font-medium text-base">{variant.climateZones}</span>
                          </div>
                        )}
                        
                        {variant?.rearACVents && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Rear A/C Vents</span>
                            <span className="text-gray-900 font-medium text-base">{variant.rearACVents}</span>
                          </div>
                        )}
                        
                        {variant?.frontArmrest && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Front Armrest</span>
                            <span className="text-gray-900 font-medium text-base">{variant.frontArmrest}</span>
                          </div>
                        )}
                        
                        {variant?.automaticClimateControl && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Automatic Climate Control</span>
                            <span className="text-gray-900 font-medium text-base">{variant.automaticClimateControl}</span>
                          </div>
                        )}
                        
                        {variant?.airQualityIndexDisplay && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Air Quality Index Display</span>
                            <span className="text-gray-900 font-medium text-base">{variant.airQualityIndexDisplay}</span>
                          </div>
                        )}
                        
                        {variant?.remoteEngineStartStop && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Remote Engine Start / Stop</span>
                            <span className="text-gray-900 font-medium text-base">{variant.remoteEngineStartStop}</span>
                          </div>
                        )}
                        
                        {variant?.remoteClimateControl && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Remote Climate Control</span>
                            <span className="text-gray-900 font-medium text-base">{variant.remoteClimateControl}</span>
                          </div>
                        )}
                        
                        {variant?.steeringAdjustment && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Steering Adjustment</span>
                            <span className="text-gray-900 font-medium text-base">{variant.steeringAdjustment}</span>
                          </div>
                        )}
                        
                        {variant?.steeringWheelMaterial && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Steering Wheel Material</span>
                            <span className="text-gray-900 font-medium text-base">{variant.steeringWheelMaterial}</span>
                          </div>
                        )}
                        
                        {variant?.parkingSensors && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Parking Sensors</span>
                            <span className="text-gray-900 font-medium text-base">{variant.parkingSensors}</span>
                          </div>
                        )}
                        
                        {variant?.keylessEntry && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Keyless Entry</span>
                            <span className="text-gray-900 font-medium text-base">{variant.keylessEntry}</span>
                          </div>
                        )}
                        
                        {variant?.engineStartStopButton && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Engine Start Stop Button</span>
                            <span className="text-gray-900 font-medium text-base">{variant.engineStartStopButton}</span>
                          </div>
                        )}
                        
                        {variant?.gloveCompartment && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Glove Compartment</span>
                            <span className="text-gray-900 font-medium text-base">{variant.gloveCompartment}</span>
                          </div>
                        )}
                        
                        {variant?.centerConsoleArmrest && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Center Console Armrest</span>
                            <span className="text-gray-900 font-medium text-base">{variant.centerConsoleArmrest}</span>
                          </div>
                        )}
                        
                        {variant?.rearArmrest && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Rear Armrest</span>
                            <span className="text-gray-900 font-medium text-base">{variant.rearArmrest}</span>
                          </div>
                        )}
                        
                        {variant?.insideRearViewMirror && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Inside Rear View Mirror</span>
                            <span className="text-gray-900 font-medium text-base">{variant.insideRearViewMirror}</span>
                          </div>
                        )}
                        
                        {variant?.outsideRearViewMirrors && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Outside Rear View Mirrors</span>
                            <span className="text-gray-900 font-medium text-base">{variant.outsideRearViewMirrors}</span>
                          </div>
                        )}
                        
                        {variant?.steeringMountedControls && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Steering Mounted Controls</span>
                            <span className="text-gray-900 font-medium text-base">{variant.steeringMountedControls}</span>
                          </div>
                        )}
                        
                        {variant?.rearWindshieldDefogger && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Rear Windshield Defogger</span>
                            <span className="text-gray-900 font-medium text-base">{variant.rearWindshieldDefogger}</span>
                          </div>
                        )}
                        
                        {variant?.frontWindshieldDefogger && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Front Windshield Defogger</span>
                            <span className="text-gray-900 font-medium text-base">{variant.frontWindshieldDefogger}</span>
                          </div>
                        )}
                        
                        {variant?.cooledGlovebox && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Cooled Glovebox</span>
                            <span className="text-gray-900 font-medium text-base">{variant.cooledGlovebox}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* View More/Less Button */}
                    <div className="mt-6 flex justify-center">
                      <button 
                        onClick={() => toggleSpecSection('comfort')}
                        className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center space-x-1 transition-colors duration-200"
                      >
                        <span>{expandedSpecs['comfort'] ? 'View less' : 'View more'}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedSpecs['comfort'] ? 'rotate-270' : 'rotate-90'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Safety */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 pb-4">
                    <h3 className="text-xl font-bold text-gray-900">Safety</h3>
                    <button 
                      onClick={() => toggleSpecSection('safety')}
                      className="p-1"
                    >
                      <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${expandedSpecs['safety'] ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="px-6 pb-6">
                    {/* Always visible specs */}
                    <div className="space-y-4">
                      {showSkeleton ? (
                        /* Skeleton loading */
                        <>
                          {[1, 2].map((index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div className="bg-gray-200 animate-pulse h-4 text-base rounded"></div>
                              <div className="bg-gray-200 animate-pulse h-4 w-1/4 rounded"></div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {/* Show first 2 specs always */}
                          {variant?.globalNCAPRating && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-base">Global NCAP Rating</span>
                              <span className="text-gray-900 font-medium text-base">{variant.globalNCAPRating}</span>
                            </div>
                          )}
                          
                          {variant?.airbags && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-base">Airbags</span>
                              <span className="text-gray-900 font-medium text-base">{variant.airbags}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    
                    {/* Expanded content */}
                    {expandedSpecs['safety'] && !showSkeleton && (
                      <div className="mt-4 space-y-4">
                        {/* Airbags Location - Only show if data exists */}
                        {variant?.airbagsLocation && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Airbags Location</span>
                            <span className="text-gray-900 font-medium text-base">{variant.airbagsLocation}</span>
                          </div>
                        )}
                        
                        {/* ADAS Level - Only show if data exists */}
                        {variant?.adasLevel && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">ADAS Level</span>
                            <span className="text-gray-900 font-medium text-base">{variant.adasLevel}</span>
                          </div>
                        )}
                        
                        {/* ADAS Features - Only show if data exists */}
                        {variant?.adasFeatures && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">ADAS Features</span>
                            <span className="text-gray-900 font-medium text-base">{variant.adasFeatures}</span>
                          </div>
                        )}
                        
                        {/* Reverse Camera - Only show if data exists */}
                        {variant?.reverseCamera && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Reverse Camera</span>
                            <span className="text-gray-900 font-medium text-base">{variant.reverseCamera}</span>
                          </div>
                        )}
                        
                        {/* Reverse Camera Guidelines - Only show if data exists */}
                        {variant?.reverseCameraGuidelines && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Reverse Camera Guidelines</span>
                            <span className="text-gray-900 font-medium text-base">{variant.reverseCameraGuidelines}</span>
                          </div>
                        )}
                        
                        {/* Tyre Pressure Monitor (TPMS) - Only show if data exists */}
                        {variant?.tyrePressureMonitor && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Tyre Pressure Monitor (TPMS)</span>
                            <span className="text-gray-900 font-medium text-base">{variant.tyrePressureMonitor}</span>
                          </div>
                        )}
                        
                        {/* Hill Hold Assist - Only show if data exists */}
                        {variant?.hillHoldAssist && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Hill Hold Assist</span>
                            <span className="text-gray-900 font-medium text-base">{variant.hillHoldAssist}</span>
                          </div>
                        )}
                        
                        {/* Hill Descent Control - Only show if data exists */}
                        {variant?.hillDescentControl && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Hill Descent Control</span>
                            <span className="text-gray-900 font-medium text-base">{variant.hillDescentControl}</span>
                          </div>
                        )}
                        
                        {/* Roll Over Mitigation - Only show if data exists */}
                        {variant?.rollOverMitigation && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Roll Over Mitigation</span>
                            <span className="text-gray-900 font-medium text-base">{variant.rollOverMitigation}</span>
                          </div>
                        )}
                        
                        {/* Parking Sensor - Only show if data exists */}
                        {variant?.parkingSensor && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Parking Sensor</span>
                            <span className="text-gray-900 font-medium text-base">{variant.parkingSensor}</span>
                          </div>
                        )}
                        
                        {/* Disc Brakes - Only show if data exists */}
                        {variant?.discBrakes && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Disc Brakes</span>
                            <span className="text-gray-900 font-medium text-base">{variant.discBrakes}</span>
                          </div>
                        )}
                        
                        {/* Electronic Stability Program - Only show if data exists */}
                        {variant?.electronicStabilityProgram && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Electronic Stability Program</span>
                            <span className="text-gray-900 font-medium text-base">{variant.electronicStabilityProgram}</span>
                          </div>
                        )}
                        
                        {/* ABS - Only show if data exists */}
                        {variant?.abs && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">ABS</span>
                            <span className="text-gray-900 font-medium text-base">{variant.abs}</span>
                          </div>
                        )}
                        
                        {/* EBD - Only show if data exists */}
                        {variant?.ebd && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">EBD</span>
                            <span className="text-gray-900 font-medium text-base">{variant.ebd}</span>
                          </div>
                        )}
                        
                        {/* Brake Assist (BA) - Only show if data exists */}
                        {variant?.brakeAssist && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Brake Assist (BA)</span>
                            <span className="text-gray-900 font-medium text-base">{variant.brakeAssist}</span>
                          </div>
                        )}
                        
                        {/* ISOFIX Mounts - Only show if data exists */}
                        {variant?.isofixMounts && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">ISOFIX Mounts</span>
                            <span className="text-gray-900 font-medium text-base">{variant.isofixMounts}</span>
                          </div>
                        )}
                        
                        {/* Seatbelt Warning - Only show if data exists */}
                        {variant?.seatbeltWarning && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Seatbelt Warning</span>
                            <span className="text-gray-900 font-medium text-base">{variant.seatbeltWarning}</span>
                          </div>
                        )}
                        
                        {/* Speed Alert System - Only show if data exists */}
                        {variant?.speedAlertSystem && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Speed Alert System</span>
                            <span className="text-gray-900 font-medium text-base">{variant.speedAlertSystem}</span>
                          </div>
                        )}
                        
                        {/* Speed Sensing Door Locks - Only show if data exists */}
                        {variant?.speedSensingDoorLocks && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Speed Sensing Door Locks</span>
                            <span className="text-gray-900 font-medium text-base">{variant.speedSensingDoorLocks}</span>
                          </div>
                        )}
                        
                        {/* Immobiliser - Only show if data exists */}
                        {variant?.immobiliser && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Immobiliser</span>
                            <span className="text-gray-900 font-medium text-base">{variant.immobiliser}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* View More/Less Button */}
                    <div className="mt-6 flex justify-center">
                      <button 
                        onClick={() => toggleSpecSection('safety')}
                        className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center space-x-1 transition-colors duration-200"
                      >
                        <span>{expandedSpecs['safety'] ? 'View less' : 'View more'}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedSpecs['safety'] ? 'rotate-270' : 'rotate-90'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Entertainment & Connectivity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 pb-4">
                    <h3 className="text-xl font-bold text-gray-900">Entertainment & Connectivity</h3>
                    <button 
                      onClick={() => toggleSpecSection('entertainment')}
                      className="p-1"
                    >
                      <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${expandedSpecs['entertainment'] ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="px-6 pb-6">
                    {/* Always visible specs */}
                    <div className="space-y-4">
                      {showSkeleton ? (
                        /* Skeleton loading */
                        <>
                          {[1, 2].map((index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div className="bg-gray-200 animate-pulse h-4 text-base rounded"></div>
                              <div className="bg-gray-200 animate-pulse h-4 w-1/4 rounded"></div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {/* Show first 2 specs always */}
                          {variant?.touchScreenInfotainment && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-base">Touch Screen Infotainment</span>
                              <span className="text-gray-900 font-medium text-base">{variant.touchScreenInfotainment}</span>
                            </div>
                          )}
                          
                          {variant?.androidAppleCarplay && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-base">Android & Apple CarPlay</span>
                              <span className="text-gray-900 font-medium text-base">{variant.androidAppleCarplay}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    
                    {/* Expanded content */}
                    {expandedSpecs['entertainment'] && !showSkeleton && (
                      <div className="mt-4 space-y-4">
                        
                        {/* Speakers - Only show if data exists */}
                        {variant?.speakers && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Speakers</span>
                            <span className="text-gray-900 font-medium text-base">{variant.speakers}</span>
                          </div>
                        )}
                        
                        {/* Tweeters - Only show if data exists */}
                        {variant?.tweeters && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Tweeters</span>
                            <span className="text-gray-900 font-medium text-base">{variant.tweeters}</span>
                          </div>
                        )}
                        
                        {/* Subwoofers - Only show if data exists */}
                        {variant?.subwoofers && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Subwoofers</span>
                            <span className="text-gray-900 font-medium text-base">{variant.subwoofers}</span>
                          </div>
                        )}
                        
                        {/* USB-C Charging Ports - Only show if data exists */}
                        {variant?.usbCChargingPorts && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">USB-C Charging Ports</span>
                            <span className="text-gray-900 font-medium text-base">{variant.usbCChargingPorts}</span>
                          </div>
                        )}
                        
                        {/* USB-A Charging Ports - Only show if data exists */}
                        {variant?.usbAChargingPorts && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">USB-A Charging Ports</span>
                            <span className="text-gray-900 font-medium text-base">{variant.usbAChargingPorts}</span>
                          </div>
                        )}
                        
                        {/* 12V Charging Ports - Only show if data exists */}
                        {variant?.twelvevChargingPorts && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">12V Charging Ports</span>
                            <span className="text-gray-900 font-medium text-base">{variant.twelvevChargingPorts}</span>
                          </div>
                        )}
                        
                        {/* Wireless Charging - Only show if data exists */}
                        {variant?.wirelessCharging && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Wireless Charging</span>
                            <span className="text-gray-900 font-medium text-base">{variant.wirelessCharging}</span>
                          </div>
                        )}
                        
                        {/* Connected Car Tech - Only show if data exists */}
                        {variant?.connectedCarTech && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Connected Car Tech</span>
                            <span className="text-gray-900 font-medium text-base">{variant.connectedCarTech}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* View More/Less Button */}
                    <div className="mt-6 flex justify-center">
                      <button 
                        onClick={() => toggleSpecSection('entertainment')}
                        className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center space-x-1 transition-colors duration-200"
                      >
                        <span>{expandedSpecs['entertainment'] ? 'View less' : 'View more'}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedSpecs['entertainment'] ? 'rotate-270' : 'rotate-90'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Engine & Transmission */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 pb-4">
                    <h3 className="text-xl font-bold text-gray-900">Engine & Transmission</h3>
                    <button 
                      onClick={() => toggleSpecSection('engine')}
                      className="p-1"
                    >
                      <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${expandedSpecs['engine'] ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="px-6 pb-6">
                    {/* Always visible specs */}
                    <div className="space-y-4">
                      {showSkeleton ? (
                        /* Skeleton loading */
                        <>
                          {[1, 2].map((index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div className="bg-gray-200 animate-pulse h-4 text-base rounded"></div>
                              <div className="bg-gray-200 animate-pulse h-4 w-1/4 rounded"></div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {/* Show first 2 specs always */}
                          {variant?.engineNamePage4 && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-base">Engine Name</span>
                              <span className="text-gray-900 font-medium text-base">{variant.engineNamePage4}</span>
                            </div>
                          )}
                          
                          {variant?.engineCapacity && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-base">Engine Capacity</span>
                              <span className="text-gray-900 font-medium text-base">{variant.engineCapacity}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    
                    {/* Expanded content */}
                    {expandedSpecs['engine'] && !showSkeleton && (
                      <div className="mt-4 space-y-4">
                        {/* Fuel - Only show if data exists */}
                        {variant?.fuel && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Fuel</span>
                            <span className="text-gray-900 font-medium text-base">{variant.fuel}</span>
                          </div>
                        )}
                        
                        {/* Transmission - Only show if data exists */}
                        {variant?.transmission && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Transmission</span>
                            <span className="text-gray-900 font-medium text-base">{variant.transmission}</span>
                          </div>
                        )}
                        
                        {/* No of Gears - Only show if data exists */}
                        {variant?.noOfGears && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">No of Gears</span>
                            <span className="text-gray-900 font-medium text-base">{variant.noOfGears}</span>
                          </div>
                        )}
                        
                        {/* Paddle Shifter - Only show if data exists */}
                        {variant?.paddleShifter && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Paddle Shifter</span>
                            <span className="text-gray-900 font-medium text-base">{variant.paddleShifter}</span>
                          </div>
                        )}
                        
                        {/* Max Power - Only show if data exists */}
                        {variant?.maxPower && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Max Power</span>
                            <span className="text-gray-900 font-medium text-base">{variant.maxPower}</span>
                          </div>
                        )}
                        
                        {/* Torque - Only show if data exists */}
                        {variant?.torque && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Torque</span>
                            <span className="text-gray-900 font-medium text-base">{variant.torque}</span>
                          </div>
                        )}
                        
                        {/* 0 to 100 Kmph Time - Only show if data exists */}
                        {variant?.zeroToHundredKmphTime && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">0 to 100 Kmph Time</span>
                            <span className="text-gray-900 font-medium text-base">{variant.zeroToHundredKmphTime}</span>
                          </div>
                        )}
                        
                        {/* Top Speed - Only show if data exists */}
                        {variant?.topSpeed && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Top Speed</span>
                            <span className="text-gray-900 font-medium text-base">{variant.topSpeed}</span>
                          </div>
                        )}
                        
                        {/* EV Battery Capacity - Only show if data exists */}
                        {variant?.evBatteryCapacity && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">EV Battery Capacity</span>
                            <span className="text-gray-900 font-medium text-base">{variant.evBatteryCapacity}</span>
                          </div>
                        )}
                        
                        {/* Hybrid Battery Capacity - Only show if data exists */}
                        {variant?.hybridBatteryCapacity && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Hybrid Battery Capacity</span>
                            <span className="text-gray-900 font-medium text-base">{variant.hybridBatteryCapacity}</span>
                          </div>
                        )}
                        
                        {/* Battery Type - Only show if data exists */}
                        {variant?.batteryType && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Battery Type</span>
                            <span className="text-gray-900 font-medium text-base">{variant.batteryType}</span>
                          </div>
                        )}
                        
                        {/* Electric Motor Placement - Only show if data exists */}
                        {variant?.electricMotorPlacement && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Electric Motor Placement</span>
                            <span className="text-gray-900 font-medium text-base">{variant.electricMotorPlacement}</span>
                          </div>
                        )}
                        
                        {/* EV Range - Only show if data exists */}
                        {variant?.evRange && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">EV Range</span>
                            <span className="text-gray-900 font-medium text-base">{variant.evRange}</span>
                          </div>
                        )}
                        
                        {/* EV Charging Time - Only show if data exists */}
                        {variant?.evChargingTime && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">EV Charging Time</span>
                            <span className="text-gray-900 font-medium text-base">{variant.evChargingTime}</span>
                          </div>
                        )}
                        
                        {/* Max Electric Motor Power - Only show if data exists */}
                        {variant?.maxElectricMotorPower && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Max Electric Motor Power</span>
                            <span className="text-gray-900 font-medium text-base">{variant.maxElectricMotorPower}</span>
                          </div>
                        )}
                        
                        {/* Turbo Charged - Only show if data exists */}
                        {variant?.turboCharged && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Turbo Charged</span>
                            <span className="text-gray-900 font-medium text-base">{variant.turboCharged}</span>
                          </div>
                        )}
                        
                        {/* Hybrid Type - Only show if data exists */}
                        {variant?.hybridType && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Hybrid Type</span>
                            <span className="text-gray-900 font-medium text-base">{variant.hybridType}</span>
                          </div>
                        )}
                        
                        {/* Drive Train - Only show if data exists */}
                        {variant?.driveTrain && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Drive Train</span>
                            <span className="text-gray-900 font-medium text-base">{variant.driveTrain}</span>
                          </div>
                        )}
                        
                        {/* Driving Modes - Only show if data exists */}
                        {variant?.drivingModes && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Driving Modes</span>
                            <span className="text-gray-900 font-medium text-base">{variant.drivingModes}</span>
                          </div>
                        )}
                        
                        {/* Off Road Modes - Only show if data exists */}
                        {variant?.offRoadModes && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Off Road Modes</span>
                            <span className="text-gray-900 font-medium text-base">{variant.offRoadModes}</span>
                          </div>
                        )}
                        
                        {/* Differential Lock - Only show if data exists */}
                        {variant?.differentialLock && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Differential Lock</span>
                            <span className="text-gray-900 font-medium text-base">{variant.differentialLock}</span>
                          </div>
                        )}
                        
                        {/* Limited Slip Differential - Only show if data exists */}
                        {variant?.limitedSlipDifferential && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Limited Slip Differential</span>
                            <span className="text-gray-900 font-medium text-base">{variant.limitedSlipDifferential}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* View More/Less Button */}
                    <div className="mt-6 flex justify-center">
                      <button 
                        onClick={() => toggleSpecSection('engine')}
                        className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center space-x-1 transition-colors duration-200"
                      >
                        <span>{expandedSpecs['engine'] ? 'View less' : 'View more'}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedSpecs['engine'] ? 'rotate-270' : 'rotate-90'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Seating Comfort */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 pb-4">
                    <h3 className="text-xl font-bold text-gray-900">Seating Comfort</h3>
                    <button 
                      onClick={() => toggleSpecSection('seating')}
                      className="p-1"
                    >
                      <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${expandedSpecs['seating'] ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="px-6 pb-6">
                    {/* Always visible specs */}
                    <div className="space-y-4">
                      {showSkeleton ? (
                        /* Skeleton loading */
                        <>
                          {[1, 2].map((index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div className="bg-gray-200 animate-pulse h-4 text-base rounded"></div>
                              <div className="bg-gray-200 animate-pulse h-4 w-1/4 rounded"></div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {/* Show first 2 specs always */}
                          {variant?.seatUpholstery && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-base">Seat Upholstery</span>
                              <span className="text-gray-900 font-medium text-base">{variant.seatUpholstery}</span>
                            </div>
                          )}
                          
                          {variant?.seatsAdjustment && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-base">Seats Adjustment</span>
                              <span className="text-gray-900 font-medium text-base">{variant.seatsAdjustment}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    
                    {/* Expanded content */}
                    {expandedSpecs['seating'] && !showSkeleton && (
                      <div className="mt-4 space-y-4">
                        {variant?.driverSeatAdjustment && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Driver Seat Adjustment</span>
                            <span className="text-gray-900 font-medium text-base">{variant.driverSeatAdjustment}</span>
                          </div>
                        )}
                        
                        {variant?.passengerSeatAdjustment && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Passenger Seat Adjustment</span>
                            <span className="text-gray-900 font-medium text-base">{variant.passengerSeatAdjustment}</span>
                          </div>
                        )}
                        
                        {variant?.rearSeatAdjustment && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Rear Seat Adjustment</span>
                            <span className="text-gray-900 font-medium text-base">{variant.rearSeatAdjustment}</span>
                          </div>
                        )}
                        
                        {variant?.welcomeSeats && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Welcome Seats</span>
                            <span className="text-gray-900 font-medium text-base">{variant.welcomeSeats}</span>
                          </div>
                        )}
                        
                        {variant?.memorySeats && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Memory Seats</span>
                            <span className="text-gray-900 font-medium text-base">{variant.memorySeats}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* View More/Less Button */}
                    <div className="mt-6 flex justify-center">
                      <button 
                        onClick={() => toggleSpecSection('seating')}
                        className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center space-x-1 transition-colors duration-200"
                      >
                        <span>{expandedSpecs['seating'] ? 'View less' : 'View more'}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedSpecs['seating'] ? 'rotate-270' : 'rotate-90'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Exteriors */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 pb-4">
                    <h3 className="text-xl font-bold text-gray-900">Exteriors</h3>
                    <button 
                      onClick={() => toggleSpecSection('exteriors')}
                      className="p-1"
                    >
                      <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${expandedSpecs['exteriors'] ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="px-6 pb-6">
                    {/* Always visible specs */}
                    <div className="space-y-4">
                      {showSkeleton ? (
                        /* Skeleton loading */
                        <>
                          {[1, 2].map((index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div className="bg-gray-200 animate-pulse h-4 text-base rounded"></div>
                              <div className="bg-gray-200 animate-pulse h-4 w-1/4 rounded"></div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {/* Show first 2 specs always */}
                          {variant?.headLights && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-base">Head Lights</span>
                              <span className="text-gray-900 font-medium text-base">{variant.headLights}</span>
                            </div>
                          )}
                          
                          {variant?.tailLight && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-base">Tail Light</span>
                              <span className="text-gray-900 font-medium text-base">{variant.tailLight}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    
                    {/* Expanded content */}
                    {expandedSpecs['exteriors'] && !showSkeleton && (
                      <div className="mt-4 space-y-4">
                        {variant?.frontFogLights && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Front Fog Lights</span>
                            <span className="text-gray-900 font-medium text-base">{variant.frontFogLights}</span>
                          </div>
                        )}
                        
                        {variant?.roofRails && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Roof Rails</span>
                            <span className="text-gray-900 font-medium text-base">{variant.roofRails}</span>
                          </div>
                        )}
                        
                        {variant?.radioAntenna && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Radio Antenna</span>
                            <span className="text-gray-900 font-medium text-base">{variant.radioAntenna}</span>
                          </div>
                        )}
                        
                        {variant?.outsideRearViewMirror && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Outside Rear View Mirror</span>
                            <span className="text-gray-900 font-medium text-base">{variant.outsideRearViewMirror}</span>
                          </div>
                        )}
                        
                        {variant?.daytimeRunningLights && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Daytime Running Lights</span>
                            <span className="text-gray-900 font-medium text-base">{variant.daytimeRunningLights}</span>
                          </div>
                        )}
                        
                        {variant?.sideIndicator && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Side Indicator</span>
                            <span className="text-gray-900 font-medium text-base">{variant.sideIndicator}</span>
                          </div>
                        )}
                        
                        {variant?.rearWindshieldWiper && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Rear Windshield Wiper</span>
                            <span className="text-gray-900 font-medium text-base">{variant.rearWindshieldWiper}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* View More/Less Button */}
                    <div className="mt-6 flex justify-center">
                      <button 
                        onClick={() => toggleSpecSection('exteriors')}
                        className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center space-x-1 transition-colors duration-200"
                      >
                        <span>{expandedSpecs['exteriors'] ? 'View less' : 'View more'}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedSpecs['exteriors'] ? 'rotate-270' : 'rotate-90'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Dimensions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 pb-4">
                    <h3 className="text-xl font-bold text-gray-900">Dimensions</h3>
                    <button 
                      onClick={() => toggleSpecSection('dimensions')}
                      className="p-1"
                    >
                      <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${expandedSpecs['dimensions'] ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="px-6 pb-6">
                    {/* Always visible specs */}
                    <div className="space-y-4">
                      {showSkeleton ? (
                        /* Skeleton loading */
                        <>
                          {[1, 2].map((index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div className="bg-gray-200 animate-pulse h-4 text-base rounded"></div>
                              <div className="bg-gray-200 animate-pulse h-4 w-1/4 rounded"></div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {/* Show first 2 specs always */}
                          {variant?.groundClearance && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-base">Ground Clearance</span>
                              <span className="text-gray-900 font-medium text-base">{variant.groundClearance}</span>
                            </div>
                          )}
                          
                          {variant?.length && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-base">Length</span>
                              <span className="text-gray-900 font-medium text-base">{variant.length}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    
                    {/* Expanded content */}
                    {expandedSpecs['dimensions'] && !showSkeleton && (
                      <div className="mt-4 space-y-4">
                        {variant?.width && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Width</span>
                            <span className="text-gray-900 font-medium text-base">{variant.width}</span>
                          </div>
                        )}
                        
                        {variant?.height && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Height</span>
                            <span className="text-gray-900 font-medium text-base">{variant.height}</span>
                          </div>
                        )}
                        
                        {variant?.wheelbase && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Wheelbase</span>
                            <span className="text-gray-900 font-medium text-base">{variant.wheelbase}</span>
                          </div>
                        )}
                        
                        {variant?.turningRadius && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Turning Radius</span>
                            <span className="text-gray-900 font-medium text-base">{variant.turningRadius}</span>
                          </div>
                        )}
                        
                        {variant?.kerbWeight && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Kerb Weight</span>
                            <span className="text-gray-900 font-medium text-base">{variant.kerbWeight}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* View More/Less Button */}
                    <div className="mt-6 flex justify-center">
                      <button 
                        onClick={() => toggleSpecSection('dimensions')}
                        className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center space-x-1 transition-colors duration-200"
                      >
                        <span>{expandedSpecs['dimensions'] ? 'View less' : 'View more'}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedSpecs['dimensions'] ? 'rotate-270' : 'rotate-90'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tyre & Suspension */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 pb-4">
                    <h3 className="text-xl font-bold text-gray-900">Tyre & Suspension</h3>
                    <button 
                      onClick={() => toggleSpecSection('tyre')}
                      className="p-1"
                    >
                      <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${expandedSpecs['tyre'] ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="px-6 pb-6">
                    {/* Always visible specs */}
                    <div className="space-y-4">
                      {showSkeleton ? (
                        /* Skeleton loading */
                        <>
                          {[1, 2].map((index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div className="bg-gray-200 animate-pulse h-4 text-base rounded"></div>
                              <div className="bg-gray-200 animate-pulse h-4 w-1/4 rounded"></div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {/* Show first 2 specs always */}
                          {variant?.frontTyreProfile && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-base">Front Tyre Profile</span>
                              <span className="text-gray-900 font-medium text-base">{variant.frontTyreProfile}</span>
                            </div>
                          )}
                          
                          {variant?.rearTyreProfile && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-base">Rear Tyre Profile</span>
                              <span className="text-gray-900 font-medium text-base">{variant.rearTyreProfile}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    
                    {/* Expanded content */}
                    {expandedSpecs['tyre'] && !showSkeleton && (
                      <div className="mt-4 space-y-4">
                        {variant?.spareTyreProfile && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Spare Tyre Profile</span>
                            <span className="text-gray-900 font-medium text-base">{variant.spareTyreProfile}</span>
                          </div>
                        )}
                        
                        {variant?.spareWheelType && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Spare Wheel Type</span>
                            <span className="text-gray-900 font-medium text-base">{variant.spareWheelType}</span>
                          </div>
                        )}
                        
                        {variant?.frontSuspension && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Front Suspension</span>
                            <span className="text-gray-900 font-medium text-base">{variant.frontSuspension}</span>
                          </div>
                        )}
                        
                        {variant?.rearSuspension && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Rear Suspension</span>
                            <span className="text-gray-900 font-medium text-base">{variant.rearSuspension}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* View More/Less Button */}
                    <div className="mt-6 flex justify-center">
                      <button 
                        onClick={() => toggleSpecSection('tyre')}
                        className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center space-x-1 transition-colors duration-200"
                      >
                        <span>{expandedSpecs['tyre'] ? 'View less' : 'View more'}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedSpecs['tyre'] ? 'rotate-270' : 'rotate-90'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Storage */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 pb-4">
                    <h3 className="text-xl font-bold text-gray-900">Storage</h3>
                    <button 
                      onClick={() => toggleSpecSection('storage')}
                      className="p-1"
                    >
                      <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${expandedSpecs['storage'] ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="px-6 pb-6">
                    {/* Always visible specs */}
                    <div className="space-y-4">
                      {showSkeleton ? (
                        /* Skeleton loading */
                        <>
                          {[1, 2].map((index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div className="bg-gray-200 animate-pulse h-4 text-base rounded"></div>
                              <div className="bg-gray-200 animate-pulse h-4 w-1/4 rounded"></div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {/* Show first 2 specs always */}
                          {variant?.cupholders && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-base">Cupholders</span>
                              <span className="text-gray-900 font-medium text-base">{variant.cupholders}</span>
                            </div>
                          )}
                          
                          {variant?.fuelTankCapacity && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-base">Fuel Tank Capacity</span>
                              <span className="text-gray-900 font-medium text-base">{variant.fuelTankCapacity}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    
                    {/* Expanded content */}
                    {expandedSpecs['storage'] && !showSkeleton && (
                      <div className="mt-4 space-y-4">
                        {variant?.bootSpace && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Boot Space</span>
                            <span className="text-gray-900 font-medium text-base">{variant.bootSpace}</span>
                          </div>
                        )}
                        
                        {variant?.bootSpaceAfterFoldingRearRowSeats && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-base">Boot Space After Folding Rear Row Seats</span>
                            <span className="text-gray-900 font-medium text-base">{variant.bootSpaceAfterFoldingRearRowSeats}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* View More/Less Button */}
                    <div className="mt-6 flex justify-center">
                      <button 
                        onClick={() => toggleSpecSection('storage')}
                        className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center space-x-1 transition-colors duration-200"
                      >
                        <span>{expandedSpecs['storage'] ? 'View less' : 'View more'}</span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${expandedSpecs['storage'] ? 'rotate-270' : 'rotate-90'}`} />
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
              <h2 className="text-2xl font-bold text-gray-900">More {displayBrandName} {displayModelName} {variantName} Variants</h2>
              
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

              {/* Variant Cards - Dynamic */}
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading variants...</p>
                  </div>
                ) : filteredVariants.length > 0 ? (
                  filteredVariants.map((variantItem) => (
                    <div 
                      key={variantItem.id} 
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                      onClick={() => {
                        const brandSlug = displayBrandName?.toLowerCase().replace(/\s+/g, '-')
                        const modelSlug = displayModelName?.toLowerCase().replace(/\s+/g, '-')
                        const variantSlug = variantItem.name.toLowerCase().replace(/\s+/g, '-')
                        router.push(`/${brandSlug}-cars/${modelSlug}/${variantSlug}`)
                      }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-red-600 mb-1">{variantItem.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{variantItem.fuel}</span>
                            <span>{variantItem.transmission}</span>
                            <span>{variantItem.power}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Ex-Showroom</p>
                        <p className="text-xl font-bold text-gray-900">₹ {variantItem.price.toFixed(2)} Lakhs</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Key Features:</p>
                      <p className="text-sm text-gray-600 line-clamp-2 overflow-hidden">
                        {variantItem.features}
                      </p>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button 
                        className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          const brandSlug = displayBrandName?.toLowerCase().replace(/\s+/g, '-')
                          const modelSlug = displayModelName?.toLowerCase().replace(/\s+/g, '-')
                          const variantSlug = variantItem.name.toLowerCase().replace(/\s+/g, '-')
                          router.push(`/${brandSlug}-cars/${modelSlug}/${variantSlug}`)
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
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No variants found for the selected filter.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </PageSection>

        {/* Section 5: Variant Summary, AD Banner, Engine & Mileage */}
        <PageSection background="white" maxWidth="7xl">
          <div className="space-y-8">
            {/* Variant Summary Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">{displayBrandName} {displayModelName} {variantName} Summary</h2>
              
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <h3 className="text-lg font-bold text-gray-900">Description</h3>
                  </div>
                  {variant?.description ? (
                    <ul className="space-y-2">
                      {parseBulletPoints(variant.description).map((point: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      The {displayBrandName} {displayModelName} is a {currentVariantData.fuelType} {currentVariantData.transmission.toLowerCase()} variant that belongs to the premium hatchback segment. It offers excellent value for money with modern features and was launched in {currentVariantData.launchYear}.
                      {showSummaryDescription && (
                        <span> The vehicle offers excellent value for money with its efficient engine, modern features, and reliable performance. It's designed for urban commuting with a focus on fuel efficiency and ease of driving.</span>
                      )}
                    </p>
                  )}
                  {!variant?.description && (
                    <button 
                      onClick={() => setShowSummaryDescription(!showSummaryDescription)}
                      className="text-red-500 hover:text-red-600 text-sm font-medium"
                    >
                      {showSummaryDescription ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                </div>

                {/* Exterior Design */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <h3 className="text-lg font-bold text-gray-900">Exterior Design</h3>
                  </div>
                  {variant?.exteriorDesign ? (
                    <ul className="space-y-2">
                      {parseBulletPoints(variant.exteriorDesign).map((point: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      The {displayBrandName} {displayModelName} comes with a modern and stylish exterior design. The front features sleek headlamps with integrated DRLs and a bold grille design that gives it a distinctive appearance.
                      {showSummaryExterior && (
                        <span> The side profile features clean lines with subtle character lines running along the doors. The rear design includes wraparound tail lamps and a compact boot lid.</span>
                      )}
                    </p>
                  )}
                  {!variant?.exteriorDesign && (
                    <button 
                      onClick={() => setShowSummaryExterior(!showSummaryExterior)}
                      className="text-red-500 hover:text-red-600 text-sm font-medium"
                    >
                      {showSummaryExterior ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                </div>

                {/* Comfort & Convenience */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <h3 className="text-lg font-bold text-gray-900">Comfort & Convenience</h3>
                  </div>
                  {variant?.comfortConvenience ? (
                    <ul className="space-y-2">
                      {parseBulletPoints(variant.comfortConvenience).map((point: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      The interior features a well-designed dashboard with premium materials. It comes equipped with a touchscreen infotainment system, automatic climate control, and various comfort features for an enhanced driving experience.
                      {showSummaryComfort && (
                        <span> Additional comfort features include air conditioning, power windows, central locking, and comfortable fabric upholstery. The cabin offers adequate storage spaces including door pockets, glove compartment, and cup holders.</span>
                      )}
                    </p>
                  )}
                  {!variant?.comfortConvenience && (
                    <button 
                      onClick={() => setShowSummaryComfort(!showSummaryComfort)}
                      className="text-red-500 hover:text-red-600 text-sm font-medium"
                    >
                      {showSummaryComfort ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* AD Banner */}
            <div className="bg-gray-300 rounded-lg py-20 text-center">
              <h2 className="text-3xl font-bold text-gray-600">AD Banner</h2>
            </div>

            {/* Engine Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">{displayBrandName} {displayModelName} {variantName} Engine</h2>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Engine Header - Always Visible */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {variant?.engineName || currentVariantData.engine}
                      </h3>
                    </div>
                    <button 
                      onClick={() => setExpandedEngine(!expandedEngine)}
                      className="text-red-500 hover:text-red-600 font-medium text-sm transition-colors"
                    >
                      {expandedEngine ? 'Show Less' : 'Read More'}
                    </button>
                  </div>
                  
                  {/* Collapsed Preview */}
                  {!expandedEngine && variant?.engineSummary && (
                    <ul className="space-y-1 mt-3">
                      {parseBulletPoints(variant.engineSummary).slice(0, 1).map((point: string, idx: number) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span className="text-gray-600 text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {!expandedEngine && !variant?.engineSummary && (
                    <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                      Suitable for both city driving and highway cruising. The {variant?.engineName || currentVariantData.engine} engine offers excellent fuel efficiency with smooth acceleration.
                    </p>
                  )}
                </div>

                {/* Expanded Content */}
                {expandedEngine && (
                  <div className="px-6 pb-6">
                    {/* Backend engine summary with bullet points */}
                    {variant?.engineSummary ? (
                      <>
                        <ul className="space-y-2 mb-6">
                          {parseBulletPoints(variant.engineSummary).map((point: string, idx: number) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-gray-400 mt-1">•</span>
                              <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {/* Engine Specs from backend */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          {/* Transmission Label */}
                          <h4 className="font-bold text-gray-900 mb-3 text-center">
                            {(() => {
                              const trans = variant?.engineTransmission || variant?.transmission || currentVariantData.transmission
                              return trans.toLowerCase() === 'manual' ? 'Manual' : trans.toUpperCase()
                            })()}
                          </h4>
                          
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Power:</p>
                              <p className="font-medium text-gray-900">{variant?.enginePower || currentVariantData.power}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Torque:</p>
                              <p className="font-medium text-gray-900">{variant?.engineTorque || currentVariantData.torque}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Transmission:</p>
                              <p className="font-medium text-gray-900">{variant?.engineSpeed || 'N/A'}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-700 text-sm leading-relaxed mb-6">
                          Suitable for both city driving and highway cruising. The {variant?.engineName || currentVariantData.engine} engine offers excellent fuel efficiency with smooth acceleration. It provides a perfect balance between performance and economy, making it ideal for daily commuting and long-distance travel.
                        </p>
                        
                        {/* Engine Specs */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-bold text-gray-900 mb-3 text-center">
                            {(() => {
                              const trans = variant?.engineTransmission || variant?.transmission || currentVariantData.transmission
                              return trans.toLowerCase() === 'manual' ? 'Manual' : trans.toUpperCase()
                            })()}
                          </h4>
                          
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Power:</p>
                              <p className="font-medium text-gray-900">{variant?.enginePower || currentVariantData.power}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Torque:</p>
                              <p className="font-medium text-gray-900">{variant?.engineTorque || currentVariantData.torque}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Transmission:</p>
                              <p className="font-medium text-gray-900">{variant?.engineSpeed || 'N/A'}</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mileage Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">{displayBrandName} {displayModelName} {variantName} Mileage</h2>
              
              <div className="flex justify-center">
                <div className="w-64 bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-300">
                  {/* Engine Header */}
                  <div className="text-center mb-4">
                    <h3 className="text-red-500 font-bold text-sm mb-1">Engine & Transmission</h3>
                    <h4 className="text-red-500 font-bold text-base mb-1">
                      {variant?.mileageEngineName || variant?.engineName || currentVariantData.engine}
                    </h4>
                  </div>

                  {/* Mileage Details */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">Company Claimed</span>
                      <span className="text-gray-900 font-bold text-sm">
                        {variant?.mileageCompanyClaimed || currentVariantData.mileage} Kmpl
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">City Real World</span>
                      <span className="text-gray-900 font-bold text-sm">
                        {variant?.mileageCityRealWorld || (currentVariantData.mileage * 0.85).toFixed(1)} Kmpl
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 text-sm">Highway Real World</span>
                      <span className="text-gray-900 font-bold text-sm">
                        {variant?.mileageHighwayRealWorld || (currentVariantData.mileage * 1.1).toFixed(1)} Kmpl
                      </span>
                    </div>
                  </div>
                </div>
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
