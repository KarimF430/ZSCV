import Footer from '@/components/Footer'
import HeroSection from '@/components/home/HeroSection'
import CarsByBudget from '@/components/home/CarsByBudget'
import PopularCars from '@/components/home/PopularCars'
import BrandSection from '@/components/home/BrandSection'
import UpcomingCars from '@/components/home/UpcomingCars'
import NewLaunchedCars from '@/components/home/NewLaunchedCars'
import LatestCarNews from '@/components/home/LatestCarNews'
import YouTubeVideoPlayer from '@/components/home/YouTubeVideoPlayer'
import ComparisonBox from '@/components/home/ComparisonBox'
import ConsultancyAd from '@/components/home/ConsultancyAd'
import AdSpaces from '@/components/home/AdSpaces'
import PageSection from '@/components/common/PageSection'
import Card from '@/components/common/Card'
import CarComparison from '@/components/common/CarComparison'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <HeroSection />
        
        <PageSection background="gray">
          <CarsByBudget />
        </PageSection>
        
        <PageSection background="white">
          <PopularCars />
        </PageSection>
        
        <PageSection background="gray">
          <Card className="text-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Get Best Car Deals</h3>
              <p className="opacity-90">Compare prices from multiple dealers</p>
            </div>
          </Card>
        </PageSection>
        
        <PageSection background="white">
          <BrandSection />
        </PageSection>
        
        <PageSection background="gray">
          <UpcomingCars />
        </PageSection>
        
        <PageSection background="white">
          <Card className="text-center">
            <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Car Insurance</h3>
              <p className="opacity-90">Save up to 85% on car insurance premiums</p>
            </div>
          </Card>
        </PageSection>
        
        <PageSection background="gray">
          <NewLaunchedCars />
        </PageSection>
        
        <PageSection background="white">
          <LatestCarNews />
        </PageSection>
        
        <PageSection background="gray">
          <Card className="text-center">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Car Loans</h3>
              <p className="opacity-90">Get instant approval with lowest interest rates</p>
            </div>
          </Card>
        </PageSection>
        
        <PageSection background="white">
          <YouTubeVideoPlayer />
        </PageSection>
        
        <PageSection background="gray">
          <ComparisonBox />
        </PageSection>
        
        <CarComparison 
          title="Compare Popular Cars"
          backgroundColor="white"
        />
        
        <PageSection background="white">
          <ConsultancyAd />
        </PageSection>
        
        <PageSection background="gray">
          <AdSpaces />
        </PageSection>
      </main>
      
      <Footer />
    </div>
  )
}
