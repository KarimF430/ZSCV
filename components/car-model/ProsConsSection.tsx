'use client'

import { ThumbsUp, ThumbsDown } from 'lucide-react'

interface ProsConsSectionProps {
  pros: string[]
  cons: string[]
  carName: string
}

export default function ProsConsSection({ pros, cons, carName }: ProsConsSectionProps) {
  // Handle undefined or empty arrays
  const validPros = pros || []
  const validCons = cons || []

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {carName || 'Car'} - Pros & Cons
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pros Section */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <ThumbsUp className="h-4 w-4 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-600">Pros</h3>
          </div>

          <div className="space-y-3">
            {validPros.length > 0 ? (
              validPros.map((pro, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-800 leading-relaxed">{pro}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No pros information available</p>
            )}
          </div>
        </div>

        {/* Cons Section */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <ThumbsDown className="h-4 w-4 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-red-600">Cons</h3>
          </div>

          <div className="space-y-3">
            {validCons.length > 0 ? (
              validCons.map((con, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200"
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-800 leading-relaxed">{con}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No cons information available</p>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">{validPros.length}</p>
            <p className="text-sm text-gray-600">Pros</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">{validCons.length}</p>
            <p className="text-sm text-gray-600">Cons</p>
          </div>
        </div>
      </div>
    </div>
  )
}
