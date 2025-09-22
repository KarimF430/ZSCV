'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Bot, Car, Fuel, Users, Calendar, IndianRupee, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// Sample car database
const carDatabase = [
  {
    id: 1,
    brand: 'Maruti Suzuki',
    model: 'Swift',
    variant: 'VXI',
    price: '₹6.49 Lakh',
    priceValue: 649000,
    type: 'Hatchback',
    fuelType: 'Petrol',
    mileage: '23.20 kmpl',
    seating: '5',
    year: '2024',
    image: '/api/placeholder/300/200',
    features: ['ABS', 'Airbags', 'Power Steering', 'AC'],
    description: 'Popular hatchback with excellent fuel efficiency and reliability.'
  },
  {
    id: 2,
    brand: 'Hyundai',
    model: 'Creta',
    variant: 'SX',
    price: '₹12.18 Lakh',
    priceValue: 1218000,
    type: 'SUV',
    fuelType: 'Petrol',
    mileage: '17.4 kmpl',
    seating: '5',
    year: '2024',
    image: '/api/placeholder/300/200',
    features: ['Sunroof', 'Touchscreen', 'Cruise Control', 'Wireless Charging'],
    description: 'Premium compact SUV with advanced features and spacious interior.'
  },
  {
    id: 3,
    brand: 'Tata',
    model: 'Nexon',
    variant: 'XZ+',
    price: '₹9.99 Lakh',
    priceValue: 999000,
    type: 'SUV',
    fuelType: 'Petrol',
    mileage: '17.57 kmpl',
    seating: '5',
    year: '2024',
    image: '/api/placeholder/300/200',
    features: ['5-Star Safety', 'Harman Audio', 'iRA Connected Car'],
    description: 'Safest compact SUV in India with premium features.'
  },
  {
    id: 4,
    brand: 'Honda',
    model: 'City',
    variant: 'VX',
    price: '₹13.16 Lakh',
    priceValue: 1316000,
    type: 'Sedan',
    fuelType: 'Petrol',
    mileage: '17.8 kmpl',
    seating: '5',
    year: '2024',
    image: '/api/placeholder/300/200',
    features: ['Honda SENSING', 'Sunroof', 'Alexa Remote'],
    description: 'Premium sedan with advanced safety and connectivity features.'
  },
  {
    id: 5,
    brand: 'Maruti Suzuki',
    model: 'Alto K10',
    variant: 'VXI',
    price: '₹4.99 Lakh',
    priceValue: 499000,
    type: 'Hatchback',
    fuelType: 'Petrol',
    mileage: '24.39 kmpl',
    seating: '5',
    year: '2024',
    image: '/api/placeholder/300/200',
    features: ['Dual Airbags', 'ABS with EBD', 'Touchscreen'],
    description: 'Most affordable car with excellent fuel efficiency.'
  },
  {
    id: 6,
    brand: 'Mahindra',
    model: 'XUV700',
    variant: 'AX7',
    price: '₹18.99 Lakh',
    priceValue: 1899000,
    type: 'SUV',
    fuelType: 'Petrol',
    mileage: '13.0 kmpl',
    seating: '7',
    year: '2024',
    image: '/api/placeholder/300/200',
    features: ['ADAS', 'Sky Roof', 'Sony 3D Sound', 'Wireless Charging'],
    description: 'Premium 7-seater SUV with advanced driver assistance systems.'
  }
]

export default function AISearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchResults, setSearchResults] = useState(carDatabase)
  const [isLoading, setIsLoading] = useState(true)
  const [aiResponse, setAiResponse] = useState('')

  useEffect(() => {
    // Simulate AI processing
    setIsLoading(true)
    
    setTimeout(() => {
      // Filter cars based on query
      let filteredCars = carDatabase
      
      if (query.toLowerCase().includes('under') && query.toLowerCase().includes('5')) {
        filteredCars = carDatabase.filter(car => car.priceValue <= 500000)
        setAiResponse(`I found ${filteredCars.length} cars under ₹5 Lakh that match your budget. These are excellent entry-level options with good fuel efficiency and reliability.`)
      } else if (query.toLowerCase().includes('suv')) {
        filteredCars = carDatabase.filter(car => car.type === 'SUV')
        setAiResponse(`Here are ${filteredCars.length} SUV options for you. SUVs offer higher ground clearance, spacious interiors, and commanding road presence.`)
      } else if (query.toLowerCase().includes('sedan')) {
        filteredCars = carDatabase.filter(car => car.type === 'Sedan')
        setAiResponse(`I found ${filteredCars.length} sedan cars. Sedans provide excellent comfort, premium features, and a sophisticated driving experience.`)
      } else if (query.toLowerCase().includes('hatchback')) {
        filteredCars = carDatabase.filter(car => car.type === 'Hatchback')
        setAiResponse(`Here are ${filteredCars.length} hatchback options. Hatchbacks are perfect for city driving with excellent fuel efficiency and easy maneuverability.`)
      } else {
        setAiResponse(`Based on your search "${query}", I've found ${filteredCars.length} cars that might interest you. Let me show you the best options available.`)
      }
      
      setSearchResults(filteredCars)
      setIsLoading(false)
    }, 1500)
  }, [query])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              MotorOctane
            </Link>
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  defaultValue={query}
                  placeholder="Describe your perfect car..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* AI Response Section */}
          <div className="lg:col-span-3">
            {/* AI Response Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Assistant</h3>
                  {isLoading ? (
                    <div className="space-y-2">
                      <div className="animate-pulse bg-gray-200 h-4 rounded w-3/4"></div>
                      <div className="animate-pulse bg-gray-200 h-4 rounded w-1/2"></div>
                    </div>
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{aiResponse}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Search Results */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {isLoading ? 'Searching...' : `${searchResults.length} Cars Found`}
              </h2>
              
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <div className="animate-pulse">
                        <div className="flex space-x-4">
                          <div className="bg-gray-200 h-24 w-32 rounded"></div>
                          <div className="flex-1 space-y-2">
                            <div className="bg-gray-200 h-4 rounded w-1/3"></div>
                            <div className="bg-gray-200 h-6 rounded w-1/2"></div>
                            <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {searchResults.map((car) => (
                    <div key={car.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                          {/* Car Image */}
                          <div className="flex-shrink-0">
                            <div className="w-48 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                              <Car className="w-12 h-12 text-gray-400" />
                            </div>
                          </div>
                          
                          {/* Car Details */}
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900">
                                  {car.brand} {car.model}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">{car.variant} • {car.type}</p>
                                <p className="text-gray-700 mb-3">{car.description}</p>
                                
                                {/* Car Specs */}
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                  <div className="flex items-center space-x-1">
                                    <Fuel className="w-4 h-4" />
                                    <span>{car.mileage}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Users className="w-4 h-4" />
                                    <span>{car.seating} Seater</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{car.year}</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Price and Action */}
                              <div className="flex flex-col items-end space-y-3 mt-4 md:mt-0">
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-blue-600">{car.price}</div>
                                  <div className="text-sm text-gray-500">Ex-showroom</div>
                                </div>
                                <Link 
                                  href={`/cars/${car.brand.toLowerCase().replace(' ', '-')}/${car.model.toLowerCase()}`}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                                >
                                  <span>View Details</span>
                                  <ArrowRight className="w-4 h-4" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Refine Search</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Any Budget</option>
                    <option>Under ₹5 Lakh</option>
                    <option>₹5-10 Lakh</option>
                    <option>₹10-15 Lakh</option>
                    <option>Above ₹15 Lakh</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Body Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Types</option>
                    <option>Hatchback</option>
                    <option>Sedan</option>
                    <option>SUV</option>
                    <option>MUV</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Fuels</option>
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>CNG</option>
                    <option>Electric</option>
                  </select>
                </div>
                
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
