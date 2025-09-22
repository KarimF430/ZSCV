'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  ChevronLeft, ChevronRight, Heart, Share, Star, ChevronDown, ChevronUp,
  Calculator, IndianRupee, TrendingUp, Calendar, Clock, User, Tag, Eye, MessageCircle,
  Play, ThumbsUp, ThumbsDown, Phone, Mail, Send, BookOpen, Award, Shield, Fuel,
  Gauge, Users, Package, Zap, Settings, Info, ExternalLink, Filter, Grid, List,
  Check, X, Plus, Minus, BarChart3, Wrench, Car, MapPin, CreditCard
} from 'lucide-react'
import Footer from '@/components/Footer'

export default function VariantPage() {
  const [activeSection, setActiveSection] = useState('header')
  const [expandedSpec, setExpandedSpec] = useState<string | null>(null)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [emiAmount, setEmiAmount] = useState(800000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(5)
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    mobile: '',
    comments: ''
  })
  const sectionRefs = useRef<{[key: string]: HTMLElement | null}>({})

  // Sample variant data
  const variantData = {
    brand: 'Hyundai',
    model: 'i20',
    variant: 'Asta 1.2 Petrol',
    fullName: 'Hyundai i20 Asta 1.2 Petrol',
    price: 950000,
    onRoadPrice: 1080000,
    rating: 4.3,
    reviewCount: 1247,
    keyHighlights: {
      mileage: '20.35 kmpl',
      fuelType: 'Petrol',
      transmission: 'Manual',
      seating: 5,
      safetyRating: '4 Star',
      engine: '1197 cc'
    },
    priceBreakup: {
      exShowroom: 950000,
      rto: 95000,
      insurance: 28000,
      others: 7000,
      total: 1080000
    },
    offers: [
      {
        id: 1,
        title: 'Cash Discount',
        description: 'Get up to ₹25,000 cash discount on immediate purchase',
        validTill: '31st March 2024',
        discount: '₹25,000'
      },
      {
        id: 2,
        title: 'Exchange Bonus',
        description: 'Additional ₹15,000 on exchange of your old car',
        validTill: '31st March 2024',
        discount: '₹15,000'
      }
    ],
    specifications: {
      engine: {
        displacement: '1197 cc',
        maxPower: '82 bhp @ 6000 rpm',
        maxTorque: '114 Nm @ 4000 rpm',
        transmission: '5-Speed Manual'
      },
      dimensions: {
        length: '3995 mm',
        width: '1775 mm',
        height: '1505 mm',
        bootSpace: '311 litres'
      },
      safety: [
        '6 Airbags',
        'ABS with EBD',
        'Electronic Stability Control',
        'Hill Start Assist',
        'Rear Parking Sensors',
        'Reverse Camera'
      ]
    },
    features: {
      standard: [
        'LED Headlights',
        'Alloy Wheels',
        'Power Steering',
        'Central Locking',
        'Power Windows',
        'Air Conditioning'
      ],
      additional: [
        'Sunroof',
        'Leather Seats',
        'Premium Audio',
        'Navigation System',
        'Ambient Lighting',
        'Wireless Charging'
      ]
    },
    reviews: {
      overall: 4.3,
      breakdown: {
        performance: 4.2,
        comfort: 4.5,
        mileage: 4.1,
        safety: 4.6,
        features: 4.3
      },
      userReviews: [
        {
          id: 1,
          title: 'Excellent car for city driving',
          description: 'Great fuel efficiency and comfortable interiors.',
          userName: 'Rajesh Kumar',
          rating: 4.5
        },
        {
          id: 2,
          title: 'Value for money',
          description: 'Good features at this price point.',
          userName: 'Priya Sharma',
          rating: 4.0
        }
      ]
    },
    similarVariants: [
      {
        id: 'sportz',
        name: 'Sportz 1.2 Petrol',
        price: 850000,
        keyFeatures: ['Touchscreen', 'Alloy Wheels', 'Climate Control']
      },
      {
        id: 'magna',
        name: 'Magna 1.2 Petrol',
        price: 750000,
        keyFeatures: ['Power Windows', 'Central Locking', 'Music System']
      }
    ],
    faqs: [
      {
        id: 1,
        question: 'What is the mileage of Hyundai i20 Asta 1.2 Petrol?',
        answer: 'The Hyundai i20 Asta 1.2 Petrol delivers a mileage of 20.35 kmpl as per ARAI standards.'
      },
      {
        id: 2,
        question: 'What are the key safety features in this variant?',
        answer: 'This variant comes with 6 airbags, ABS with EBD, Electronic Stability Control, Hill Start Assist, and many other advanced safety features.'
      }
    ]
  }

  // Navigation sections
  const navigationSections = [
    { id: 'header', label: 'Overview' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'price-breakup', label: 'Price Breakup' },
    { id: 'offers', label: 'Offers' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'features', label: 'Features' },
    { id: 'compare', label: 'Compare' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'similar', label: 'Similar' },
    { id: 'emi', label: 'EMI' },
    { id: 'faq', label: 'FAQ' },
    { id: 'feedback', label: 'Feedback' }
  ]

  // Calculate EMI
  const calculateEMI = () => {
    const principal = emiAmount
    const rate = interestRate / 12 / 100
    const time = tenure * 12
    const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1)
    return Math.round(emi)
  }

  // Format price
  const formatPrice = (price: number) => {
    return `₹${(price / 100000).toFixed(2)} Lakh`
  }

  // Scroll spy
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

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Ribbon - Sticky Navigation */}
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

      {/* Variant Header Section */}
      <section 
        id="header" 
        ref={(el) => { sectionRefs.current['header'] = el }}
        className="bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden"
      >
        <div className="bg-white px-4 py-6 md:py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between mb-4 md:mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2">
                  {variantData.fullName}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-3xl font-bold text-green-600">
                    {formatPrice(variantData.price)}
                  </div>
                  <Link href="#price-breakup" className="text-blue-600 hover:text-blue-700 font-medium">
                    On-Road Price →
                  </Link>
                </div>
              </div>
              <button className="p-2 md:p-3 rounded-full text-gray-400 hover:text-gray-600">
                <Heart className="h-6 w-6 md:h-8 md:w-8" />
              </button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center bg-primary-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
                <Star className="h-4 w-4 md:h-5 md:w-5 fill-current mr-1.5 md:mr-2" />
                <span className="font-bold text-base md:text-lg">{variantData.rating}</span>
                <span className="text-xs md:text-sm ml-1.5 md:ml-2">({variantData.reviewCount})</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Get Best Offers
              </button>
              <Link 
                href="#price-breakup"
                className="bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 rounded-lg border border-gray-300 font-semibold transition-colors"
              >
                View Price Breakup
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section 
        id="highlights" 
        ref={(el) => { sectionRefs.current['highlights'] = el }}
        className="bg-white px-4 py-8 border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Highlights</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Fuel className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Mileage</p>
              <p className="font-semibold text-sm">{variantData.keyHighlights.mileage}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Zap className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Fuel Type</p>
              <p className="font-semibold text-sm">{variantData.keyHighlights.fuelType}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Settings className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Transmission</p>
              <p className="font-semibold text-sm">{variantData.keyHighlights.transmission}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Users className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Seating</p>
              <p className="font-semibold text-sm">{variantData.keyHighlights.seating}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Shield className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Safety</p>
              <p className="font-semibold text-sm">{variantData.keyHighlights.safetyRating}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Gauge className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500 mb-1">Engine</p>
              <p className="font-semibold text-sm">{variantData.keyHighlights.engine}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Price Breakup Section */}
      <section 
        id="price-breakup" 
        ref={(el) => { sectionRefs.current['price-breakup'] = el }}
        className="bg-gray-50 px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Price Breakup</h2>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Ex-showroom Price</span>
                <span className="font-semibold">{formatPrice(variantData.priceBreakup.exShowroom)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">RTO Charges</span>
                <span className="font-semibold">{formatPrice(variantData.priceBreakup.rto)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Insurance</span>
                <span className="font-semibold">{formatPrice(variantData.priceBreakup.insurance)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Other Charges</span>
                <span className="font-semibold">{formatPrice(variantData.priceBreakup.others)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Final On-Road Price</span>
                  <span className="text-2xl font-bold text-primary-600">{formatPrice(variantData.priceBreakup.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Offers Section */}
      <section 
        id="offers" 
        ref={(el) => { sectionRefs.current['offers'] = el }}
        className="bg-white px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {variantData.offers.map((offer) => (
              <div key={offer.id} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{offer.title}</h3>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {offer.discount}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{offer.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Valid till: {offer.validTill}</span>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Check Offers
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section 
        id="specifications" 
        ref={(el) => { sectionRefs.current['specifications'] = el }}
        className="bg-gray-50 px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
          <div className="space-y-4">
            {/* Engine & Transmission */}
            <div className="bg-white rounded-lg border border-gray-200">
              <button
                onClick={() => setExpandedSpec(expandedSpec === 'engine' ? null : 'engine')}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="text-lg font-semibold text-gray-900">Engine & Transmission</span>
                {expandedSpec === 'engine' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              {expandedSpec === 'engine' && (
                <div className="px-6 pb-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Displacement</span>
                      <span className="font-medium">{variantData.specifications.engine.displacement}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Max Power</span>
                      <span className="font-medium">{variantData.specifications.engine.maxPower}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Max Torque</span>
                      <span className="font-medium">{variantData.specifications.engine.maxTorque}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Transmission</span>
                      <span className="font-medium">{variantData.specifications.engine.transmission}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dimensions & Weight */}
            <div className="bg-white rounded-lg border border-gray-200">
              <button
                onClick={() => setExpandedSpec(expandedSpec === 'dimensions' ? null : 'dimensions')}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="text-lg font-semibold text-gray-900">Dimensions & Weight</span>
                {expandedSpec === 'dimensions' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              {expandedSpec === 'dimensions' && (
                <div className="px-6 pb-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Length</span>
                      <span className="font-medium">{variantData.specifications.dimensions.length}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Width</span>
                      <span className="font-medium">{variantData.specifications.dimensions.width}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Height</span>
                      <span className="font-medium">{variantData.specifications.dimensions.height}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Boot Space</span>
                      <span className="font-medium">{variantData.specifications.dimensions.bootSpace}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Safety */}
            <div className="bg-white rounded-lg border border-gray-200">
              <button
                onClick={() => setExpandedSpec(expandedSpec === 'safety' ? null : 'safety')}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="text-lg font-semibold text-gray-900">Safety</span>
                {expandedSpec === 'safety' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              {expandedSpec === 'safety' && (
                <div className="px-6 pb-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                    {variantData.specifications.safety.map((feature, index) => (
                      <div key={index} className="flex items-center py-1">
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features" 
        ref={(el) => { sectionRefs.current['features'] = el }}
        className="bg-white px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Standard Features */}
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center">
                <Check className="h-5 w-5 mr-2" />
                Standard Features
              </h3>
              <div className="space-y-2">
                {variantData.features.standard.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-green-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Features */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Additional Features
              </h3>
              <div className="space-y-2">
                {variantData.features.additional.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Plus className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-blue-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compare Variants Section */}
      <section 
        id="compare" 
        ref={(el) => { sectionRefs.current['compare'] = el }}
        className="bg-gray-50 px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Compare Variants</h2>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">Features</th>
                    <th className="text-center py-3 px-4 bg-blue-50">Asta (Current)</th>
                    <th className="text-center py-3 px-4">Sportz</th>
                    <th className="text-center py-3 px-4">Magna</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">Price</td>
                    <td className="py-3 px-4 text-center bg-blue-50 font-semibold">₹9.50 L</td>
                    <td className="py-3 px-4 text-center">₹8.50 L</td>
                    <td className="py-3 px-4 text-center">₹7.50 L</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">Sunroof</td>
                    <td className="py-3 px-4 text-center bg-blue-50"><Check className="h-4 w-4 text-green-600 mx-auto" /></td>
                    <td className="py-3 px-4 text-center"><X className="h-4 w-4 text-red-600 mx-auto" /></td>
                    <td className="py-3 px-4 text-center"><X className="h-4 w-4 text-red-600 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">Wireless Charging</td>
                    <td className="py-3 px-4 text-center bg-blue-50"><Check className="h-4 w-4 text-green-600 mx-auto" /></td>
                    <td className="py-3 px-4 text-center"><X className="h-4 w-4 text-red-600 mx-auto" /></td>
                    <td className="py-3 px-4 text-center"><X className="h-4 w-4 text-red-600 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium">Touchscreen</td>
                    <td className="py-3 px-4 text-center bg-blue-50"><Check className="h-4 w-4 text-green-600 mx-auto" /></td>
                    <td className="py-3 px-4 text-center"><Check className="h-4 w-4 text-green-600 mx-auto" /></td>
                    <td className="py-3 px-4 text-center"><X className="h-4 w-4 text-red-600 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews & Ratings Section */}
      <section 
        id="reviews" 
        ref={(el) => { sectionRefs.current['reviews'] = el }}
        className="bg-white px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews & Ratings</h2>
          
          {/* Overall Rating */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold text-primary-600">{variantData.reviews.overall}</div>
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`h-5 w-5 ${star <= variantData.reviews.overall ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Based on {variantData.reviewCount} reviews</p>
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(variantData.reviews.breakdown).map(([category, rating]) => (
                <div key={category} className="text-center">
                  <div className="text-lg font-semibold text-gray-900">{rating}</div>
                  <div className="text-sm text-gray-600 capitalize">{category}</div>
                </div>
              ))}
            </div>
          </div>

          {/* User Reviews */}
          <div className="space-y-4 mb-6">
            {variantData.reviews.userReviews.map((review) => (
              <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{review.title}</h4>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{review.description}</p>
                <p className="text-sm text-gray-500">- {review.userName}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Read More Reviews
            </button>
          </div>
        </div>
      </section>

      {/* Similar Variants Section */}
      <section 
        id="similar" 
        ref={(el) => { sectionRefs.current['similar'] = el }}
        className="bg-gray-50 px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {variantData.similarVariants.map((variant) => (
              <div key={variant.id} className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{variant.name}</h3>
                <div className="text-2xl font-bold text-primary-600 mb-4">{formatPrice(variant.price)}</div>
                <div className="space-y-2 mb-4">
                  {variant.keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <section 
        id="emi" 
        ref={(el) => { sectionRefs.current['emi'] = el }}
        className="bg-white px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">EMI Calculator</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
                  <input
                    type="range"
                    min="100000"
                    max="1000000"
                    step="10000"
                    value={emiAmount}
                    onChange={(e) => setEmiAmount(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹1L</span>
                    <span className="font-medium text-gray-900">{formatPrice(emiAmount)}</span>
                    <span>₹10L</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
                  <input
                    type="range"
                    min="6"
                    max="15"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>6%</span>
                    <span className="font-medium text-gray-900">{interestRate}%</span>
                    <span>15%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tenure (Years)</label>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    step="1"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1 Year</span>
                    <span className="font-medium text-gray-900">{tenure} Years</span>
                    <span>7 Years</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    ₹{calculateEMI().toLocaleString()}
                  </div>
                  <div className="text-gray-600">Monthly EMI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        id="faq" 
        ref={(el) => { sectionRefs.current['faq'] = el }}
        className="bg-gray-50 px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {variantData.faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg border border-gray-200">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {expandedFAQ === faq.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-4 border-t border-gray-200">
                    <p className="text-gray-700 mt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Feedback Form */}
      <section 
        id="feedback" 
        ref={(el) => { sectionRefs.current['feedback'] = el }}
        className="bg-white px-4 py-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Share Your Feedback</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={feedbackForm.name}
                    onChange={(e) => setFeedbackForm({...feedbackForm, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    value={feedbackForm.mobile}
                    onChange={(e) => setFeedbackForm({...feedbackForm, mobile: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Your mobile number"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comments/Feedback</label>
                <textarea
                  rows={4}
                  value={feedbackForm.comments}
                  onChange={(e) => setFeedbackForm({...feedbackForm, comments: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Share your thoughts about this variant..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Submit Feedback</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Need Expert Advice Section */}
      <section className="bg-primary-600 px-4 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Expert Car Buying Advice?
            </h2>
            <p className="text-primary-100 text-lg mb-8">
              Get personalized recommendations from our car experts. We'll help you choose the perfect variant based on your needs and budget.
            </p>
            <button className="bg-white hover:bg-gray-100 text-primary-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center space-x-2 mx-auto">
              <Phone className="h-6 w-6" />
              <span>Talk to an Expert</span>
            </button>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="bg-gray-100 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-600 text-center">
            *Prices shown are indicative and may vary based on location, offers, and other factors. 
            Please contact your nearest dealer for exact pricing and availability. 
            Specifications and features are subject to change without prior notice.
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
