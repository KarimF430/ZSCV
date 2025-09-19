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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <HeroSection />
        
        {/* Cars by Budget Section */}
        <CarsByBudget />
        
        {/* Popular Cars Section */}
        <PopularCars />
        
        {/* Ad Space 1 */}
        <div className="py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white text-center">
              <h3 className="font-bold mb-2">Get Best Car Deals</h3>
              <p className="text-sm opacity-90">Compare prices from multiple dealers</p>
            </div>
          </div>
        </div>
        
        {/* Brands Section */}
        <BrandSection />
        
        {/* Upcoming Cars Section */}
        <UpcomingCars />
        
        {/* Ad Space 2 */}
        <div className="py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-4 text-white text-center">
              <h3 className="font-bold mb-2">Car Insurance</h3>
              <p className="text-sm opacity-90">Save up to 85% on car insurance premiums</p>
            </div>
          </div>
        </div>
        
        {/* New Launched Cars Section */}
        <NewLaunchedCars />
        
        {/* Latest Car News Section */}
        <LatestCarNews />
        
        {/* Ad Space 3 */}
        <div className="py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-4 text-white text-center">
              <h3 className="font-bold mb-2">Car Loans</h3>
              <p className="text-sm opacity-90">Get instant approval with lowest interest rates</p>
            </div>
          </div>
        </div>
        
        {/* YouTube Video Player Section */}
        <YouTubeVideoPlayer />
        
        {/* Comparison Box Section */}
        <ComparisonBox />
        
        {/* Consultancy Ad Section */}
        <ConsultancyAd />
        
        {/* Ad Space 4 */}
        <div className="py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-4 text-white text-center">
              <h3 className="font-bold mb-2">Car Accessories</h3>
              <p className="text-sm opacity-90">Premium accessories for your dream car</p>
            </div>
          </div>
        </div>
        
        {/* Main Ad Spaces Component */}
        <AdSpaces />
      </main>
      
      <Footer />
    </div>
  )
}
