'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Star, Heart, Share2, ChevronRight, ChevronLeft, ChevronDown, ArrowRight, Calendar, Fuel, Users, Settings, IndianRupee, MapPin, Phone, MessageCircle, Zap, Shield, Award, TrendingUp, Clock, CheckCircle, AlertCircle, Info, X, Plus, Minus, Eye, ExternalLink, Play, ThumbsUp } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PageSection from '@/components/common/PageSection'
import Footer from '@/components/Footer'
import { truncateCarName } from '@/lib/text-utils'

interface ModelData {
  id: string
  slug: string
  brand: string
  name: string
  heroImage: string
  gallery: string[]
  rating: number
  reviewCount: number
  seoDescription: string
  startingPrice: number
  endingPrice: number
  variants: Array<{
    id: string
    name: string
    price: number
    fuelType: string
    transmission: string
    keyFeatures: string[]
  }>
  cities: Array<{
    name: string
    onRoadPrice: number
  }>
  emi: {
    starting: number
    tenure: number
  }
  keySpecs: {
    engine: string
    groundClearance: string
    power: string
    torque: string
    seatingCapacity: number
    safetyRating: string
  }
  keyFeatureImages?: Array<{ url: string; caption: string }>
  spaceComfortImages?: Array<{ url: string; caption: string }>
  storageConvenienceImages?: Array<{ url: string; caption: string }>
  colorImages?: Array<{ url: string; caption: string }>
  highlights?: {
    keyFeatures: Array<{ title: string; image: string; caption?: string }>
    spaceComfort: Array<{ title: string; image: string; caption?: string }>
    storageConvenience: Array<{ title: string; image: string; caption?: string }>
  }
  colors: Array<{
    name: string
    image: string
    code: string
  }>
  pros: string[] | string
  cons: string[] | string
  summary: string
  description?: string
  exteriorDesign?: string
  comfortConvenience?: string
  engineSummaries?: Array<{
    title: string
    summary: string
    transmission: string
    power: string
    torque: string
    speed: string
  }>
  mileageData?: Array<{
    engineName: string
    companyClaimed: string
    cityRealWorld: string
    highwayRealWorld: string
  }>
  faqs?: Array<{
    question: string
    answer: string
  }>
  engineHighlights: string
  mileage: Array<{
    condition: string
    value: number
    unit: string
  }>
}

interface CarModelPageProps {
  model: ModelData
}

// FAQ Data
const faqData = [
  {
    question: "What is the mileage of Maruti Suzuki Swift?",
    answer: "The Maruti Suzuki Swift delivers an impressive fuel efficiency of 23.2 kmpl (combined), with city mileage of 21.2 kmpl and highway mileage of 25.8 kmpl."
  },
  {
    question: "What is the price range of Swift variants?",
    answer: "The Maruti Suzuki Swift is available in multiple variants with prices ranging from ₹5.99 lakh to ₹8.99 lakh (ex-showroom)."
  },
  {
    question: "What are the key safety features in Swift?",
    answer: "The Swift comes with dual airbags, ABS with EBD, reverse parking sensors, central locking, and a 4-star safety rating from Global NCAP."
  },
  {
    question: "What is the engine specification of Swift?",
    answer: "The Swift is powered by a 1.2L K-Series petrol engine that produces 83 PS of power and 113 Nm of torque, available with both manual and AMT transmission options."
  },
  {
    question: "What is the boot space and ground clearance?",
    answer: "The Swift offers 268 liters of boot space and has a ground clearance of 163mm, making it suitable for Indian road conditions."
  }
]

// Similar Cars Data
const similarCars = [
  {
    id: 1,
    brand: 'Hyundai',
    name: 'i20',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
    startingPrice: 699000,
    endingPrice: 1199000,
    fuelType: 'Petrol',
    transmission: 'Manual/CVT',
    mileage: '20.4 kmpl'
  },
  {
    id: 2,
    brand: 'Tata',
    name: 'Altroz',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
    startingPrice: 599000,
    endingPrice: 999000,
    fuelType: 'Petrol',
    transmission: 'Manual/AMT',
    mileage: '19.5 kmpl'
  },
  {
    id: 3,
    brand: 'Honda',
    name: 'Jazz',
    image: 'https://images.unsplash.com/photo-1494976688153-d4d4c0b0f5c8?w=400&h=300&fit=crop',
    startingPrice: 799000,
    endingPrice: 999000,
    fuelType: 'Petrol',
    transmission: 'Manual/CVT',
    mileage: '18.2 kmpl'
  }
]

// News Articles Data
const newsArticles = [
  {
    id: 1,
    title: 'Maruti Suzuki Swift 2024: New Features and Updates',
    excerpt: 'The latest Swift gets updated infotainment system and new color options for 2024 model year.',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=250&fit=crop',
    publishDate: '2024-03-15',
    readTime: '3 min read'
  },
  {
    id: 2,
    title: 'Swift vs i20: Which Premium Hatchback to Choose?',
    excerpt: 'Detailed comparison between two popular premium hatchbacks in the Indian market.',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop',
    publishDate: '2024-03-10',
    readTime: '5 min read'
  },
  {
    id: 3,
    title: 'Top 5 Fuel Efficient Cars Under 10 Lakhs',
    excerpt: 'Swift makes it to the list of most fuel-efficient cars in its segment.',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop',
    publishDate: '2024-03-08',
    readTime: '4 min read'
  }
]

// User Reviews Data
const userReviews = [
  {
    id: 1,
    userName: 'Rajesh Kumar',
    rating: 4.5,
    reviewText: 'Excellent car for city driving. Great fuel economy and reliable performance. The AMT variant is perfect for traffic conditions.',
    location: 'Delhi',
    date: '2024-03-12',
    variant: 'VXI AMT',
    verified: true
  },
  {
    id: 2,
    userName: 'Priya Sharma',
    rating: 4.0,
    reviewText: 'Good build quality and features. The infotainment system is user-friendly. Only complaint is the rear seat space.',
    location: 'Mumbai',
    date: '2024-03-10',
    variant: 'ZXI',
    verified: true
  },
  {
    id: 3,
    userName: 'Amit Singh',
    rating: 4.2,
    reviewText: 'Value for money car with good after-sales service. The K-Series engine is proven and reliable.',
    location: 'Bangalore',
    date: '2024-03-08',
    variant: 'VXI',
    verified: false
  }
]

// Navigation sections for sticky ribbon
const navigationSections = [
  { id: 'hero', label: 'Overview' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'variants', label: 'Variants' },
  { id: 'specifications', label: 'Key Specs' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'colors', label: 'Colors' },
  { id: 'pros-cons', label: 'Pros & Cons' },
  { id: 'engine', label: 'Engine' },
  { id: 'mileage', label: 'Mileage' },
  { id: 'similar-cars', label: 'Similar Cars' },
  { id: 'news', label: 'News' },
  { id: 'videos', label: 'Videos' },
  { id: 'faq', label: 'FAQ' },
  { id: 'reviews', label: 'Reviews' }
]

export default function CarModelPage({ model }: CarModelPageProps) {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedMileageEngine, setSelectedMileageEngine] = useState(0)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showAllPros, setShowAllPros] = useState(false)
  const [showAllCons, setShowAllCons] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0)
  const [selectedKeyFeatureIndex, setSelectedKeyFeatureIndex] = useState(0)
  const [selectedSpaceComfortIndex, setSelectedSpaceComfortIndex] = useState(0)
  const [selectedStorageIndex, setSelectedStorageIndex] = useState(0)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [showAllFAQs, setShowAllFAQs] = useState(false)
  const [showAllSimilarCars, setShowAllSimilarCars] = useState(false)
  const [showAllCities, setShowAllCities] = useState(false)
  const [selectedCity, setSelectedCity] = useState(() => {
    // Try to get city from localStorage first
    if (typeof window !== 'undefined') {
      const savedCity = localStorage.getItem('selectedCity')
      if (savedCity) return savedCity
    }
    return model?.cities?.[0]?.name || 'Delhi'
  })
  const [selectedVariant, setSelectedVariant] = useState(model?.variants?.[0]?.name || 'Base Variant')
  const [modelVariants, setModelVariants] = useState<any[]>([])
  const [loadingVariants, setLoadingVariants] = useState(true)
  const mileageScrollRef = useRef<HTMLDivElement>(null)
  
  // Listen for city changes from localStorage (when user returns from location page)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedCity = localStorage.getItem('selectedCity')
      if (savedCity) {
        setSelectedCity(savedCity)
      }
    }
    
    // Listen for storage events
    window.addEventListener('storage', handleStorageChange)
    
    // Also check on mount and when page becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleStorageChange()
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Check immediately on mount
    handleStorageChange()
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // Fetch variants for this model
  useEffect(() => {
    const fetchVariants = async () => {
      if (!model?.id) return
      
      try {
        setLoadingVariants(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}/api/variants?modelId=${model.id}`)
        if (response.ok) {
          const variants = await response.json()
          setModelVariants(variants)
        } else {
          console.error('Failed to fetch variants:', response.statusText)
          setModelVariants([])
        }
      } catch (error) {
        console.error('Error fetching variants:', error)
        setModelVariants([])
      } finally {
        setLoadingVariants(false)
      }
    }

    fetchVariants()
  }, [model?.id])

  // Function to handle tab switching and reset scroll position
  const handleHighlightTabChange = (tab: 'keyFeatures' | 'spaceComfort' | 'storageConvenience') => {
    setActiveHighlightTab(tab)
    // Reset scroll position to start from first image
    const scrollContainer = document.querySelector('.highlights-scroll-container')
    if (scrollContainer) {
      scrollContainer.scrollLeft = 0
    }
  }

  // Mileage scroll functions
  const scrollMileageLeft = () => {
    if (mileageScrollRef.current) {
      mileageScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollMileageRight = () => {
    if (mileageScrollRef.current) {
      mileageScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  // Function to truncate caption text
  const truncateCaption = (text: string, maxLength: number = 20) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  // Function to parse bullet points from backend string
  const parseBulletPoints = (text: string | string[]): string[] => {
    if (Array.isArray(text)) return text
    if (!text) return []
    // Split by newlines and filter out empty lines, remove bullet points
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => line.replace(/^[•\-\*]\s*/, '')) // Remove bullet point characters
  }
  const [showModelPriceText, setShowModelPriceText] = useState(false)
  const [selectedComparisonCars, setSelectedComparisonCars] = useState<string[]>([])
  const [feedbackForm, setFeedbackForm] = useState({ name: '', email: '', message: '' })
  const [showSummaryDescription, setShowSummaryDescription] = useState(false)
  const [showSummaryExterior, setShowSummaryExterior] = useState(false)
  const [showSummaryComfort, setShowSummaryComfort] = useState(false)
  const [expandedEngine, setExpandedEngine] = useState<string | null>(null)
  const [activeHighlightTab, setActiveHighlightTab] = useState<'keyFeatures' | 'spaceComfort' | 'storageConvenience'>('keyFeatures')
  const [showVariantDropdown, setShowVariantDropdown] = useState(false)
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [selectedColor, setSelectedColor] = useState<string>('')

  // Initialize selectedColor with first color when model loads
  useEffect(() => {
    if (model?.colorImages && model.colorImages.length > 0 && !selectedColor) {
      setSelectedColor(model.colorImages[0].caption || '')
    }
  }, [model?.colorImages, selectedColor])
  
  const variantDropdownRef = useRef<HTMLDivElement>(null)
  const cityDropdownRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLDivElement>(null)

  // Transform backend variant data to match component structure
  const allVariants = modelVariants.map(variant => ({
    id: variant.id,
    name: variant.name,
    price: variant.price ? (variant.price / 100000) : 0, // Convert to lakhs
    fuel: (variant as any).fuel || variant.fuelType || "Petrol", // Use fuel from Page 4 Engine & Transmission specifications
    transmission: (variant as any).transmission || "Manual", // Use transmission from Page 4 specifications
    power: (variant as any).maxPower || variant.enginePower || "N/A", // Use maxPower from Page 4 specifications
    features: variant.keyFeatures || variant.headerSummary || "Standard features included",
    isValueForMoney: variant.isValueForMoney || false
  })).sort((a, b) => a.price - b.price) // Sort by price in ascending order (lowest to highest)

  // Filter variants based on active filter
  const getFilteredVariants = () => {
    switch (activeFilter) {
      case 'Diesel':
        return allVariants.filter(variant => variant.fuel === 'Diesel')
      case 'Petrol':
        return allVariants.filter(variant => variant.fuel === 'Petrol')
      case 'CNG':
        return allVariants.filter(variant => variant.fuel === 'CNG')
      case 'Automatic':
        return allVariants.filter(variant => variant.transmission === 'Automatic')
      case 'Value for Money Variants':
        return allVariants.filter(variant => variant.price <= 9.00)
      default:
        return allVariants
    }
  }

  const filteredVariants = getFilteredVariants()


  // Extended Pros and Cons data - Use backend data or fallback
  const allPros = parseBulletPoints(model?.pros || [
    "The safety is top notch with five-star BNCAP safety rating, six airbags as standard and ISOFIX anchors.",
    "The interior and exterior design is modern and features such as panoramic sunroof, JBL sound system and touchscreen infotainment.",
    "Excellent fuel efficiency with impressive mileage figures for city and highway driving.",
    "Spacious cabin with comfortable seating for five adults and ample legroom.",
    "Advanced connectivity features including Android Auto and Apple CarPlay integration.",
    "Reliable build quality with proven engine performance and low maintenance costs."
  ])

  const allCons = parseBulletPoints(model?.cons || [
    "The diesel engine can do with more refinement and the throttle response feels delayed up to 2,000 rpm.",
    "The CNG is limited to a manual transmission which may deter city drivers seeking easy shifting.",
    "Road noise can be noticeable at higher speeds, affecting cabin quietness.",
    "Limited boot space compared to some competitors in the same segment.",
    "Rear seat comfort could be improved for longer journeys.",
    "Some interior materials feel basic and could benefit from premium finishes."
  ])

  // Engine options data
  const engineOptions = [
    {
      id: '1.2-turbo-petrol',
      name: '1.2 Liter Turbo Petrol',
      description: 'Suitable For Both City Driving And Highway Cruising. The 1.2 Liter Engine Of The Tata Altroz Offers Adequate Power For City And Highway Driving. The Engine Provides Smooth Acceleration Without Compromising On Fuel Efficiency',
      variants: [
        {
          type: 'Manual',
          power: '87 Bhp',
          torque: '113 Nm',
          transmission: '6 Speed'
        },
        {
          type: 'Automatic',
          power: '87 Bhp',
          torque: '113 Nm',
          transmission: '6 Speed'
        },
        {
          type: 'iMT',
          power: '87 Bhp',
          torque: '113 Nm',
          transmission: '6 Speed'
        }
      ]
    },
    {
      id: '2.5-diesel',
      name: '2.5 Liter Diesel',
      description: 'Suitable For Both City Driving And Highway Cruising. The 1.5 Liter Engine Of The Tata Altroz Offers Adequate Power For City And Highway Driving. The Engine Provides Smooth Acceleration Without Compromising On Fuel Efficiency',
      variants: [
        {
          type: 'Manual',
          power: '87 Bhp',
          torque: '113 Nm',
          transmission: '6 Speed'
        },
        {
          type: 'iMT',
          power: '87 Bhp',
          torque: '113 Nm',
          transmission: '6 Speed'
        }
      ]
    },
    {
      id: '1.5-diesel',
      name: '1.5 Liter Diesel',
      description: 'Suitable For Both City Driving And Highway Cruising. The 1.5 Liter Engine Of The Tata Altroz Offers Adequate Power For City And Highway Driving. The Engine Provides Smooth Acceleration Without Compromising On Fuel Efficiency',
      variants: [
        {
          type: 'iMT',
          power: '87 Bhp',
          torque: '113 Nm',
          transmission: '6 Speed'
        }
      ]
    }
  ]

  // Mileage data for different engines
  const mileageData = [
    {
      id: 1,
      engine: '1.5 Litre Turbo Petrol',
      transmission: 'DCT',
      companyClaimed: '56.2 Km/l',
      cityRealWorld: '56.2 Km/l',
      highwayRealWorld: '56.2 Km/l'
    },
    {
      id: 2,
      engine: '1.2 Litre Petrol',
      transmission: 'Manual',
      companyClaimed: '22.3 Km/l',
      cityRealWorld: '18.5 Km/l',
      highwayRealWorld: '24.1 Km/l'
    },
    {
      id: 3,
      engine: '1.0 Litre Turbo Petrol',
      transmission: 'AMT',
      companyClaimed: '20.5 Km/l',
      cityRealWorld: '16.8 Km/l',
      highwayRealWorld: '22.3 Km/l'
    }
  ]

  // Similar cars data (copied from CarsByBudget structure)
  const similarCars = [
    {
      id: 1,
      name: 'Grand Vitara',
      brand: 'Maruti Suzuki',
      image: 'https://images.unsplash.com/photo-1494976688153-d4d4c0b0f5c8?w=400&h=300&fit=crop&crop=center',
      startingPrice: 1099000,
      fuelType: 'Petrol/Hybrid',
      seating: 5,
      launchDate: 'Launched January 2024',
      slug: 'maruti-suzuki-grand-vitara',
      isNew: true
    },
    {
      id: 2,
      name: 'i20',
      brand: 'Hyundai',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&crop=center',
      startingPrice: 2999000,
      fuelType: 'Petrol/Diesel',
      seating: 5,
      launchDate: 'Launched March 2024',
      slug: 'hyundai-i20',
      isNew: true
    },
    {
      id: 3,
      name: 'Nexon',
      brand: 'Tata',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop&crop=center',
      startingPrice: 732000,
      fuelType: 'Petrol/Diesel',
      seating: 5,
      launchDate: 'Launched February 2024',
      slug: 'tata-nexon',
      isNew: false
    }
  ]

  // News articles data (copied from LatestCarNews)
  const newsArticles = [
    {
      id: 1,
      title: 'Maruti Suzuki Grand Vitara Hybrid Review: Best Fuel Economy in Segment',
      excerpt: 'We test drive the new Grand Vitara hybrid to see if it lives up to the fuel efficiency claims.',
      category: 'Review',
      author: 'Rajesh Kumar',
      publishDate: '2024-03-15',
      readTime: '5 min read',
      views: 12500,
      comments: 45,
      image: '/news/grand-vitara-review.jpg',
      slug: 'maruti-suzuki-grand-vitara-hybrid-review',
      featured: true
    },
    {
      id: 2,
      title: 'Upcoming Electric Cars in India 2024: Complete List with Expected Prices',
      excerpt: 'From Tata to Mahindra, here are all the electric cars launching in India this year.',
      category: 'News',
      author: 'Priya Sharma',
      publishDate: '2024-03-14',
      readTime: '8 min read',
      views: 18200,
      comments: 67,
      image: '/news/electric-cars-2024.jpg',
      slug: 'upcoming-electric-cars-india-2024',
      featured: true
    },
    {
      id: 3,
      title: 'Hyundai Creta vs Kia Seltos 2024: Which Compact SUV Should You Buy?',
      excerpt: 'Detailed comparison of two popular compact SUVs with latest updates and pricing.',
      category: 'Comparison',
      author: 'Amit Singh',
      publishDate: '2024-03-13',
      readTime: '6 min read',
      views: 9800,
      comments: 32,
      image: '/news/creta-vs-seltos.jpg',
      slug: 'hyundai-creta-vs-kia-seltos-2024-comparison',
      featured: false
    }
  ]

  // Videos data (copied from YouTubeVideoPlayer)
  const featuredVideo = {
    id: 'dQw4w9WgXcQ',
    title: 'Maruti Suzuki Grand Vitara Detailed Review | Hybrid vs Petrol | Which One to Buy?',
    thumbnail: '/youtube/grand-vitara-review.jpg',
    duration: '12:45',
    views: '2.5M',
    likes: '45K',
    publishedAt: '2 days ago',
    channelName: 'MotorOctane'
  }

  const relatedVideos = [
    {
      id: 'abc123',
      title: 'Top 5 Cars Under 10 Lakhs in 2024',
      thumbnail: '/youtube/top-5-cars.jpg',
      duration: '8:30',
      views: '1.2M',
      likes: '28K',
      publishedAt: '1 week ago',
      channelName: 'MotorOctane'
    },
    {
      id: 'def456',
      title: 'Electric vs Petrol Cars: Complete Cost Analysis',
      thumbnail: '/youtube/electric-vs-petrol.jpg',
      duration: '15:20',
      views: '890K',
      likes: '19K',
      publishedAt: '3 days ago',
      channelName: 'MotorOctane'
    },
    {
      id: 'ghi789',
      title: 'Hyundai Creta 2024 First Drive Review',
      thumbnail: '/youtube/creta-review.jpg',
      duration: '10:15',
      views: '1.8M',
      likes: '35K',
      publishedAt: '5 days ago',
      channelName: 'MotorOctane'
    }
  ]

  // Helper functions
  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById('model-news-scroll')
    if (container) {
      const scrollAmount = 350
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleVideoClick = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')
  }

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  // Consultancy helper functions
  const handleCallClick = () => {
    window.location.href = 'tel:+919876543210'
  }

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919876543210?text=Hi, I need help choosing the right car', '_blank')
  }

  const handleBookConsultationClick = () => {
    window.location.href = '/consultation/book'
  }

  // Section navigation data
  const sections = [
    { id: 'overview', name: 'Overview' },
    { id: 'emi-highlights', name: 'EMI & Highlights' },
    { id: 'variants', name: 'Variants' },
    { id: 'colors', name: 'Colors' },
    { id: 'pros-cons', name: 'Pros & Cons' },
    { id: 'engine', name: 'Engine' },
    { id: 'mileage', name: 'Mileage' },
    { id: 'similar-cars', name: 'Similar Cars' },
    { id: 'news-videos', name: 'News & Videos' },
    { id: 'faq-reviews', name: 'FAQ & Reviews' },
    { id: 'consultancy', name: 'Consultancy' }
  ]



  // Car color options
  const carColors = [
    {
      id: 1,
      name: 'Desert Myst',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=500&fit=crop&auto=format',
      hexCode: '#C4A484'
    },
    {
      id: 2,
      name: 'Pearl White',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=500&fit=crop&auto=format',
      hexCode: '#FFFFFF'
    },
    {
      id: 3,
      name: 'Metallic Silver',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=500&fit=crop&auto=format',
      hexCode: '#C0C0C0'
    },
    {
      id: 4,
      name: 'Deep Black',
      image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=500&fit=crop&auto=format',
      hexCode: '#000000'
    },
    {
      id: 5,
      name: 'Royal Blue',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=500&fit=crop&auto=format',
      hexCode: '#0066CC'
    }
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

  // Handle variant card click to navigate to variant page
  const handleVariantClick = (variant: any) => {
    const slug = `${model?.brand?.toLowerCase().replace(/\s+/g, '-')}-${model?.name?.toLowerCase().replace(/\s+/g, '-')}-${variant.name.toLowerCase().replace(/\s+/g, '-')}`
    console.log('Navigating to variant page:', `/${model?.brand?.toLowerCase().replace(/\s+/g, '-')}-cars/${model?.name?.toLowerCase().replace(/\s+/g, '-')}/${variant.name.toLowerCase().replace(/\s+/g, '-')}`)
    router.push(`/${model?.brand?.toLowerCase().replace(/\s+/g, '-')}-cars/${model?.name?.toLowerCase().replace(/\s+/g, '-')}/${variant.name.toLowerCase().replace(/\s+/g, '-')}`)
  }

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80 // Account for main header
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navigation Ribbon */}
      <div className="bg-white border-b sticky top-0 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`py-3 px-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div>
        {/* Section 1: Overview - New Design */}
        <PageSection background="white" maxWidth="7xl">
          <div id="overview" className="space-y-6">
            {/* Hero Car Image with Gallery */}
            <div className="relative">
              <div className="aspect-[16/10] bg-gray-100 rounded-2xl overflow-hidden relative">
                <img
                  src={model?.gallery?.[currentImageIndex] || model?.heroImage || 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=500&fit=crop&auto=format'}
                  alt={`${model?.brand || 'Car'} ${model?.name || 'Model'}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Gallery Navigation - Single Right Arrow */}
                {model?.gallery && model.gallery.length > 1 && (
                  <button 
                    onClick={() => setCurrentImageIndex((prev: number) => prev === model.gallery.length - 1 ? 0 : prev + 1)}
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
                  {model?.brand || 'Car Brand'} {model?.name || 'Car Model'}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center bg-gradient-to-r from-red-600 to-orange-500 text-white px-3 py-1 rounded">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    <span className="font-semibold">{model?.rating || 4.2}</span>
                    <span className="ml-1">({model?.reviewCount || 1247})</span>
                  </div>
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
              <p className={`${!showFullDescription ? 'line-clamp-3' : ''}`}>
                {model?.seoDescription || `The ${model?.brand || 'Car Brand'} ${model?.name || 'Car Model'} is a compact hatchback that offers excellent fuel efficiency, modern features, and a spacious interior. Perfect for city driving with its compact dimensions and easy maneuverability.`}
              </p>
              {!showFullDescription && (
                <button
                  onClick={() => setShowFullDescription(true)}
                  className="text-red-600 hover:text-orange-600 font-medium mt-1"
                >
                  ...more
                </button>
              )}
              {showFullDescription && (
                <button
                  onClick={() => setShowFullDescription(false)}
                  className="text-red-600 hover:text-orange-600 font-medium mt-1"
                >
                  Show less
                </button>
              )}
            </div>

            {/* Price Display */}
            <div className="space-y-4">
              <div className="text-3xl font-bold text-green-600">
                ₹{(model.startingPrice / 100000).toFixed(2)} - ₹{(model.endingPrice / 100000).toFixed(2)} Lakh
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
                    {(model?.variants || []).map((variant) => (
                      <Link
                        key={variant.id}
                        href={`/${model.brand.toLowerCase().replace(/\s+/g, '-')}-cars/${model.name.toLowerCase().replace(/\s+/g, '-')}/${variant.name.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => {
                          setSelectedVariant(variant.name)
                          setShowVariantDropdown(false)
                        }}
                        className="block w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-gray-900">{variant.name}</span>
                          <span className="text-gray-600">₹{(variant.price / 100000).toFixed(2)} L</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* City Dropdown - Link to Location Page */}
              <Link
                href="/location"
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-gray-400 transition-colors"
              >
                <span className="text-gray-700">
                  {selectedCity || 'Delhi'}
                </span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </Link>
            </div>
          </div>
        </PageSection>

        {/* Section 2: EMI Calculator + AD Banner + Model Highlights */}
        <PageSection background="white" maxWidth="7xl">
          <div id="emi-highlights" className="space-y-8">
            {/* EMI Calculator */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">K</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">kotak</h3>
                    <p className="text-sm text-gray-600">Mahindra Bank</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Starting EMI</p>
                  <p className="text-2xl font-bold text-gray-900">₹12,700</p>
                  <p className="text-sm text-gray-600">per month</p>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-3 rounded-full font-semibold transition-colors flex items-center justify-center space-x-2">
                <span>📊</span>
                <span>Calculate EMI</span>
              </button>
            </div>

            {/* AD Banner */}
            <div className="bg-gray-300 rounded-lg py-20 text-center">
              <h2 className="text-3xl font-bold text-gray-600">AD Banner</h2>
            </div>

            {/* Model Highlights */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">{model?.brand || 'Car'} {model?.name || 'Model'} Highlights</h2>
              
              {/* Tab Navigation - Clickable Headers */}
              <div className="flex space-x-8 border-b border-gray-200">
                <button 
                  onClick={() => handleHighlightTabChange('keyFeatures')}
                  className={`pb-3 px-1 border-b-2 font-medium transition-colors ${
                    activeHighlightTab === 'keyFeatures' 
                      ? 'border-red-600 text-red-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Key & Features
                </button>
                <button 
                  onClick={() => handleHighlightTabChange('spaceComfort')}
                  className={`pb-3 px-1 border-b-2 font-medium transition-colors ${
                    activeHighlightTab === 'spaceComfort' 
                      ? 'border-red-600 text-red-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Space & Comfort
                </button>
                <button 
                  onClick={() => handleHighlightTabChange('storageConvenience')}
                  className={`pb-3 px-1 border-b-2 font-medium transition-colors ${
                    activeHighlightTab === 'storageConvenience' 
                      ? 'border-red-600 text-red-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Storage & Convenience
                </button>
              </div>

              {/* Highlights Grid - Horizontal Scroll */}
              <div className="relative">
                <div className="highlights-scroll-container flex gap-4 overflow-x-auto scrollbar-hide pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {/* Dynamic Highlight Cards from Backend - Show Based on Active Tab */}
                  {(() => {
                    let currentHighlights: any[] = [];
                    if (activeHighlightTab === 'keyFeatures') {
                      currentHighlights = model?.keyFeatureImages || model?.highlights?.keyFeatures || [];
                    } else if (activeHighlightTab === 'spaceComfort') {
                      currentHighlights = model?.spaceComfortImages || model?.highlights?.spaceComfort || [];
                    } else if (activeHighlightTab === 'storageConvenience') {
                      currentHighlights = model?.storageConvenienceImages || model?.highlights?.storageConvenience || [];
                    }
                    
                    return currentHighlights.length > 0 ? (
                      currentHighlights.map((highlight: any, index: number) => (
                        <div key={index} className="flex-shrink-0 w-64">
                          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <div className="aspect-[4/3] bg-gray-200 relative">
                              <img
                                src={
                                  // Backend format: { url: string, caption: string }
                                  highlight.url ? `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}${highlight.url}` :
                                  // Fallback format: { image: string, title: string }
                                  highlight.image && highlight.image.startsWith('http') ? highlight.image : 
                                  `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}${highlight.image || '/highlights/placeholder.jpg'}`
                                }
                                alt={highlight.caption || highlight.title || 'Car Feature'}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  // Fallback to placeholder if image fails to load
                                  e.currentTarget.src = `https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&crop=center`
                                }}
                              />
                              {/* Image Caption Overlay - Backend Caption */}
                              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2">
                                <p className="text-sm font-medium text-center">
                                  {truncateCaption(highlight.caption || highlight.title || `${model?.brand} ${model?.name} ${activeHighlightTab === 'keyFeatures' ? 'Feature' : activeHighlightTab === 'spaceComfort' ? 'Space' : 'Storage'} ${index + 1}`)}
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
                            {/* Sample Caption */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2">
                              <p className="text-sm font-medium text-center">
                                {model?.brand} {model?.name} Feature 1
                              </p>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="w-12 h-1 bg-gray-300 rounded"></div>
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
                            {/* Sample Caption */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2">
                              <p className="text-sm font-medium text-center">
                                {model?.brand} {model?.name} Feature 2
                              </p>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="w-12 h-1 bg-gray-300 rounded"></div>
                          </div>
                        </div>
                      </div>

                      {/* Highlight Card 3 */}
                      <div className="flex-shrink-0 w-64">
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <div className="aspect-[4/3] bg-gray-200 relative">
                            <img
                              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&crop=center"
                              alt="Fuel Efficiency"
                              className="w-full h-full object-cover"
                            />
                            {/* Sample Caption */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2">
                              <p className="text-sm font-medium text-center">
                                {model?.brand} {model?.name} Feature 3
                              </p>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="w-12 h-1 bg-gray-300 rounded"></div>
                          </div>
                        </div>
                      </div>

                      {/* Highlight Card 4 */}
                      <div className="flex-shrink-0 w-64">
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <div className="aspect-[4/3] bg-gray-200 relative">
                            <img
                              src="https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop&crop=center"
                              alt="Smart Technology"
                              className="w-full h-full object-cover"
                            />
                            {/* Sample Caption */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2">
                              <p className="text-sm font-medium text-center">
                                {model?.brand} {model?.name} Feature 4
                              </p>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="w-12 h-1 bg-gray-300 rounded"></div>
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

        {/* Section 3: Model Price Details & Variants */}
        <PageSection background="white" maxWidth="7xl">
          <div id="variants" className="space-y-8">
            {/* Model Price Header */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{model?.brand || 'Car'} {model?.name || 'Model'} Price</h2>
              
              {/* SEO Content */}
              <div className="text-gray-700 leading-relaxed">
                <p>
                  Tata Nexon price for the base model starts at Rs. 8.00 Lakh and the top model price goes upto Rs. 15.60 Lakh (Avg. ex-showroom). Nexon price for 49 variants is listed below.
                  {!showFullDescription && (
                    <button
                      onClick={() => setShowFullDescription(true)}
                      className="text-red-600 hover:text-orange-600 font-medium ml-1"
                    >
                      Read More
                    </button>
                  )}
                </p>
                {showFullDescription && (
                  <p className="mt-2">
                    The {model?.brand || 'Car'} {model?.name || 'Model'} offers exceptional value for money with its competitive pricing structure across different variants. Each variant comes with unique features and specifications designed to cater to different customer needs and preferences. The pricing includes various safety features, comfort amenities, and modern technology integrations.
                    <button
                      onClick={() => setShowFullDescription(false)}
                      className="text-red-600 hover:text-orange-600 font-medium ml-1"
                    >
                      Show Less
                    </button>
                  </p>
                )}
              </div>
            </div>

            {/* Variants Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Variants</h3>
              
              {/* Filter Options */}
              <div className="flex flex-wrap gap-3">
                {['All', 'Diesel', 'Petrol', 'CNG', 'Automatic', 'Value for Money Variants'].map((filter) => (
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
                {loadingVariants ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading variants...</p>
                  </div>
                ) : filteredVariants.length > 0 ? (
                  filteredVariants.map((variant) => (
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
                        <p className="text-sm text-gray-600 line-clamp-2 overflow-hidden">
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
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No variants found for the selected filter.</p>
                  </div>
                )}
              </div>

              {/* View More Button */}
              {!loadingVariants && allVariants.length > 0 && (
                <div className="text-center pt-4">
                  <button 
                    className="text-red-600 hover:text-orange-600 font-medium"
                    onClick={() => {
                      const brandSlug = model?.brand?.toLowerCase().replace(/\s+/g, '-')
                      const modelSlug = model?.name?.toLowerCase().replace(/\s+/g, '-')
                      router.push(`/${brandSlug}-cars/${modelSlug}`)
                    }}
                  >
                    View All {allVariants.length} Variants
                  </button>
                </div>
              )}
            </div>
          </div>
        </PageSection>

        {/* Section 4: AD Banner + Color Options */}
        <PageSection background="white" maxWidth="7xl">
          <div id="colors" className="space-y-8">
            {/* AD Banner */}
            <div className="bg-gray-300 rounded-lg py-20 text-center">
              <h2 className="text-3xl font-bold text-gray-600">AD Banner</h2>
            </div>

            {/* Color Options Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">{model?.brand || 'Car'} {model?.name || 'Model'} Colours</h2>
              
              {/* Check if backend colorImages exist */}
              {model?.colorImages && model.colorImages.length > 0 ? (
                <>
                  {/* Main Car Image Display */}
                  <div className="relative bg-gray-50 rounded-2xl p-8">
                    <div className="flex items-center justify-center">
                      <div className="relative max-w-2xl w-full">
                        <img
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}${model.colorImages.find(c => c.caption === selectedColor)?.url || model.colorImages[0]?.url}`}
                          alt={`${model?.brand || 'Car'} ${model?.name || 'Model'} in ${selectedColor || 'default color'}`}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>
                    
                    {/* Color Name Display */}
                    <div className="text-center mt-6">
                      <h3 className="text-xl font-bold text-gray-900">{truncateCaption(selectedColor || 'Default Color', 30)}</h3>
                    </div>
                  </div>

                  {/* Color Selector - Horizontal Scroll */}
                  <div className="relative">
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      {model.colorImages.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColor(color.caption)}
                          className={`flex-shrink-0 relative rounded-xl overflow-hidden transition-all duration-300 ${
                            selectedColor === color.caption
                              ? 'ring-4 ring-red-500 shadow-lg scale-105'
                              : 'hover:shadow-md hover:scale-102'
                          }`}
                        >
                          <div className="w-32 h-24 bg-gray-100">
                            <img
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}${color.url}`}
                              alt={`${model?.brand || 'Car'} ${model?.name || 'Model'} in ${color.caption}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Color name overlay */}
                          <div className="absolute bottom-0 left-0 right-0 bg-black/75 text-white text-xs p-2 text-center">
                            {truncateCaption(color.caption, 15)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Fallback to legacy colors structure */
                <>
                  {/* Main Car Image Display */}
                  <div className="relative bg-gray-50 rounded-2xl p-8">
                    <div className="flex items-center justify-center">
                      <div className="relative max-w-2xl w-full">
                        <img
                          src={carColors.find(color => color.name === selectedColor)?.image || carColors[0].image}
                          alt={`${model?.brand || 'Car'} ${model?.name || 'Model'} in ${selectedColor || 'default color'}`}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>
                    
                    {/* Color Name Display */}
                    <div className="text-center mt-6">
                      <h3 className="text-xl font-bold text-gray-900">{selectedColor || 'Default Color'}</h3>
                    </div>
                  </div>

                  {/* Color Selector - Horizontal Scroll */}
                  <div className="relative">
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      {carColors.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => setSelectedColor(color.name)}
                          className={`flex-shrink-0 relative rounded-xl overflow-hidden transition-all duration-300 ${
                            selectedColor === color.name
                              ? 'ring-4 ring-red-500 shadow-lg scale-105'
                              : 'hover:shadow-md hover:scale-102'
                          }`}
                        >
                          <div className="w-32 h-24 bg-gray-100">
                            <img
                              src={color.image}
                              alt={`${model?.brand || 'Car'} ${model?.name || 'Model'} in ${color.name}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Color indicator dot */}
                          <div className="absolute bottom-2 left-2">
                            <div 
                              className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: color.hexCode }}
                            ></div>
                          </div>
                          
                          {/* Color name overlay */}
                          <div className="absolute bottom-0 left-0 right-0 bg-black/75 text-white text-xs p-2 text-center">
                            {color.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </PageSection>

        {/* Section 5: Pros & Cons + Model Summary */}
        <PageSection background="white" maxWidth="7xl">
          <div id="pros-cons" className="space-y-8">
            {/* Pros & Cons Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">{model?.brand || 'Car'} {model?.name || 'Model'} Pros & Cons</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pros Column */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V18m-7-8a2 2 0 01-2-2V4a2 2 0 012-2h2.343M7 12h4m-4 0v8-8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Pros</h3>
                  </div>
                  
                  <ul className="space-y-4">
                    {(showAllPros ? allPros : allPros.slice(0, 2)).map((pro, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {pro}
                        </p>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => setShowAllPros(!showAllPros)}
                    className="text-red-500 hover:text-red-600 text-sm font-medium mt-4"
                  >
                    {showAllPros ? 'Show less' : '...more'}
                  </button>
                </div>

                {/* Cons Column */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l3 3 7-7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Cons</h3>
                  </div>
                  
                  <ul className="space-y-4">
                    {(showAllCons ? allCons : allCons.slice(0, 2)).map((con, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {con}
                        </p>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => setShowAllCons(!showAllCons)}
                    className="text-red-500 hover:text-red-600 text-sm font-medium mt-4"
                  >
                    {showAllCons ? 'Show less' : '...more'}
                  </button>
                </div>
              </div>
            </div>

            {/* Model Summary Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">{model?.brand || 'Car'} {model?.name || 'Model'} Summary</h2>
              
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <h3 className="text-lg font-bold text-gray-900">Description</h3>
                  </div>
                  {model?.description ? (
                    <ul className="space-y-2">
                      {parseBulletPoints(model.description).map((point, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      The Alto K10 Is A Hatchback That Belongs To The Entry-Level Hatchback Segment. It Is A More Powerful Version Of The Maruti Alto 800 And Was Launched In 2022.
                      {showSummaryDescription && (
                        <span> The vehicle offers excellent value for money with its efficient engine, modern features, and reliable performance. It's designed for urban commuting with a focus on fuel efficiency and ease of driving. The compact dimensions make it perfect for navigating through city traffic while providing adequate space for passengers and luggage.</span>
                      )}
                    </p>
                  )}
                  {!model?.description && (
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
                  {model?.exteriorDesign ? (
                    <ul className="space-y-2">
                      {parseBulletPoints(model.exteriorDesign).map((point, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      The Maruti Alto K10 comes with a simple front design. At the front, we have fish-eyed headlamps that are integrated with the bonnet design. Apart from that, we have a big air dam and faux cutouts.
                      {showSummaryExterior && (
                        <span> The side profile features clean lines with subtle character lines running along the doors. The rear design includes wraparound tail lamps and a compact boot lid. The overall design philosophy emphasizes simplicity and functionality while maintaining an attractive appearance that appeals to a wide range of customers.</span>
                      )}
                    </p>
                  )}
                  {!model?.exteriorDesign && (
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
                  {model?.comfortConvenience ? (
                    <ul className="space-y-2">
                      {parseBulletPoints(model.comfortConvenience).map((point, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      On the inside, the Alto K10 comes with an all-black interior design layout. We have a coloured dashboard with a center console-placed infotainment system. This infotainment system is a 7-inch touchscreen infotainment that gets - wired Android Auto and Apple CarPlay. We also have power steer.
                      {showSummaryComfort && (
                        <span> Additional comfort features include air conditioning, power windows, central locking, and comfortable fabric upholstery. The cabin offers adequate storage spaces including door pockets, glove compartment, and cup holders. Safety features include dual airbags, ABS with EBD, and rear parking sensors for enhanced driving confidence.</span>
                      )}
                    </p>
                  )}
                  {!model?.comfortConvenience && (
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
          </div>
        </PageSection>

        {/* Section 6: Engine Highlights */}
        <PageSection background="white" maxWidth="7xl">
          <div id="engine" className="space-y-8">
            {/* AD Banner */}
            <div className="bg-gray-300 rounded-lg py-20 text-center">
              <h2 className="text-3xl font-bold text-gray-600">AD Banner</h2>
            </div>

            {/* Engine Highlights */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">{model?.brand || 'Car'} {model?.name || 'Model'} Engine</h2>
              
              <div className="space-y-4">
                {/* Use backend engineSummaries if available, otherwise fallback to engineOptions */}
                {(model?.engineSummaries && model.engineSummaries.length > 0 ? model.engineSummaries : engineOptions).map((engine: any, index: number) => {
                  const engineId = model?.engineSummaries ? `engine-${index}` : engine.id
                  const engineTitle = model?.engineSummaries ? engine.title : engine.name
                  const engineSummary = model?.engineSummaries ? engine.summary : engine.description
                  
                  return (
                    <div key={engineId} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      {/* Engine Header - Always Visible */}
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {index + 1}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">{engineTitle}</h3>
                          </div>
                          <button
                            onClick={() => setExpandedEngine(expandedEngine === engineId ? null : engineId)}
                            className="text-red-500 hover:text-red-600 font-medium text-sm transition-colors"
                          >
                            {expandedEngine === engineId ? 'Show Less' : 'Read More'}
                          </button>
                        </div>
                        
                        {/* Collapsed Preview */}
                        {expandedEngine !== engineId && model?.engineSummaries && (
                          <ul className="space-y-1 mt-3">
                            {parseBulletPoints(engineSummary).slice(0, 1).map((point, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <span className="text-gray-400 mt-1">•</span>
                                <span className="text-gray-600 text-sm">{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {expandedEngine !== engineId && !model?.engineSummaries && (
                          <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                            {engineSummary.split('.')[0]}.
                          </p>
                        )}
                      </div>

                      {/* Expanded Content */}
                      {expandedEngine === engineId && (
                        <div className="px-6 pb-6">
                          {/* Backend engine summary with bullet points */}
                          {model?.engineSummaries ? (
                            <>
                              <ul className="space-y-2 mb-6">
                                {parseBulletPoints(engineSummary).map((point, idx) => (
                                  <li key={idx} className="flex items-start space-x-2">
                                    <span className="text-gray-400 mt-1">•</span>
                                    <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
                                  </li>
                                ))}
                              </ul>
                              
                              {/* Engine Specs from backend */}
                              <div className="bg-gray-50 rounded-lg p-4">
                                {/* Transmission Label - uppercase except Manual */}
                                <h4 className="font-bold text-gray-900 mb-3 text-center">
                                  {(() => {
                                    const trans = (engine as any).transmission || ''
                                    return trans.toLowerCase() === 'manual' ? 'Manual' : trans.toUpperCase()
                                  })()}
                                </h4>
                                
                                <div className="grid grid-cols-3 gap-4 text-center">
                                  <div>
                                    <p className="text-xs text-gray-500 mb-1">Power:</p>
                                    <p className="font-medium text-gray-900">{(engine as any).power}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 mb-1">Torque:</p>
                                    <p className="font-medium text-gray-900">{(engine as any).torque}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 mb-1">Transmission:</p>
                                    <p className="font-medium text-gray-900">{(engine as any).speed}</p>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            /* Fallback to legacy engine structure */
                            <>
                              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                                {engineSummary}
                              </p>
                              
                              {/* Engine Variants */}
                              <div className="space-y-4">
                                {(engine as any).variants.map((variant: any, idx: number) => (
                                  <div key={idx} className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-bold text-gray-900 mb-3 text-center">
                                      {variant.type}
                                    </h4>
                                    
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                      <div>
                                        <p className="text-xs text-gray-500 mb-1">Power:</p>
                                        <p className="font-medium text-gray-900">{variant.power}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-500 mb-1">Torque:</p>
                                        <p className="font-medium text-gray-900">{variant.torque}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-gray-500 mb-1">Transmission:</p>
                                        <p className="font-medium text-gray-900">{variant.transmission}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </PageSection>

        {/* Section 7: Mileage Section */}
        <PageSection background="white" maxWidth="7xl">
          <div id="mileage" className="space-y-8">
            {/* Mileage Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">{model?.brand || 'Car'} {model?.name || 'Model'} Mileage</h2>
              
              {/* Horizontal Scrollable Mileage Cards */}
              <div className="relative">
                <div 
                  ref={mileageScrollRef}
                  className="flex gap-6 overflow-x-auto scrollbar-hide pb-4" 
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {/* Use backend mileageData if available, otherwise fallback */}
                  {(model?.mileageData && model.mileageData.length > 0 ? model.mileageData : mileageData).map((mileage: any, index: number) => {
                    const engineName = model?.mileageData ? mileage.engineName : mileage.engine
                    const companyClaimed = model?.mileageData ? mileage.companyClaimed : mileage.companyClaimed
                    const cityRealWorld = model?.mileageData ? mileage.cityRealWorld : mileage.cityRealWorld
                    const highwayRealWorld = model?.mileageData ? mileage.highwayRealWorld : mileage.highwayRealWorld
                    
                    return (
                      <div
                        key={index}
                        className="flex-shrink-0 w-64 bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-300"
                      >
                        {/* Engine Header */}
                        <div className="text-center mb-4">
                          <h3 className="text-red-500 font-bold text-sm mb-1">Engine & Transmission</h3>
                          <h4 className="text-red-500 font-bold text-base">{engineName}</h4>
                        </div>

                        {/* Mileage Details */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-600 text-sm">Company Claimed</span>
                            <span className="text-gray-900 font-bold text-sm">{companyClaimed}</span>
                          </div>
                          
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-600 text-sm">City Real World</span>
                            <span className="text-gray-900 font-bold text-sm">{cityRealWorld}</span>
                          </div>
                          
                          <div className="flex justify-between items-center py-2">
                            <span className="text-gray-600 text-sm">Highway Real World</span>
                            <span className="text-gray-900 font-bold text-sm">{highwayRealWorld}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center space-x-2 mt-4">
                {(model?.mileageData && model.mileageData.length > 0 ? model.mileageData : mileageData).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedMileageEngine(index)
                      if (mileageScrollRef.current) {
                        const cardWidth = 300 // approximate card width + gap
                        mileageScrollRef.current.scrollTo({ left: cardWidth * index, behavior: 'smooth' })
                      }
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      selectedMileageEngine === index
                        ? 'bg-gradient-to-r from-red-600 to-orange-500 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* AD Banner */}
            <div className="bg-gray-300 rounded-lg py-20 text-center">
              <h2 className="text-3xl font-bold text-gray-600">AD Banner</h2>
            </div>
          </div>
        </PageSection>

        {/* Section 8: Similar Cars */}
        <PageSection background="white" maxWidth="7xl">
          <div id="similar-cars" className="space-y-8">
            {/* Similar Cars Section - Exact copy from CarsByBudget */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Similar Cars to {model?.brand || 'Car'} {model?.name || 'Model'}</h2>
              
              {/* Cars Horizontal Scroll - Exact copy from home page */}
              <div className="relative">
                <div
                  className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {similarCars.map((car) => (
                    <Link
                      key={car.id}
                      href={`/cars/${car.brand.toLowerCase().replace(' ', '-')}/${car.name.toLowerCase().replace(' ', '-')}`}
                      className="flex-shrink-0 w-80 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden block"
                    >
                      {/* Car Image with Badges */}
                      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                        {/* NEW Badge */}
                        {car.isNew && (
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
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
                              // Fallback to a car silhouette if image fails to load
                              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%23374151'%3E%3Cpath d='M50 200h300c5.5 0 10-4.5 10-10v-80c0-16.6-13.4-30-30-30H70c-16.6 0-30 13.4-30 30v80c0 5.5 4.5 10 10 10z'/%3E%3Ccircle cx='100' cy='220' r='25' fill='%23111827'/%3E%3Ccircle cx='300' cy='220' r='25' fill='%23111827'/%3E%3Cpath d='M80 110h240l-20-30H100z' fill='%236B7280'/%3E%3C/svg%3E"
                            }}
                          />
                        </div>
                      </div>

                      {/* Car Info */}
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 mb-2 text-lg">{truncateCarName(car.brand, car.name, 18)}</h3>
                        
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

                        <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-3 rounded-lg transition-all duration-200 text-sm font-semibold">
                          View Details
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Compare With Similar Cars Section - Exact copy from brand page */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Compare With Similar Cars</h2>
              
              {/* Comparison Cards - Horizontal Scroll */}
              <div className="relative mb-8">
                <div
                  className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {/* Comparison Card 1 */}
                  <div className="flex-shrink-0 w-96 bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                    {/* VS Comparison Layout */}
                    <div className="flex items-center justify-between mb-4">
                      {/* Car 1 */}
                      <div className="flex-1 text-center">
                        <img 
                          src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=300&h=200&fit=crop&crop=center"
                          alt="Maruti Victoris"
                          className="w-20 h-16 object-cover rounded-lg mx-auto mb-2"
                        />
                        <div className="text-sm text-gray-600">Maruti</div>
                        <div className="font-semibold text-gray-900">Victoris</div>
                        <div className="text-sm text-red-600 font-bold mt-1">
                          Rs. 10.50 Lakh
                        </div>
                        <div className="text-xs text-gray-500">onwards</div>
                      </div>

                      {/* VS Badge */}
                      <div className="mx-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">VS</span>
                        </div>
                      </div>

                      {/* Car 2 */}
                      <div className="flex-1 text-center">
                        <img 
                          src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=200&fit=crop&crop=center"
                          alt="Maruti Grand Vitara"
                          className="w-20 h-16 object-cover rounded-lg mx-auto mb-2"
                        />
                        <div className="text-sm text-gray-600">Maruti</div>
                        <div className="font-semibold text-gray-900">Grand Vitara</div>
                        <div className="text-sm text-red-600 font-bold mt-1">
                          Rs. 10.77 Lakh
                        </div>
                        <div className="text-xs text-gray-500">onwards</div>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-2 rounded-lg transition-all duration-200 text-sm font-medium shadow-sm">
                      Compare Now
                    </button>
                  </div>

                  {/* Comparison Card 2 */}
                  <div className="flex-shrink-0 w-96 bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                    {/* VS Comparison Layout */}
                    <div className="flex items-center justify-between mb-4">
                      {/* Car 1 */}
                      <div className="flex-1 text-center">
                        <img 
                          src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=300&h=200&fit=crop&crop=center"
                          alt="Tata Nexon"
                          className="w-20 h-16 object-cover rounded-lg mx-auto mb-2"
                        />
                        <div className="text-sm text-gray-600">Tata</div>
                        <div className="font-semibold text-gray-900">Nexon</div>
                        <div className="text-sm text-red-600 font-bold mt-1">
                          Rs. 7.32 Lakh
                        </div>
                        <div className="text-xs text-gray-500">onwards</div>
                      </div>

                      {/* VS Badge */}
                      <div className="mx-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">VS</span>
                        </div>
                      </div>

                      {/* Car 2 */}
                      <div className="flex-1 text-center">
                        <img 
                          src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&h=200&fit=crop&crop=center"
                          alt="Hyundai i20"
                          className="w-20 h-16 object-cover rounded-lg mx-auto mb-2"
                        />
                        <div className="text-sm text-gray-600">Hyundai</div>
                        <div className="font-semibold text-gray-900">i20</div>
                        <div className="text-sm text-red-600 font-bold mt-1">
                          Rs. 29.99 Lakh
                        </div>
                        <div className="text-xs text-gray-500">onwards</div>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-2 rounded-lg transition-all duration-200 text-sm font-medium shadow-sm">
                      Compare Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Compare Cars of Your Choice Button */}
              <div className="text-center">
                <button className="w-full max-w-md bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 py-3 rounded-lg transition-all duration-200 font-medium">
                  Compare Cars of Your Choice
                </button>
              </div>
            </div>
          </div>
        </PageSection>

        {/* Section 9: Model News & Videos */}
        <PageSection background="white" maxWidth="7xl">
          <div id="news-videos" className="space-y-8">
            {/* Model News Section - Exact copy from home page */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">{model?.brand || 'Car'} {model?.name || 'Model'} News</h2>
                <Link 
                  href="/news" 
                  className="flex items-center text-red-600 hover:text-orange-600 font-medium"
                >
                  View All News
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              {/* News Articles Horizontal Scroll */}
              <div className="relative">
                {/* Left Arrow */}
                <button
                  onClick={() => scrollContainer('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                
                {/* Right Arrow */}
                <button
                  onClick={() => scrollContainer('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>

                <div
                  id="model-news-scroll"
                  className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {newsArticles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/news/${article.slug}`}
                      className="flex-shrink-0 w-80 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden"
                    >
                      {/* Article Image with Gradient */}
                      <div className="h-56 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center relative">
                        <div className="text-center text-white px-4">
                          <div className="w-16 h-10 bg-white/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                            <span className="text-xs font-medium">NEWS</span>
                          </div>
                          <h3 className="text-base font-bold leading-tight">
                            {article.title}
                          </h3>
                        </div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            {article.category}
                          </span>
                        </div>

                        {/* Featured Badge */}
                        {article.featured && (
                          <div className="absolute top-3 right-3">
                            <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Article Info */}
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-2 text-base leading-tight">
                          {article.title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">
                          {article.excerpt}
                        </p>

                        {/* Author and Date */}
                        <div className="flex items-center text-xs text-gray-500 mb-3">
                          <span className="font-medium">{article.author}</span>
                          <span className="mx-2">•</span>
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{new Date(article.publishDate).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short' 
                          })}</span>
                        </div>

                        {/* Article Stats */}
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{article.readTime}</span>
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            <span>{article.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            <span>{article.comments}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* AD Banner */}
            <div className="bg-gray-300 rounded-lg py-20 text-center">
              <h2 className="text-3xl font-bold text-gray-600">AD Banner</h2>
            </div>

            {/* Model Videos Section - Exact copy from home page */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{model?.brand || 'Car'} {model?.name || 'Model'} Videos</h2>
                <a 
                  href="https://www.youtube.com/@motoroctane" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-red-600 hover:text-red-700 font-medium"
                >
                  Visit Channel
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Featured Video */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {/* Video Thumbnail */}
                    <div 
                      className="relative h-64 md:h-80 bg-gradient-to-r from-red-500 to-pink-500 cursor-pointer group"
                      onClick={() => handleVideoClick(featuredVideo.id)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 rounded-full p-4 group-hover:bg-white transition-colors">
                          <Play className="h-8 w-8 text-red-600 fill-current" />
                        </div>
                      </div>
                      
                      {/* Duration Badge */}
                      <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
                        {featuredVideo.duration}
                      </div>

                      {/* Video Overlay */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                      
                      {/* Video Title Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h3 className="text-white font-bold text-lg line-clamp-2">
                          {featuredVideo.title}
                        </h3>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span className="font-medium text-red-600">{featuredVideo.channelName}</span>
                        <span>{featuredVideo.publishedAt}</span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          <span>{featuredVideo.views} views</span>
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span>{featuredVideo.likes} likes</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{featuredVideo.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Videos */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">More Videos</h3>
                  
                  {relatedVideos.map((video) => (
                    <div 
                      key={video.id}
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleVideoClick(video.id)}
                    >
                      <div className="flex">
                        {/* Video Thumbnail */}
                        <div className="relative w-32 h-20 bg-gradient-to-r from-blue-400 to-purple-500 flex-shrink-0">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="h-4 w-4 text-white fill-current" />
                          </div>
                          
                          {/* Duration Badge */}
                          <div className="absolute bottom-1 right-1 bg-black/80 text-white px-1 py-0.5 rounded text-xs">
                            {video.duration}
                          </div>
                        </div>

                        {/* Video Info */}
                        <div className="flex-1 p-3">
                          <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                            {video.title}
                          </h4>
                          
                          <div className="text-xs text-gray-500 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-red-600 font-medium">{video.channelName}</span>
                              <span>{video.publishedAt}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <span>{video.views} views</span>
                              <span>•</span>
                              <span>{video.likes} likes</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Subscribe Button */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <h4 className="font-bold text-gray-900 mb-2">Subscribe to MotorOctane</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Get the latest car reviews, comparisons, and buying guides
                    </p>
                    <a
                      href="https://www.youtube.com/@motoroctane?sub_confirmation=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      Subscribe Now
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageSection>

        {/* Section 10: Model FAQ & Owner Reviews */}
        <PageSection background="white" maxWidth="7xl">
          <div id="faq-reviews" className="space-y-8">
            {/* Model FAQ Section - Exact copy from brand page */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{model?.brand || 'Car'} {model?.name || 'Model'} FAQ</h2>
              
              <div className="space-y-4 max-w-4xl mx-auto">
                {/* Dynamic FAQ Items from backend */}
                {(model?.faqs && model.faqs.length > 0 ? model.faqs : [
                  {
                    question: "What is the price range of Maruti cars?",
                    answer: "Renault offers cars across various price segments to cater to different budgets. The entry-level models start from around ₹4-5 lakhs, while premium models can go up to ₹15-20 lakhs."
                  },
                  {
                    question: "Which Maruti car has the best mileage?",
                    answer: `The ${model?.brand || 'Car'} ${model?.name || 'Model'} is among the most fuel-efficient cars, delivering up to 22-24 km/l.`
                  },
                  {
                    question: "Are Maruti cars reliable?",
                    answer: "Yes, Renault cars are known for their reliability and durability. The brand has built a strong reputation for producing vehicles that require minimal maintenance."
                  },
                  {
                    question: "Which Maruti car is best for families?",
                    answer: "The Triber is an excellent choice for families with its 7-seater configuration and spacious interior."
                  }
                ]).map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg border border-gray-200">
                    <button 
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-lg font-medium text-gray-900">
                        {faq.question}
                      </span>
                      <svg 
                        className={`h-5 w-5 text-gray-500 transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFAQ === index && (
                      <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Model Owner Reviews Section - Exact copy from brand page */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">{model?.brand || 'Car'} {model?.name || 'Model'} Owner Reviews</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Rating Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[1, 2, 3, 4].map((star) => (
                          <svg key={star} className="h-6 w-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <svg className="h-6 w-6 text-gray-300" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span className="ml-2 text-2xl font-bold text-gray-900">4.2</span>
                      <span className="ml-2 text-gray-500">(1,543 reviews)</span>
                    </div>

                    <div className="space-y-2 mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3">Rating Breakdown</h3>
                      
                      {/* 5 Star */}
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 w-8">5★</span>
                        <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-400 h-2 rounded-full" style={{ width: '55%' }}></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">856</span>
                      </div>
                      
                      {/* 4 Star */}
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 w-8">4★</span>
                        <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-400 h-2 rounded-full" style={{ width: '21%' }}></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">324</span>
                      </div>
                      
                      {/* 3 Star */}
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 w-8">3★</span>
                        <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-400 h-2 rounded-full" style={{ width: '12%' }}></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">189</span>
                      </div>
                      
                      {/* 2 Star */}
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 w-8">2★</span>
                        <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-300 h-2 rounded-full" style={{ width: '2%' }}></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">26</span>
                      </div>
                      
                      {/* 1 Star */}
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 w-8">1★</span>
                        <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-300 h-2 rounded-full" style={{ width: '1%' }}></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">13</span>
                      </div>
                    </div>

                    {/* Filter Options */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by rating:</label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                          <option>All Ratings</option>
                          <option>5 Stars</option>
                          <option>4 Stars</option>
                          <option>3 Stars</option>
                          <option>2 Stars</option>
                          <option>1 Star</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sort by:</label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                          <option>Most Recent</option>
                          <option>Most Helpful</option>
                          <option>Highest Rating</option>
                          <option>Lowest Rating</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="lg:col-span-2">
                  {/* Individual Reviews */}
                  <div className="space-y-6">
                    {/* Review 1 */}
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-orange-600 font-semibold text-sm">R</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900 flex items-center">
                                Rajesh Kumar
                                <svg className="h-4 w-4 text-green-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </h4>
                              <p className="text-sm text-gray-500">15/01/2024</p>
                            </div>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <h5 className="font-semibold text-gray-900 mb-2">Excellent car with great mileage</h5>
                          <p className="text-gray-700 mb-3">
                            I have been using this car for 6 months now. The mileage is excellent in city conditions. Build quality is good and maintenance cost is reasonable.
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <button className="flex items-center hover:text-gray-700">
                              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                              </svg>
                              24
                            </button>
                            <button className="flex items-center hover:text-gray-700">
                              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.737 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                              </svg>
                              2
                            </button>
                            <span>Helpful</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Review 2 */}
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-orange-600 font-semibold text-sm">P</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900 flex items-center">
                                Priya Sharma
                                <svg className="h-4 w-4 text-green-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </h4>
                              <p className="text-sm text-gray-500">10/01/2024</p>
                            </div>
                            <div className="flex items-center">
                              {[1, 2, 3, 4].map((star) => (
                                <svg key={star} className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <svg className="h-4 w-4 text-gray-300" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                          </div>
                          <h5 className="font-semibold text-gray-900 mb-2">Good family car</h5>
                          <p className="text-gray-700 mb-3">
                            Perfect for family use. Spacious interior and comfortable seats. Only issue is the road noise at high speeds.
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <button className="flex items-center hover:text-gray-700">
                              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                              </svg>
                              18
                            </button>
                            <button className="flex items-center hover:text-gray-700">
                              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.737 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                              </svg>
                              1
                            </button>
                            <span>Helpful</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <div className="text-center mt-6">
                    <button className="text-red-600 hover:text-orange-600 font-medium transition-colors">Read More</button>
                  </div>

                  {/* Write Review CTA */}
                  <div className="bg-gray-50 rounded-lg p-6 mt-6 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Own a {model?.brand || 'Car'} {model?.name || 'Model'}? Share your experience!</h3>
                    <p className="text-gray-600 mb-4">
                      Help other buyers make informed decisions by sharing your honest review
                    </p>
                    <button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md">
                      Write a Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageSection>

        {/* Section 11: AD Banner + Consultancy + Feedback */}
        <PageSection background="white" maxWidth="7xl">
          <div id="consultancy" className="space-y-8">
            {/* AD Banner */}
            <div className="bg-gray-300 rounded-lg py-20 text-center">
              <h2 className="text-3xl font-bold text-gray-600">AD Banner</h2>
            </div>

            {/* Consultancy Section - Exact copy from home page */}
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
                        <button
                          onClick={handleCallClick}
                          className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                          <Phone className="h-5 w-5 mr-2" />
                          Call Now
                        </button>
                        
                        <button
                          onClick={handleWhatsAppClick}
                          className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                          <MessageCircle className="h-5 w-5 mr-2" />
                          WhatsApp
                        </button>
                        
                        <button
                          onClick={handleBookConsultationClick}
                          className="flex items-center justify-center bg-white text-red-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
                        >
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
