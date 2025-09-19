import { Metadata } from 'next'
import CompareCarsTool from '@/components/compare/CompareCarsTool'

export const metadata: Metadata = {
  title: 'Compare Cars - Find the Best Car for You | MotorOctane',
  description: 'Compare up to 4 cars side by side. Compare prices, specifications, features, mileage, and more to make the right choice.',
  keywords: 'compare cars, car comparison, car specs, car prices, best car, car features',
  openGraph: {
    title: 'Compare Cars - Find the Best Car for You | MotorOctane',
    description: 'Compare up to 4 cars side by side. Compare prices, specifications, features, mileage, and more to make the right choice.',
    type: 'website',
  },
}

export default function CompareCarsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Compare Cars
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Compare up to 4 cars side by side to find the perfect match for your needs and budget
            </p>
          </div>
        </div>
      </div>

      {/* Compare Tool */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <CompareCarsTool />
      </div>
    </div>
  )
}
