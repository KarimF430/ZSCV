'use client'

import { useState } from 'react'
import { Star, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface Car {
  id: number
  name: string
  price: string
  rating: number
  reviews: number
  power: string
  image: string
  isNew?: boolean
  seating: string
  fuelType: string
  transmission: string
  mileage: string
  safetyRating?: string
}

interface BrandCarsListProps {
  brand: string
}

export default function BrandCarsList({ brand }: BrandCarsListProps) {
  // Mock car data based on brand
  const getCarsByBrand = (brand: string): Car[] => {
    const carData: Record<string, Car[]> = {
      maruti: [
        { id: 1, name: 'Swift', price: '₹5.85', reviews: 1247, power: '89 bhp', image: '/cars/maruti-swift.jpg', isNew: false, seating: '5 seater', fuelType: 'Petrol-Diesel-CNG', transmission: 'Manual-Automatic', mileage: '21-15.65 kmpl', rating: 4.5 },
        { id: 2, name: 'Baleno', price: '₹6.61', reviews: 892, power: '89 bhp', image: '/cars/maruti-baleno.jpg', isNew: true, seating: '5 seater', fuelType: 'Petrol-CNG', transmission: 'Manual-CVT', mileage: '22.35 kmpl', rating: 4.3 },
        { id: 3, name: 'Dzire', price: '₹6.57', reviews: 1156, power: '89 bhp', image: '/cars/maruti-dzire.jpg', isNew: false, seating: '5 seater', fuelType: 'Petrol-CNG', transmission: 'Manual-AMT', mileage: '24.12 kmpl', rating: 4.6 },
        { id: 4, name: 'Vitara Brezza', price: '₹8.34', reviews: 743, power: '103 bhp', image: '/cars/maruti-brezza.jpg', isNew: false, seating: '5 seater', fuelType: 'Petrol', transmission: 'Manual-AT', mileage: '17.03 kmpl', rating: 4.4 }
      ],
      hyundai: [
        { id: 5, name: 'Exter', price: '₹6.13', reviews: 654, power: '82 bhp', image: '/cars/hyundai-exter.jpg', isNew: false, seating: '5 seater', fuelType: 'Petrol-Diesel-CNG', transmission: 'Manual-Automatic', mileage: '21-15.65 kmpl', rating: 4.5 },
        { id: 6, name: 'Venue', price: '₹7.94', reviews: 521, power: '82 bhp', image: '/cars/hyundai-venue.jpg', isNew: true, seating: '5 seater', fuelType: 'Petrol-Diesel', transmission: 'Manual-AT', mileage: '18.15 kmpl', rating: 4.5, safetyRating: '5 Star Safety' },
        { id: 7, name: 'Creta', price: '₹11.00', reviews: 892, power: '113 bhp', image: '/cars/hyundai-creta.jpg', isNew: false, seating: '5 seater', fuelType: 'Petrol-Diesel', transmission: 'Manual-AT', mileage: '17.4 kmpl', rating: 4.6 }
      ],
      tata: [
        { id: 8, name: 'Tiago', price: '₹5.65', reviews: 432, power: '85 bhp', image: '/cars/tata-tiago.jpg', isNew: false, seating: '5 seater', fuelType: 'Petrol-CNG', transmission: 'Manual-AMT', mileage: '23.84 kmpl', rating: 4.2 },
        { id: 9, name: 'Nexon', price: '₹7.70', reviews: 743, power: '118 bhp', image: '/cars/tata-nexon.jpg', isNew: true, seating: '5 seater', fuelType: 'Petrol-Diesel-Electric', transmission: 'Manual-AMT', mileage: '17.57 kmpl', rating: 4.5 },
        { id: 10, name: 'Harrier', price: '₹15.49', reviews: 321, power: '168 bhp', image: '/cars/tata-harrier.jpg', isNew: false, seating: '7 seater', fuelType: 'Diesel', transmission: 'Manual-AT', mileage: '16.35 kmpl', rating: 4.4 }
      ],
      mercedes: [
        { id: 11, name: 'C-Class', price: '₹61.00', reviews: 21, power: '197-255 bhp', image: '/cars/mercedes-c-class.jpg', isNew: false, seating: '5 seater', fuelType: 'Petrol', transmission: 'Automatic', mileage: '12.5 kmpl', rating: 4.7 },
        { id: 12, name: 'GLC', price: '₹79.25', reviews: 19, power: '194-255 bhp', image: '/cars/mercedes-glc.jpg', isNew: true, seating: '5 seater', fuelType: 'Petrol', transmission: 'Automatic', mileage: '11.2 kmpl', rating: 4.7, safetyRating: '5 Star Safety' },
        { id: 13, name: 'E-Class', price: '₹78.50', reviews: 16, power: '194-375 bhp', image: '/cars/mercedes-e-class.jpg', isNew: false, seating: '5 seater', fuelType: 'Petrol', transmission: 'Automatic', mileage: '10.8 kmpl', rating: 4.8 }
      ]
    }
    return carData[brand] || []
  }

  const cars = getCarsByBrand(brand)

  return (
    <section className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="space-y-3">
          {cars.map((car) => (
            <div key={car.id} className="bg-white border-b border-gray-200 pb-4 last:border-b-0">
              <div className="flex items-start gap-4">
                {/* Car Image */}
                <div className="w-32 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <div className="text-gray-500 text-xs font-medium text-center px-2">
                      {brand.charAt(0).toUpperCase() + brand.slice(1)} {car.name}
                    </div>
                  </div>
                </div>
                
                {/* Car Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Car Name with Arrow */}
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {brand.charAt(0).toUpperCase() + brand.slice(1)} {car.name}
                        </h3>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-teal-600 fill-current" />
                          <span className="font-semibold text-teal-600 ml-1 text-sm">{car.rating}</span>
                          <span className="text-gray-600 text-xs">/5</span>
                        </div>
                        <span className="text-gray-600 text-xs">{car.reviews} Ratings</span>
                      </div>
                      
                      {/* Specs */}
                      <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                        {car.safetyRating && (
                          <span className="font-medium">{car.safetyRating}</span>
                        )}
                        <span>{car.power}</span>
                      </div>
                      
                      {/* Price */}
                      <div className="mb-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-gray-900">Rs. {car.price} Lakh</span>
                          <span className="text-gray-600 text-sm">onwards</span>
                        </div>
                        <div className="text-xs text-gray-500">Avg. Ex-Showroom price</div>
                      </div>
                      
                      {/* Get Best Offer Button */}
                      <button className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors">
                        Get Best Offer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
