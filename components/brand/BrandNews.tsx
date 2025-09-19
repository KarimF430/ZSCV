'use client'

import { Calendar, ArrowRight } from 'lucide-react'

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  category: string
  readTime: string
}

interface BrandNewsProps {
  brandName: string
}

export default function BrandNews({ brandName }: BrandNewsProps) {
  const getNewsByBrand = (brand: string): NewsArticle[] => {
    const newsData: Record<string, NewsArticle[]> = {
      maruti: [
        { id: '1', title: 'Maruti Suzuki Grand Vitara Crosses 1 Lakh Sales Milestone', excerpt: 'The hybrid SUV achieves significant sales success in Indian market with strong customer response.', date: '2024-01-15', image: '/news/maruti-1.jpg', category: 'Sales', readTime: '3 min' },
        { id: '2', title: 'New Maruti Swift Facelift Spotted Testing', excerpt: 'Spy shots reveal updated design and features for the upcoming Swift generation.', date: '2024-01-10', image: '/news/maruti-2.jpg', category: 'Launches', readTime: '2 min' },
        { id: '3', title: 'Maruti Announces CNG Expansion Plans', excerpt: 'Company plans to introduce CNG variants across more models in 2024.', date: '2024-01-05', image: '/news/maruti-3.jpg', category: 'Technology', readTime: '4 min' }
      ],
      hyundai: [
        { id: '1', title: 'Hyundai Creta Facelift Launch Date Announced', excerpt: 'The updated Creta will feature new design elements and advanced technology features.', date: '2024-01-12', image: '/news/hyundai-1.jpg', category: 'Launches', readTime: '3 min' },
        { id: '2', title: 'Hyundai Venue N Line Performance Variant Launched', excerpt: 'Sporty variant brings enhanced performance and aggressive styling to the compact SUV.', date: '2024-01-08', image: '/news/hyundai-2.jpg', category: 'Launches', readTime: '2 min' },
        { id: '3', title: 'Hyundai Electric Vehicle Strategy for India', excerpt: 'Company outlines plans for electric mobility and charging infrastructure development.', date: '2024-01-03', image: '/news/hyundai-3.jpg', category: 'Electric', readTime: '5 min' }
      ],
      tata: [
        { id: '1', title: 'Tata Nexon EV Max Range Variant Launched', excerpt: 'New long-range variant offers improved battery capacity and extended driving range.', date: '2024-01-14', image: '/news/tata-1.jpg', category: 'Electric', readTime: '3 min' },
        { id: '2', title: 'Tata Safari Gold Edition Unveiled', excerpt: 'Limited edition variant features exclusive styling and premium interior appointments.', date: '2024-01-09', image: '/news/tata-2.jpg', category: 'Launches', readTime: '2 min' },
        { id: '3', title: 'Tata Motors Wins Global Safety Award', excerpt: 'Company recognized for outstanding safety innovations in automotive industry.', date: '2024-01-06', image: '/news/tata-3.jpg', category: 'Awards', readTime: '4 min' }
      ]
    }
    return newsData[brand] || []
  }

  const news = getNewsByBrand(brandName)

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {news.length === 0 ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Latest {brandName.charAt(0).toUpperCase() + brandName.slice(1)} News
            </h2>
            <p className="text-gray-600 mb-8">
              No news articles available yet. Stay tuned for the latest updates!
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {brandName.charAt(0).toUpperCase() + brandName.slice(1)} News
                </h2>
                <p className="text-gray-600">
                  Latest updates and news about {brandName.charAt(0).toUpperCase() + brandName.slice(1)} cars
                </p>
              </div>
              <button className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-medium">
                View All News
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((article) => (
                <article key={article.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  {/* Article Image */}
                  <div className="relative h-48 bg-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">News Image</span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(article.date).toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                      <span>•</span>
                      <span>{article.readTime} read</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                      Read More
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Mobile View All Button */}
            <div className="mt-8 text-center md:hidden">
              <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                View All News
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
