'use client'

import Link from 'next/link'
import { ChevronLeft, ChevronRight, IndianRupee, Calendar, Clock, MapPin } from 'lucide-react'

interface UpcomingCar {
  id: number
  name: string
  brand: string
  image: string
  expectedPrice: string
  launchDate: string
  fuelType: string
  bodyType: string
  city: string
  slug: string
  isConfirmed: boolean
}

export default function UpcomingCars() {
  // Mock upcoming cars data
  const upcomingCars: UpcomingCar[] = [
    {
      id: 1,
      name: 'Fronx',
      brand: 'Maruti Suzuki',
      image: '/cars/fronx.jpg',
      expectedPrice: '₹7-12 Lakh',
      launchDate: 'March 2024',
      fuelType: 'Petrol/CNG',
      bodyType: 'SUV',
      city: 'Delhi',
      slug: 'maruti-suzuki-fronx',
      isConfirmed: true
    },
    {
      id: 2,
      name: 'Exter',
      brand: 'Hyundai',
      image: '/cars/exter.jpg',
      expectedPrice: '₹6-10 Lakh',
      launchDate: 'April 2024',
      fuelType: 'Petrol/CNG',
      bodyType: 'SUV',
      city: 'Mumbai',
      slug: 'hyundai-exter',
      isConfirmed: true
    },
    {
      id: 3,
      name: 'Punch EV',
      brand: 'Tata',
      image: '/cars/punch-ev.jpg',
      expectedPrice: '₹10-14 Lakh',
      launchDate: 'May 2024',
      fuelType: 'Electric',
      bodyType: 'SUV',
      city: 'Bangalore',
      slug: 'tata-punch-ev',
      isConfirmed: false
    },
    {
      id: 4,
      name: 'XUV400 Pro',
      brand: 'Mahindra',
      image: '/cars/xuv400-pro.jpg',
      expectedPrice: '₹16-20 Lakh',
      launchDate: 'June 2024',
      fuelType: 'Electric',
      bodyType: 'SUV',
      city: 'Chennai',
      slug: 'mahindra-xuv400-pro',
      isConfirmed: false
    },
    {
      id: 5,
      name: 'Carens Facelift',
      brand: 'Kia',
      image: '/cars/carens-facelift.jpg',
      expectedPrice: '₹10-18 Lakh',
      launchDate: 'July 2024',
      fuelType: 'Petrol/Diesel',
      bodyType: 'MPV',
      city: 'Pune',
      slug: 'kia-carens-facelift',
      isConfirmed: true
    },
    {
      id: 6,
      name: 'Elevate',
      brand: 'Honda',
      image: '/cars/elevate.jpg',
      expectedPrice: '₹11-16 Lakh',
      launchDate: 'August 2024',
      fuelType: 'Petrol',
      bodyType: 'SUV',
      city: 'Hyderabad',
      slug: 'honda-elevate',
      isConfirmed: true
    },
    {
      id: 7,
      name: 'Curvv',
      brand: 'Tata',
      image: '/cars/curvv.jpg',
      expectedPrice: '₹12-18 Lakh',
      launchDate: 'September 2024',
      fuelType: 'Petrol/Electric',
      bodyType: 'SUV Coupe',
      city: 'Kolkata',
      slug: 'tata-curvv',
      isConfirmed: false
    }
  ]

  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById('upcoming-cars-scroll')
    if (container) {
      const scrollAmount = 300
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Upcoming Cars</h2>
        
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
            id="upcoming-cars-scroll"
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {upcomingCars.map((car) => (
              <Link
                key={car.id}
                href={`/cars/${car.brand.toLowerCase().replace(' ', '-')}/${car.slug}`}
                className="flex-shrink-0 w-72 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                {/* Car Image */}
                <div className="h-48 bg-gradient-to-r from-orange-400 to-red-500 rounded-t-lg flex items-center justify-center relative">
                  <div className="text-center text-white">
                    <div className="w-20 h-12 bg-white/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-xs font-medium">CAR</span>
                    </div>
                    <p className="text-sm opacity-80">{car.brand} {car.name}</p>
                  </div>
                  
                  {/* Launch Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      car.isConfirmed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-yellow-500 text-black'
                    }`}>
                      {car.isConfirmed ? 'Confirmed' : 'Expected'}
                    </span>
                  </div>
                </div>

                {/* Car Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{car.brand} {car.name}</h3>
                  
                  <div className="flex items-center text-green-600 font-bold text-lg mb-3">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    <span>{car.expectedPrice}</span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{car.launchDate}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-2 text-center text-xs">⛽</span>
                      <span>{car.fuelType}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{car.bodyType}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{car.city}</span>
                    </div>
                  </div>

                  <button className="w-full mt-4 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
                    Get Notified
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
