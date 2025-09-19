'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight, IndianRupee, Calendar, Fuel, Users, MapPin, Sparkles } from 'lucide-react'

interface NewLaunchedCar {
  id: number
  name: string
  brand: string
  image: string
  startingPrice: number
  launchDate: string
  fuelType: string
  seating: number
  mileage: string
  city: string
  slug: string
  isNew: boolean
}

export default function NewLaunchedCars() {
  // Mock new launched cars data
  const newLaunchedCars: NewLaunchedCar[] = [
    {
      id: 1,
      name: 'Grand Vitara',
      brand: 'Maruti Suzuki',
      image: '/cars/grand-vitara.jpg',
      startingPrice: 1099000,
      launchDate: 'January 2024',
      fuelType: 'Petrol/Hybrid',
      seating: 5,
      mileage: '27.97 kmpl',
      city: 'Delhi',
      slug: 'maruti-suzuki-grand-vitara',
      isNew: true
    },
    {
      id: 2,
      name: 'Tucson Facelift',
      brand: 'Hyundai',
      image: '/cars/tucson-facelift.jpg',
      startingPrice: 2999000,
      launchDate: 'February 2024',
      fuelType: 'Petrol/Diesel',
      seating: 5,
      mileage: '16.35 kmpl',
      city: 'Mumbai',
      slug: 'hyundai-tucson-facelift',
      isNew: true
    },
    {
      id: 3,
      name: 'Nexon EV Max',
      brand: 'Tata',
      image: '/cars/nexon-ev-max.jpg',
      startingPrice: 1799000,
      launchDate: 'December 2023',
      fuelType: 'Electric',
      seating: 5,
      mileage: '437 km range',
      city: 'Bangalore',
      slug: 'tata-nexon-ev-max',
      isNew: true
    },
    {
      id: 4,
      name: 'Scorpio Classic',
      brand: 'Mahindra',
      image: '/cars/scorpio-classic.jpg',
      startingPrice: 1399000,
      launchDate: 'January 2024',
      fuelType: 'Diesel',
      seating: 7,
      mileage: '15.8 kmpl',
      city: 'Chennai',
      slug: 'mahindra-scorpio-classic',
      isNew: true
    },
    {
      id: 5,
      name: 'Carens',
      brand: 'Kia',
      image: '/cars/carens.jpg',
      startingPrice: 999000,
      launchDate: 'November 2023',
      fuelType: 'Petrol/Diesel',
      seating: 7,
      mileage: '16.5 kmpl',
      city: 'Pune',
      slug: 'kia-carens',
      isNew: true
    },
    {
      id: 6,
      name: 'City Hybrid',
      brand: 'Honda',
      image: '/cars/city-hybrid.jpg',
      startingPrice: 1899000,
      launchDate: 'February 2024',
      fuelType: 'Hybrid',
      seating: 5,
      mileage: '26.5 kmpl',
      city: 'Hyderabad',
      slug: 'honda-city-hybrid',
      isNew: true
    },
    {
      id: 7,
      name: 'Safari Gold',
      brand: 'Tata',
      image: '/cars/safari-gold.jpg',
      startingPrice: 1699000,
      launchDate: 'December 2023',
      fuelType: 'Diesel',
      seating: 7,
      mileage: '14.08 kmpl',
      city: 'Kolkata',
      slug: 'tata-safari-gold',
      isNew: true
    }
  ]

  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById('new-launched-cars-scroll')
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
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">New Launched Cars</h2>
        
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
            id="new-launched-cars-scroll"
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {newLaunchedCars.map((car) => (
              <Link
                key={car.id}
                href={`/cars/${car.brand.toLowerCase().replace(' ', '-')}/${car.slug}`}
                className="flex-shrink-0 w-72 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                {/* Car Image */}
                <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500 rounded-t-lg flex items-center justify-center relative">
                  <div className="text-center text-white">
                    <div className="w-20 h-12 bg-white/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-xs font-medium">CAR</span>
                    </div>
                    <p className="text-sm opacity-80">{car.brand} {car.name}</p>
                  </div>
                  
                  {/* New Launch Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <Sparkles className="h-3 w-3 mr-1" />
                      NEW
                    </span>
                  </div>
                </div>

                {/* Car Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{car.brand} {car.name}</h3>
                  
                  {/* Launch Date */}
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="text-sm text-blue-600 font-medium">Launched {car.launchDate}</span>
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

                  <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
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
