'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react'

interface CarData {
  fullName: string
  brand: string
  model: string
}

interface FAQSectionProps {
  carData: CarData
}

export default function FAQSection({ carData }: FAQSectionProps) {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const faqs = [
    {
      id: 1,
      category: 'General',
      question: `What is the on-road price of ${carData.fullName}?`,
      answer: `The on-road price of ${carData.fullName} varies by city and variant. The base variant starts from approximately ₹6.19 lakh (ex-showroom) and can go up to ₹8.90 lakh for the top variant. On-road prices include registration, insurance, and other charges which vary by state. Use our price calculator to get exact on-road prices for your city.`
    },
    {
      id: 2,
      category: 'Performance',
      question: `What is the mileage of ${carData.fullName}?`,
      answer: `The ${carData.fullName} delivers an ARAI-certified mileage of 23.26 kmpl for the manual transmission variant. Real-world mileage typically ranges between 19-21 kmpl in city conditions and 24-26 kmpl on highways, depending on driving conditions, traffic, and driving style.`
    },
    {
      id: 3,
      category: 'Features',
      question: `What are the key features of ${carData.fullName}?`,
      answer: `Key features include SmartPlay Pro+ infotainment system with 7-inch touchscreen, Android Auto & Apple CarPlay, automatic climate control, push-button start/stop, cruise control, steering-mounted controls, premium interior with fabric upholstery, and advanced safety features like dual airbags, ABS with EBD, and electronic stability program.`
    },
    {
      id: 4,
      category: 'Safety',
      question: `How safe is the ${carData.fullName}?`,
      answer: `The ${carData.fullName} has received a 4-star safety rating from Global NCAP. It comes with standard safety features including dual front airbags, ABS with EBD, electronic brake-force distribution, ISOFIX child seat anchors, reverse parking sensors, and a strong body structure designed to absorb impact energy effectively.`
    },
    {
      id: 5,
      category: 'Maintenance',
      question: `What is the maintenance cost of ${carData.fullName}?`,
      answer: `The ${carData.fullName} has relatively low maintenance costs. Service intervals are every 10,000 km or 12 months. Average annual maintenance cost ranges from ₹8,000-12,000 depending on usage. The widespread service network ensures easy availability of spare parts and affordable service costs across India.`
    },
    {
      id: 6,
      category: 'Variants',
      question: `How many variants are available in ${carData.fullName}?`,
      answer: `The ${carData.fullName} is available in 7 variants across different trim levels: LXI, VXI, VXI+, ZXI, ZXI+, AMT variants, and special editions. Each variant offers different feature sets and pricing to cater to various customer preferences and budgets.`
    },
    {
      id: 7,
      category: 'Engine',
      question: `What engine does the ${carData.fullName} use?`,
      answer: `The ${carData.fullName} is powered by a 1.2-liter K-Series petrol engine that produces 82 bhp of power and 113 Nm of torque. This refined engine features Variable Valve Timing (VVT) technology and is known for its smooth performance, fuel efficiency, and reliability.`
    },
    {
      id: 8,
      category: 'Comparison',
      question: `How does ${carData.fullName} compare with competitors?`,
      answer: `Compared to rivals like Hyundai i20, Tata Altroz, and Honda Jazz, the ${carData.fullName} offers competitive pricing, excellent fuel efficiency, proven reliability, and strong resale value. It stands out for its balanced combination of features, performance, and affordability in the premium hatchback segment.`
    },
    {
      id: 9,
      category: 'Financing',
      question: `What are the EMI options for ${carData.fullName}?`,
      answer: `EMI for ${carData.fullName} starts from approximately ₹11,500 per month for a 7-year loan tenure with standard down payment. Various financing options are available through banks, NBFCs, and manufacturer financing schemes. Interest rates typically range from 8.5% to 12% depending on your credit profile.`
    },
    {
      id: 10,
      category: 'Availability',
      question: `What is the waiting period for ${carData.fullName}?`,
      answer: `Current waiting period for ${carData.fullName} varies by variant and location. Popular variants typically have a waiting period of 2-6 weeks, while specific colors or top variants might take 6-10 weeks. Contact your nearest dealer for exact delivery timelines in your area.`
    }
  ]

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))]
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleFAQ = (faqId: number) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <HelpCircle className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Get answers to common questions about {carData.fullName}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-8">
            <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No FAQs found matching your search.</p>
          </div>
        ) : (
          filteredFAQs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                      {faq.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-left">
                    {faq.question}
                  </h3>
                </div>
                {expandedFAQ === faq.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {expandedFAQ === faq.id && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed pt-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">{faqs.length}</p>
            <p className="text-sm text-gray-600">Total Questions</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{categories.length - 1}</p>
            <p className="text-sm text-gray-600">Categories</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">24/7</p>
            <p className="text-sm text-gray-600">Support Available</p>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 mb-3">
          Didn't find what you're looking for?
        </p>
        <div className="flex justify-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Contact Support
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            Request Callback
          </button>
        </div>
      </div>
    </div>
  )
}
