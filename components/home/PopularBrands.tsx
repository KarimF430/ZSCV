import Link from 'next/link'
import Image from 'next/image'

export default function PopularBrands() {
  const brands = [
    {
      name: 'Maruti Suzuki',
      logo: '/brands/maruti-suzuki.png',
      href: '/cars/maruti-suzuki',
      models: '15+ Models',
      startingPrice: '₹3.54 Lakh',
    },
    {
      name: 'Hyundai',
      logo: '/brands/hyundai.png',
      href: '/cars/hyundai',
      models: '12+ Models',
      startingPrice: '₹5.89 Lakh',
    },
    {
      name: 'Tata',
      logo: '/brands/tata.png',
      href: '/cars/tata',
      models: '10+ Models',
      startingPrice: '₹5.12 Lakh',
    },
    {
      name: 'Mahindra',
      logo: '/brands/mahindra.png',
      href: '/cars/mahindra',
      models: '8+ Models',
      startingPrice: '₹7.49 Lakh',
    },
    {
      name: 'Honda',
      logo: '/brands/honda.png',
      href: '/cars/honda',
      models: '6+ Models',
      startingPrice: '₹7.71 Lakh',
    },
    {
      name: 'Toyota',
      logo: '/brands/toyota.png',
      href: '/cars/toyota',
      models: '8+ Models',
      startingPrice: '₹6.86 Lakh',
    },
    {
      name: 'Kia',
      logo: '/brands/kia.png',
      href: '/cars/kia',
      models: '5+ Models',
      startingPrice: '₹6.79 Lakh',
    },
    {
      name: 'MG',
      logo: '/brands/mg.png',
      href: '/cars/mg',
      models: '4+ Models',
      startingPrice: '₹10.38 Lakh',
    },
  ]

  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Popular Car Brands
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore new cars from India's most trusted automotive brands
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {brands.map((brand, index) => (
            <Link
              key={index}
              href={brand.href}
              className="group bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-4 lg:p-6 text-center transition-all duration-200 hover:shadow-md hover:border-primary-200"
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-primary-50 transition-colors duration-200">
                {/* Placeholder for brand logo */}
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-xs lg:text-sm font-bold text-gray-600">
                    {brand.name.charAt(0)}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm lg:text-base mb-2">
                {brand.name}
              </h3>
              <div className="space-y-1">
                <p className="text-xs lg:text-sm text-gray-600">
                  {brand.models}
                </p>
                <p className="text-xs lg:text-sm font-medium text-primary-600">
                  Starting {brand.startingPrice}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 lg:mt-12">
          <Link
            href="/brands"
            className="inline-flex items-center justify-center px-6 py-3 border border-primary-600 text-base font-medium rounded-lg text-primary-600 hover:bg-primary-600 hover:text-white transition-colors duration-200"
          >
            View All Brands
          </Link>
        </div>
      </div>
    </section>
  )
}
