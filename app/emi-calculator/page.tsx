import { Metadata } from 'next'
import EMICalculatorTool from '@/components/emi/EMICalculatorTool'

export const metadata: Metadata = {
  title: 'Car EMI Calculator - Calculate Monthly Payments | MotorOctane',
  description: 'Calculate EMI for any car variant with detailed amortization table. Compare loan options and find the best financing plan for your car purchase.',
  keywords: 'car EMI calculator, car loan calculator, monthly payment calculator, car finance, auto loan EMI, amortization table',
  openGraph: {
    title: 'Car EMI Calculator - Calculate Monthly Payments | MotorOctane',
    description: 'Calculate EMI for any car variant with detailed amortization table. Compare loan options and find the best financing plan for your car purchase.',
    type: 'website',
  },
}

export default function EMICalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Car EMI Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Calculate monthly EMI for any car variant and explore different loan options to find the perfect financing plan
            </p>
          </div>
        </div>
      </div>

      {/* EMI Calculator Tool */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <EMICalculatorTool />
      </div>
    </div>
  )
}
