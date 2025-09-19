import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import NewsListing from '@/components/news/NewsListing'

export const metadata: Metadata = {
  title: 'Car News, Reviews & Expert Insights | MotorOctane',
  description: 'Stay updated with the latest car news, expert reviews, buying guides, and automotive insights. Get comprehensive coverage of new car launches, industry trends, and expert opinions.',
  keywords: 'car news, car reviews, automotive news, car buying guide, new car launches, car industry news, expert car reviews, automobile news',
  openGraph: {
    title: 'Car News, Reviews & Expert Insights',
    description: 'Stay updated with the latest car news, expert reviews, buying guides, and automotive insights.',
    type: 'website',
    url: '/news',
  },
  alternates: {
    canonical: '/news',
  },
}

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Car News & Reviews
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                Stay ahead with the latest automotive news, expert reviews, and comprehensive 
                buying guides from our team of car experts.
              </p>
            </div>
          </div>
        </div>

        {/* News Listing */}
        <NewsListing />
      </main>

      <Footer />
    </div>
  )
}
