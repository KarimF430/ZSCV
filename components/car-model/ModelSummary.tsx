'use client'

import { useState } from 'react'

interface ModelSummaryProps {
  carName: string
  summaryData: {
    description: string[]
    exteriorDesign: string[]
    comfortConvenience: string[]
  }
}

export default function ModelSummary({ carName, summaryData }: ModelSummaryProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showFullExterior, setShowFullExterior] = useState(false)
  const [showFullComfort, setShowFullComfort] = useState(false)

  const visibleDescription = showFullDescription ? summaryData.description : summaryData.description.slice(0, 2)
  const visibleExterior = showFullExterior ? summaryData.exteriorDesign : summaryData.exteriorDesign.slice(0, 2)
  const visibleComfort = showFullComfort ? summaryData.comfortConvenience : summaryData.comfortConvenience.slice(0, 2)

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-4xl font-bold text-gray-700 mb-12">
          {carName} Summary
        </h2>

        {/* Content Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
          {/* Description Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-2 bg-gray-600 rounded-full mr-3"></div>
              Description
            </h3>
            <div className="ml-5 space-y-3">
              {visibleDescription.map((paragraph, index) => (
                <p key={index} className="text-gray-700 text-base leading-relaxed font-normal">
                  {paragraph}
                </p>
              ))}
              {summaryData.description.length > 2 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-red-500 hover:text-red-600 font-normal text-base transition-colors"
                >
                  {showFullDescription ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>
          </div>

          {/* Exterior Design Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-2 bg-gray-600 rounded-full mr-3"></div>
              Exterior Design
            </h3>
            <div className="ml-5 space-y-3">
              {visibleExterior.map((paragraph, index) => (
                <p key={index} className="text-gray-700 text-base leading-relaxed font-normal">
                  {paragraph}
                </p>
              ))}
              {summaryData.exteriorDesign.length > 2 && (
                <button
                  onClick={() => setShowFullExterior(!showFullExterior)}
                  className="text-red-500 hover:text-red-600 font-normal text-base transition-colors"
                >
                  {showFullExterior ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>
          </div>

          {/* Comfort & Convenience Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-2 bg-gray-600 rounded-full mr-3"></div>
              Comfort & Convenience
            </h3>
            <div className="ml-5 space-y-3">
              {visibleComfort.map((paragraph, index) => (
                <p key={index} className="text-gray-700 text-base leading-relaxed font-normal">
                  {paragraph}
                </p>
              ))}
              {summaryData.comfortConvenience.length > 2 && (
                <button
                  onClick={() => setShowFullComfort(!showFullComfort)}
                  className="text-red-500 hover:text-red-600 font-normal text-base transition-colors"
                >
                  {showFullComfort ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
