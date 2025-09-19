'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight, IndianRupee, Fuel, Users, MapPin, Star } from 'lucide-react'

interface Car {
  id: number
  name: string
  brand: string
  image: string
  startingPrice: number
  fuelType: string
  seating: number
  mileage: string
  city: string
  rating: number
  reviewCount: number
  slug: string
}

export default function PopularCars() {
  // Mock popular cars data
  const popularCars: Car[] = [
    {
      id: 1,
      name: 'Swift',
      brand: 'Maruti Suzuki',
      image: '/cars/swift.jpg',
      startingPrice: 585000,
      fuelType: 'Petrol',
      seating: 5,
      mileage: '23.2 kmpl',
      city: 'Delhi',
      rating: 4.2,
      reviewCount: 1247,
      slug: 'maruti-suzuki-swift'
    },
    {
      id: 2,
      name: 'Creta',
      brand: 'Hyundai',
      image: '/cars/creta.jpg',
      startingPrice: 1099000,
      fuelType: 'Petrol/Diesel',
      seating: 5,
      mileage: '17.4 kmpl',
      city: 'Mumbai',
      rating: 4.4,
      reviewCount: 2156,
      slug: 'hyundai-creta'
    },
    {
      id: 3,
      name: 'Baleno',
      brand: 'Maruti Suzuki',
      image: '/cars/baleno.jpg',
      startingPrice: 649000,
      fuelType: 'Petrol',
      seating: 5,
      mileage: '22.35 kmpl',
      city: 'Bangalore',
      rating: 4.1,
      reviewCount: 987,
      slug: 'maruti-suzuki-baleno'
    },
    {
      id: 4,
      name: 'Nexon',
      brand: 'Tata',
      image: '/cars/nexon.jpg',
      startingPrice: 799000,
      fuelType: 'Petrol/Diesel',
      seating: 5,
      mileage: '17.57 kmpl',
      city: 'Chennai',
      rating: 4.3,
      reviewCount: 1543,
      slug: 'tata-nexon'
    },
    {
      id: 5,
      name: 'Seltos',
      brand: 'Kia',
      image: '/cars/seltos.jpg',
      startingPrice: 1099000,
      fuelType: 'Petrol/Diesel',
      seating: 5,
      mileage: '16.8 kmpl',
      city: 'Pune',
      rating: 4.5,
      reviewCount: 1876,
      slug: 'kia-seltos'
    },
    {
      id: 6,
      name: 'i20',
      brand: 'Hyundai',
      image: '/cars/i20.jpg',
      startingPrice: 719000,
      fuelType: 'Petrol',
      seating: 5,
      mileage: '20.35 kmpl',
      city: 'Hyderabad',
      rating: 4.0,
      reviewCount: 834,
      slug: 'hyundai-i20'
    },
    {
      id: 7,
      name: 'Venue',
      brand: 'Hyundai',
      image: '/cars/venue.jpg',
      startingPrice: 759000,
      fuelType: 'Petrol',
      seating: 5,
      mileage: '18.15 kmpl',
      city: 'Kolkata',
      rating: 4.2,
      reviewCount: 1123,
      slug: 'hyundai-venue'
    }
  ]

  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById('popular-cars-scroll')
    if (container) {
      const scrollAmount = 300
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Popular Cars</h2>
        
        {/* Cars Horizontal Scroll */}
        <div className="relative">
          <button
            onClick={() => scrollContainer('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          
          <button
            onClick={() => scrollContainer('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>

          <div
            id="popular-cars-scroll"
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {popularCars.map((car) => (
              <Link
                key={car.id}
                href={`/cars/${car.brand.toLowerCase().replace(' ', '-')}/${car.slug}`}
                className="flex-shrink-0 w-72 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                {/* Car Image */}
                <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-12 bg-white/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-xs font-medium">CAR</span>
                    </div>
                    <p className="text-sm opacity-80">{car.brand} {car.name}</p>
                  </div>
                </div>

                {/* Car Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{car.brand} {car.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">{car.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({car.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="flex items-center text-green-600 font-bold text-lg mb-3">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    <span>{(car.startingPrice / 100000).toFixed(2)} Lakh</span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Fuel className="h-4 w-4 mr-2" />
                      <span>{car.fuelType}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{car.seating} Seater</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-2 text-center text-xs">⛽</span>
                      <span>{car.mileage}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{car.city}</span>
                    </div>
                  </div>

                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
