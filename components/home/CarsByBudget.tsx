'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, IndianRupee, Fuel, Users, MapPin } from 'lucide-react'

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
  slug: string
}

export default function CarsByBudget() {
  const [selectedBudget, setSelectedBudget] = useState('under-8')

  const budgetRanges = [
    { id: 'under-8', label: 'Under ₹8 Lakh', max: 800000 },
    { id: 'under-15', label: 'Under ₹15 Lakh', max: 1500000 },
    { id: 'under-25', label: 'Under ₹25 Lakh', max: 2500000 },
    { id: 'under-50', label: 'Under ₹50 Lakh', max: 5000000 },
    { id: 'above-50', label: 'Above ₹50 Lakh', max: Infinity }
  ]

  // Mock car data organized by budget
  const carsByBudget = {
    'under-8': [
      {
        id: 1,
        name: 'Alto K10',
        brand: 'Maruti Suzuki',
        image: '/cars/alto-k10.jpg',
        startingPrice: 399000,
        fuelType: 'Petrol',
        seating: 5,
        mileage: '24.39 kmpl',
        city: 'Delhi',
        slug: 'maruti-suzuki-alto-k10'
      },
      {
        id: 2,
        name: 'Kwid',
        brand: 'Renault',
        image: '/cars/kwid.jpg',
        startingPrice: 459000,
        fuelType: 'Petrol',
        seating: 5,
        mileage: '22.3 kmpl',
        city: 'Mumbai',
        slug: 'renault-kwid'
      },
      {
        id: 3,
        name: 'Swift',
        brand: 'Maruti Suzuki',
        image: '/cars/swift.jpg',
        startingPrice: 585000,
        fuelType: 'Petrol',
        seating: 5,
        mileage: '23.2 kmpl',
        city: 'Bangalore',
        slug: 'maruti-suzuki-swift'
      },
      {
        id: 4,
        name: 'Grand i10 Nios',
        brand: 'Hyundai',
        image: '/cars/grand-i10-nios.jpg',
        startingPrice: 565000,
        fuelType: 'Petrol',
        seating: 5,
        mileage: '20.7 kmpl',
        city: 'Chennai',
        slug: 'hyundai-grand-i10-nios'
      },
      {
        id: 5,
        name: 'Wagon R',
        brand: 'Maruti Suzuki',
        image: '/cars/wagon-r.jpg',
        startingPrice: 565000,
        fuelType: 'Petrol/CNG',
        seating: 5,
        mileage: '21.79 kmpl',
        city: 'Pune',
        slug: 'maruti-suzuki-wagon-r'
      }
    ],
    'under-15': [
      {
        id: 6,
        name: 'Baleno',
        brand: 'Maruti Suzuki',
        image: '/cars/baleno.jpg',
        startingPrice: 649000,
        fuelType: 'Petrol',
        seating: 5,
        mileage: '22.35 kmpl',
        city: 'Delhi',
        slug: 'maruti-suzuki-baleno'
      },
      {
        id: 7,
        name: 'i20',
        brand: 'Hyundai',
        image: '/cars/i20.jpg',
        startingPrice: 719000,
        fuelType: 'Petrol',
        seating: 5,
        mileage: '20.35 kmpl',
        city: 'Mumbai',
        slug: 'hyundai-i20'
      },
      {
        id: 8,
        name: 'Venue',
        brand: 'Hyundai',
        image: '/cars/venue.jpg',
        startingPrice: 759000,
        fuelType: 'Petrol',
        seating: 5,
        mileage: '18.15 kmpl',
        city: 'Bangalore',
        slug: 'hyundai-venue'
      },
      {
        id: 9,
        name: 'Nexon',
        brand: 'Tata',
        image: '/cars/nexon.jpg',
        startingPrice: 799000,
        fuelType: 'Petrol/Diesel',
        seating: 5,
        mileage: '17.57 kmpl',
        city: 'Chennai',
        slug: 'tata-nexon'
      },
      {
        id: 10,
        name: 'Sonet',
        brand: 'Kia',
        image: '/cars/sonet.jpg',
        startingPrice: 799000,
        fuelType: 'Petrol/Diesel',
        seating: 5,
        mileage: '18.4 kmpl',
        city: 'Hyderabad',
        slug: 'kia-sonet'
      }
    ],
    'under-25': [
      {
        id: 11,
        name: 'Creta',
        brand: 'Hyundai',
        image: '/cars/creta.jpg',
        startingPrice: 1099000,
        fuelType: 'Petrol/Diesel',
        seating: 5,
        mileage: '17.4 kmpl',
        city: 'Delhi',
        slug: 'hyundai-creta'
      },
      {
        id: 12,
        name: 'Seltos',
        brand: 'Kia',
        image: '/cars/seltos.jpg',
        startingPrice: 1099000,
        fuelType: 'Petrol/Diesel',
        seating: 5,
        mileage: '16.8 kmpl',
        city: 'Mumbai',
        slug: 'kia-seltos'
      },
      {
        id: 13,
        name: 'XUV300',
        brand: 'Mahindra',
        image: '/cars/xuv300.jpg',
        startingPrice: 849000,
        fuelType: 'Petrol/Diesel',
        seating: 5,
        mileage: '17 kmpl',
        city: 'Pune',
        slug: 'mahindra-xuv300'
      },
      {
        id: 14,
        name: 'City',
        brand: 'Honda',
        image: '/cars/city.jpg',
        startingPrice: 1199000,
        fuelType: 'Petrol',
        seating: 5,
        mileage: '17.8 kmpl',
        city: 'Bangalore',
        slug: 'honda-city'
      },
      {
        id: 15,
        name: 'Verna',
        brand: 'Hyundai',
        image: '/cars/verna.jpg',
        startingPrice: 1099000,
        fuelType: 'Petrol',
        seating: 5,
        mileage: '18.45 kmpl',
        city: 'Chennai',
        slug: 'hyundai-verna'
      }
    ],
    'under-50': [
      {
        id: 16,
        name: 'Fortuner',
        brand: 'Toyota',
        image: '/cars/fortuner.jpg',
        startingPrice: 3299000,
        fuelType: 'Petrol/Diesel',
        seating: 7,
        mileage: '10.01 kmpl',
        city: 'Delhi',
        slug: 'toyota-fortuner'
      },
      {
        id: 17,
        name: 'Innova Crysta',
        brand: 'Toyota',
        image: '/cars/innova-crysta.jpg',
        startingPrice: 1699000,
        fuelType: 'Petrol/Diesel',
        seating: 8,
        mileage: '11.25 kmpl',
        city: 'Mumbai',
        slug: 'toyota-innova-crysta'
      },
      {
        id: 18,
        name: 'XUV700',
        brand: 'Mahindra',
        image: '/cars/xuv700.jpg',
        startingPrice: 1399000,
        fuelType: 'Petrol/Diesel',
        seating: 7,
        mileage: '13 kmpl',
        city: 'Bangalore',
        slug: 'mahindra-xuv700'
      },
      {
        id: 19,
        name: 'Compass',
        brand: 'Jeep',
        image: '/cars/compass.jpg',
        startingPrice: 1999000,
        fuelType: 'Petrol/Diesel',
        seating: 5,
        mileage: '14.1 kmpl',
        city: 'Pune',
        slug: 'jeep-compass'
      },
      {
        id: 20,
        name: 'Harrier',
        brand: 'Tata',
        image: '/cars/harrier.jpg',
        startingPrice: 1499000,
        fuelType: 'Diesel',
        seating: 5,
        mileage: '14.63 kmpl',
        city: 'Chennai',
        slug: 'tata-harrier'
      }
    ],
    'above-50': [
      {
        id: 21,
        name: 'GLS',
        brand: 'Mercedes-Benz',
        image: '/cars/mercedes-gls.jpg',
        startingPrice: 8800000,
        fuelType: 'Petrol',
        seating: 7,
        mileage: '9.1 kmpl',
        city: 'Delhi',
        slug: 'mercedes-benz-gls'
      },
      {
        id: 22,
        name: 'X7',
        brand: 'BMW',
        image: '/cars/bmw-x7.jpg',
        startingPrice: 9800000,
        fuelType: 'Petrol/Diesel',
        seating: 7,
        mileage: '9.82 kmpl',
        city: 'Mumbai',
        slug: 'bmw-x7'
      },
      {
        id: 23,
        name: 'Range Rover',
        brand: 'Land Rover',
        image: '/cars/range-rover.jpg',
        startingPrice: 21900000,
        fuelType: 'Petrol',
        seating: 5,
        mileage: '8.1 kmpl',
        city: 'Bangalore',
        slug: 'land-rover-range-rover'
      },
      {
        id: 24,
        name: 'S-Class',
        brand: 'Mercedes-Benz',
        image: '/cars/mercedes-s-class.jpg',
        startingPrice: 15900000,
        fuelType: 'Petrol',
        seating: 5,
        mileage: '10 kmpl',
        city: 'Chennai',
        slug: 'mercedes-benz-s-class'
      },
      {
        id: 25,
        name: 'Cayenne',
        brand: 'Porsche',
        image: '/cars/porsche-cayenne.jpg',
        startingPrice: 13500000,
        fuelType: 'Petrol',
        seating: 5,
        mileage: '9.6 kmpl',
        city: 'Hyderabad',
        slug: 'porsche-cayenne'
      }
    ]
  }

  const currentCars = carsByBudget[selectedBudget as keyof typeof carsByBudget] || []

  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById(`budget-cars-${selectedBudget}`)
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
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Cars by Budget</h2>
        
        {/* Budget Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          {budgetRanges.map((budget) => (
            <button
              key={budget.id}
              onClick={() => setSelectedBudget(budget.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedBudget === budget.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {budget.label}
            </button>
          ))}
        </div>

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
            id={`budget-cars-${selectedBudget}`}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {currentCars.map((car) => (
              <Link
                key={car.id}
                href={`/cars/${car.brand.toLowerCase().replace(' ', '-')}/${car.slug}`}
                className="flex-shrink-0 w-72 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                {/* Car Image */}
                <div className="h-48 bg-gradient-to-r from-gray-300 to-gray-500 rounded-t-lg flex items-center justify-center">
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
