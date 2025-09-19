import { Metadata } from 'next'
import CarModelPage from '@/components/car-model/CarModelPage'
import { generateCarStructuredData, parseCarFromUrl, generateCanonicalUrl } from '@/utils/carUrlHelpers'

interface PageProps {
  params: {
    brand: string
    model: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand, model } = parseCarFromUrl(params.brand, params.model)
  const fullName = `${brand} ${model}`
  
  // In a real app, you would fetch car data here
  const carData = {
    brand,
    model,
    fullName,
    startingPrice: 619000,
    rating: 4.2,
    reviewCount: 1543,
    image: '/api/placeholder/800/600'
  }

  const canonicalUrl = generateCanonicalUrl(carData)
  const structuredData = generateCarStructuredData(carData)

  return {
    title: `${fullName} Price, Mileage, Reviews, Specifications | MotorOctane`,
    description: `Explore ${fullName} price, mileage, reviews, specifications, variants, colors and more. Get on-road price, EMI calculator, expert reviews and user ratings for ${fullName}.`,
    keywords: `${fullName}, ${brand}, ${model}, price, mileage, review, specifications, variants, colors, on-road price, EMI calculator`,
    openGraph: {
      title: `${fullName} - Complete Car Details | MotorOctane`,
      description: `Discover ${fullName} price, features, specifications, mileage, and expert reviews. Compare variants and get best deals.`,
      images: [carData.image],
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${fullName} - Price, Specs & Reviews`,
      description: `Complete details of ${fullName} including price, mileage, features and expert reviews.`,
      images: [carData.image],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      'application/ld+json': JSON.stringify(structuredData),
    },
  }
}

export default function ModelPage({ params }: PageProps) {
  const { brand, model } = parseCarFromUrl(params.brand, params.model)
  
  const carData = {
    brand,
    model,
    fullName: `${brand} ${model}`,
    startingPrice: 619000,
    endingPrice: 1250000,
    rating: 4.2,
    reviewCount: 1543,
    launchYear: 2023,
    description: `The ${brand} ${model} is a premium vehicle that combines performance, comfort, and advanced technology. With its sleek design and efficient engine, it offers an exceptional driving experience for modern car buyers.`,
    images: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ],
    specifications: {
      engine: '1.5L Petrol',
      power: '103 HP',
      torque: '138 Nm',
      transmission: 'Manual/Automatic',
      fuelType: 'Petrol',
      mileage: '20.5 kmpl',
      seatingCapacity: 5,
      groundClearance: '180 mm',
      bootSpace: '510 L',
      safetyRating: '4 Star',
      airbags: 6,
      abs: true
    },
    colors: [
      { id: '1', name: 'Pearl White', hexCode: '#FFFFFF', popular: true },
      { id: '2', name: 'Metallic Silver', hexCode: '#C0C0C0', popular: true },
      { id: '3', name: 'Deep Black', hexCode: '#000000', popular: false },
      { id: '4', name: 'Royal Blue', hexCode: '#0066CC', popular: false },
      { id: '5', name: 'Crimson Red', hexCode: '#DC143C', popular: true }
    ],
    pros: [
      'Excellent fuel efficiency',
      'Spacious interior',
      'Advanced safety features',
      'Reliable performance',
      'Good resale value'
    ],
    cons: [
      'Limited rear seat space',
      'Road noise at high speeds',
      'Basic infotainment system'
    ],
    mileage: {
      city: '18.5 kmpl',
      highway: '22.5 kmpl',
      combined: '20.5 kmpl'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CarModelPage carData={carData} />
    </div>
  )
}
