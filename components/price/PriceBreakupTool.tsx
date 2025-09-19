'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Calculator, IndianRupee, FileText, Download, Info } from 'lucide-react'

interface CarVariant {
  id: number
  name: string
  brand: string
  model: string
  exShowroomPrice: number
  fuelType: string
  transmission: string
  engine: string
}

interface PriceBreakup {
  exShowroom: number
  rtoCharges: number
  roadTax: number
  insurance: number
  handling: number
  accessories: number
  extendedWarranty: number
  fastag: number
  totalOnRoad: number
}

export default function PriceBreakupTool() {
  const [selectedCar, setSelectedCar] = useState<CarVariant | null>(null)
  const [selectedCity, setSelectedCity] = useState('Delhi')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCarSelector, setShowCarSelector] = useState(false)
  const [accessories, setAccessories] = useState(0)
  const [extendedWarranty, setExtendedWarranty] = useState(0)
  const [priceBreakup, setPriceBreakup] = useState<PriceBreakup | null>(null)

  // Mock car variants data
  const carVariants: CarVariant[] = [
    {
      id: 1,
      name: 'LXI',
      brand: 'Maruti Suzuki',
      model: 'Swift',
      exShowroomPrice: 585000,
      fuelType: 'Petrol',
      transmission: 'Manual',
      engine: '1197 cc'
    },
    {
      id: 2,
      name: 'VXI',
      brand: 'Maruti Suzuki',
      model: 'Swift',
      exShowroomPrice: 649000,
      fuelType: 'Petrol',
      transmission: 'Manual',
      engine: '1197 cc'
    },
    {
      id: 3,
      name: 'ZXI',
      brand: 'Maruti Suzuki',
      model: 'Swift',
      exShowroomPrice: 746000,
      fuelType: 'Petrol',
      transmission: 'Manual',
      engine: '1197 cc'
    },
    {
      id: 4,
      name: 'ZXI+ AMT',
      brand: 'Maruti Suzuki',
      model: 'Swift',
      exShowroomPrice: 867000,
      fuelType: 'Petrol',
      transmission: 'AMT',
      engine: '1197 cc'
    },
    {
      id: 5,
      name: 'Sportz',
      brand: 'Hyundai',
      model: 'i20',
      exShowroomPrice: 704000,
      fuelType: 'Petrol',
      transmission: 'Manual',
      engine: '1197 cc'
    },
    {
      id: 6,
      name: 'Asta',
      brand: 'Hyundai',
      model: 'i20',
      exShowroomPrice: 1121000,
      fuelType: 'Petrol',
      transmission: 'CVT',
      engine: '1197 cc'
    }
  ]

  const cities = [
    { name: 'Delhi', rtoRate: 0.10, roadTaxRate: 0.04 },
    { name: 'Mumbai', rtoRate: 0.12, roadTaxRate: 0.05 },
    { name: 'Bangalore', rtoRate: 0.11, roadTaxRate: 0.045 },
    { name: 'Chennai', rtoRate: 0.10, roadTaxRate: 0.04 },
    { name: 'Hyderabad', rtoRate: 0.09, roadTaxRate: 0.035 },
    { name: 'Pune', rtoRate: 0.12, roadTaxRate: 0.05 },
    { name: 'Kolkata', rtoRate: 0.08, roadTaxRate: 0.03 }
  ]

  const filteredCars = carVariants.filter(car =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.model.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const calculatePriceBreakup = (car: CarVariant, city: string) => {
    const cityData = cities.find(c => c.name === city) || cities[0]
    const exShowroom = car.exShowroomPrice
    
    // Calculate various charges
    const rtoCharges = Math.round(exShowroom * cityData.rtoRate)
    const roadTax = Math.round(exShowroom * cityData.roadTaxRate)
    const insurance = Math.round(exShowroom * 0.03) // 3% of ex-showroom price
    const handling = 25000 // Fixed handling charges
    const fastag = 500 // Fixed FASTag charges
    
    const totalOnRoad = exShowroom + rtoCharges + roadTax + insurance + handling + accessories + extendedWarranty + fastag

    return {
      exShowroom,
      rtoCharges,
      roadTax,
      insurance,
      handling,
      accessories,
      extendedWarranty,
      fastag,
      totalOnRoad
    }
  }

  useEffect(() => {
    if (selectedCar) {
      const breakup = calculatePriceBreakup(selectedCar, selectedCity)
      setPriceBreakup(breakup)
    }
  }, [selectedCar, selectedCity, accessories, extendedWarranty])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatLakh = (amount: number) => {
    return `₹${(amount / 100000).toFixed(2)} Lakh`
  }

  return (
    <div className="space-y-6">
      {/* Car and City Selection */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Select Car Variant & City</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Car Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Car Variant
            </label>
            <button
              onClick={() => setShowCarSelector(true)}
              className="w-full p-4 border border-gray-300 rounded-lg text-left hover:bg-gray-50 transition-colors duration-200"
            >
              {selectedCar ? (
                <div>
                  <p className="font-semibold text-gray-900">
                    {selectedCar.brand} {selectedCar.model} {selectedCar.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedCar.engine} • {selectedCar.fuelType} • {selectedCar.transmission}
                  </p>
                  <p className="text-sm text-primary-600 font-medium">
                    Ex-showroom: {formatLakh(selectedCar.exShowroomPrice)}
                  </p>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-gray-500">
                  <Search className="h-5 w-5" />
                  <span>Choose a car variant</span>
                </div>
              )}
            </button>
          </div>

          {/* City Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select City
            </label>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
              >
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              <MapPin className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Car Selector Modal */}
      {showCarSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Select Car Variant</h3>
                <button
                  onClick={() => setShowCarSelector(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search car variants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="space-y-3">
                {filteredCars.map((car) => (
                  <button
                    key={car.id}
                    onClick={() => {
                      setSelectedCar(car)
                      setShowCarSelector(false)
                      setSearchQuery('')
                    }}
                    className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-900">
                        {car.brand} {car.model} {car.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {car.engine} • {car.fuelType} • {car.transmission}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary-600">
                        {formatLakh(car.exShowroomPrice)}
                      </p>
                      <p className="text-xs text-gray-500">Ex-showroom</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Optional Additions */}
      {selectedCar && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Optional Additions</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Accessories (₹)
              </label>
              <input
                type="number"
                value={accessories}
                onChange={(e) => setAccessories(Number(e.target.value) || 0)}
                placeholder="Enter accessories cost"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Floor mats, seat covers, music system, etc.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extended Warranty (₹)
              </label>
              <input
                type="number"
                value={extendedWarranty}
                onChange={(e) => setExtendedWarranty(Number(e.target.value) || 0)}
                placeholder="Enter warranty cost"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Additional warranty coverage beyond standard
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Price Breakup */}
      {selectedCar && priceBreakup && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Price Breakup</h2>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {selectedCar.brand} {selectedCar.model} {selectedCar.name}
                </p>
                <p className="text-sm text-gray-600">On-road price in {selectedCity}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {/* Ex-showroom Price */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <IndianRupee className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Ex-showroom Price</p>
                    <p className="text-sm text-gray-500">Base price of the vehicle</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">{formatCurrency(priceBreakup.exShowroom)}</p>
              </div>

              {/* RTO Charges */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">RTO Charges</p>
                    <p className="text-sm text-gray-500">Registration & number plate</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">{formatCurrency(priceBreakup.rtoCharges)}</p>
              </div>

              {/* Road Tax */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Calculator className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Road Tax</p>
                    <p className="text-sm text-gray-500">State government tax</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">{formatCurrency(priceBreakup.roadTax)}</p>
              </div>

              {/* Insurance */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Info className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Insurance</p>
                    <p className="text-sm text-gray-500">Comprehensive coverage (1 year)</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">{formatCurrency(priceBreakup.insurance)}</p>
              </div>

              {/* Handling Charges */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <FileText className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Handling Charges</p>
                    <p className="text-sm text-gray-500">Documentation & processing</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">{formatCurrency(priceBreakup.handling)}</p>
              </div>

              {/* FASTag */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <FileText className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">FASTag</p>
                    <p className="text-sm text-gray-500">Electronic toll collection</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">{formatCurrency(priceBreakup.fastag)}</p>
              </div>

              {/* Accessories (if added) */}
              {accessories > 0 && (
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Accessories</p>
                      <p className="text-sm text-gray-500">Additional accessories</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">{formatCurrency(accessories)}</p>
                </div>
              )}

              {/* Extended Warranty (if added) */}
              {extendedWarranty > 0 && (
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Extended Warranty</p>
                      <p className="text-sm text-gray-500">Additional warranty coverage</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">{formatCurrency(extendedWarranty)}</p>
                </div>
              )}

              {/* Total On-road Price */}
              <div className="flex items-center justify-between py-4 bg-primary-50 rounded-lg px-4 mt-6">
                <div>
                  <p className="text-lg font-bold text-primary-900">Total On-road Price</p>
                  <p className="text-sm text-primary-700">Final price in {selectedCity}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-600">
                    {formatCurrency(priceBreakup.totalOnRoad)}
                  </p>
                  <p className="text-sm text-primary-600">
                    {formatLakh(priceBreakup.totalOnRoad)}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Get Price Quote</span>
              </button>
              <button className="flex-1 bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-6 rounded-lg border border-gray-300 transition-colors duration-200 flex items-center justify-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </button>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Prices are indicative and may vary based on dealer, location, and current offers. 
                RTO charges and road tax rates are subject to state government policies. 
                Contact your nearest dealer for exact pricing and current offers.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!selectedCar && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calculator className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Select a Car Variant
            </h3>
            <p className="text-gray-600 mb-6">
              Choose a car variant to see detailed price breakup including all charges and fees
            </p>
            <button
              onClick={() => setShowCarSelector(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Choose Car Variant
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
