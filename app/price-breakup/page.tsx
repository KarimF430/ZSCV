import { Metadata } from 'next'
import PriceBreakupTool from '@/components/price/PriceBreakupTool'

export const metadata: Metadata = {
  title: 'Car Price Breakup - Detailed Cost Analysis | MotorOctane',
  description: 'Get detailed price breakup for any car variant including ex-showroom price, RTO charges, insurance, accessories, and total on-road price.',
  keywords: 'car price breakup, on-road price, ex-showroom price, RTO charges, car insurance cost, car price calculator',
  openGraph: {
    title: 'Car Price Breakup - Detailed Cost Analysis | MotorOctane',
    description: 'Get detailed price breakup for any car variant including ex-showroom price, RTO charges, insurance, accessories, and total on-road price.',
    type: 'website',
  },
}

export default function PriceBreakupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Car Price Breakup
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get detailed cost analysis for any car variant including all charges and fees to know the exact on-road price
            </p>
          </div>
        </div>
      </div>

      {/* Price Breakup Tool */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <PriceBreakupTool />
      </div>
    </div>
  )
}
