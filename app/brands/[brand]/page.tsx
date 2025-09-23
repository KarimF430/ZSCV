import { notFound } from 'next/navigation'
import BrandHeader from '@/components/brand/BrandHeader'
import SEOText from '@/components/brand/SEOText'
import BrandCarsList from '@/components/brand/BrandCarsList'
import BrandUpcomingCars from '@/components/brand/BrandUpcomingCars'
import BrandCompareBox from '@/components/brand/BrandCompareBox'
import AlternativeBrands from '@/components/brand/AlternativeBrands'
import BrandNews from '@/components/brand/BrandNews'
import BrandYouTube from '@/components/brand/BrandYouTube'
import BrandFAQ from '@/components/brand/BrandFAQ'
import BrandUserReviews from '@/components/brand/BrandUserReviews'
import ConsultancyAd from '@/components/home/ConsultancyAd'
import AdSpaces from '@/components/home/AdSpaces'
import FeedbackBox from '@/components/brand/FeedbackBox'
import CarFilters from '@/components/brand/CarFilters'
import Footer from '@/components/Footer'
import PageSection from '@/components/common/PageSection'
import PageHeader from '@/components/common/PageHeader'

interface BrandPageProps {
  params: {
    brand: string
  }
}

// Mock brand data
const brandData = {
  'maruti': {
    name: 'Maruti Suzuki',
    logo: '/brands/maruti.png',
    summary: 'Maruti Suzuki is India\'s largest car manufacturer, known for fuel-efficient, reliable, and affordable vehicles. With over 4 decades of experience, Maruti has been the trusted choice for millions of Indian families.',
    models: ['Alto', 'Swift', 'Baleno', 'Dzire', 'Vitara Brezza', 'Ertiga', 'Ciaz', 'S-Cross', 'XL6', 'Grand Vitara']
  },
  'hyundai': {
    name: 'Hyundai',
    logo: '/brands/hyundai.png',
    summary: 'Hyundai Motor India is the second-largest car manufacturer in India, offering innovative technology, premium features, and stylish designs across various segments from hatchbacks to SUVs.',
    models: ['i10', 'i20', 'Venue', 'Creta', 'Verna', 'Tucson', 'Kona Electric', 'Alcazar']
  },
  'tata': {
    name: 'Tata Motors',
    logo: '/brands/tata.png',
    summary: 'Tata Motors is India\'s leading automotive manufacturer, known for safety, innovation, and robust build quality. From compact cars to luxury SUVs, Tata offers vehicles that combine Indian engineering with global standards.',
    models: ['Tiago', 'Tigor', 'Altroz', 'Nexon', 'Harrier', 'Safari', 'Punch']
  }
}

// Error boundary component
function SafeComponent({ children, name }: { children: React.ReactNode, name: string }) {
  try {
    return <>{children}</>
  } catch (error) {
    console.error(`Error in ${name}:`, error)
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
        <p className="text-red-600">Error loading {name} component</p>
      </div>
    )
  }
}

export default function BrandPage({ params }: BrandPageProps) {
  const brand = brandData[params.brand as keyof typeof brandData]
  
  if (!brand) {
    notFound()
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Brands', href: '/brands' },
    { label: brand.name }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <PageHeader 
          title={`${brand.name} Cars`}
          subtitle={`Explore ${brand.name} car models, prices, and reviews`}
          breadcrumbs={breadcrumbs}
          background="white"
        />
        
        <PageSection background="gray">
          <SafeComponent name="SEOText">
            <SEOText brand={params.brand} />
          </SafeComponent>
        </PageSection>
        
        <PageSection background="white">
          <SafeComponent name="CarFilters">
            <CarFilters />
          </SafeComponent>
        </PageSection>
        
        <PageSection background="gray">
          <SafeComponent name="BrandCarsList">
            <BrandCarsList brand={params.brand} />
          </SafeComponent>
        </PageSection>
        
        <PageSection background="white">
          <SafeComponent name="BrandUpcomingCars">
            <BrandUpcomingCars brandName={params.brand} />
          </SafeComponent>
        </PageSection>
        
        <PageSection background="gray">
          <SafeComponent name="BrandCompareBox">
            <BrandCompareBox brandName={params.brand} />
          </SafeComponent>
        </PageSection>
        
        <PageSection background="white">
          <SafeComponent name="AlternativeBrands">
            <AlternativeBrands currentBrand={params.brand} />
          </SafeComponent>
        </PageSection>
        
        <PageSection background="gray">
          <SafeComponent name="BrandNews">
            <BrandNews brandName={params.brand} />
          </SafeComponent>
        </PageSection>
        
        <PageSection background="white">
          <SafeComponent name="BrandYouTube">
            <BrandYouTube brandName={params.brand} />
          </SafeComponent>
        </PageSection>
        
        <PageSection background="gray">
          <SafeComponent name="BrandFAQ">
            <BrandFAQ brandName={params.brand} />
          </SafeComponent>
        </PageSection>
        
        <PageSection background="white">
          <SafeComponent name="BrandUserReviews">
            <BrandUserReviews brandName={params.brand} />
          </SafeComponent>
        </PageSection>

        <PageSection background="gray">
          <SafeComponent name="ConsultancyAd">
            <ConsultancyAd />
          </SafeComponent>
        </PageSection>

        <PageSection background="white">
          <SafeComponent name="AdSpaces">
            <AdSpaces />
          </SafeComponent>
        </PageSection>

        <PageSection background="gray">
          <SafeComponent name="FeedbackBox">
            <FeedbackBox brandName={params.brand} />
          </SafeComponent>
        </PageSection>
      </main>
      
      <Footer />
    </div>
  )
}
