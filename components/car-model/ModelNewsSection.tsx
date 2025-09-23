'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, Eye, MessageCircle } from 'lucide-react'

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  views: string
  comments: string
  category: 'Review' | 'Featured' | 'News'
  image: string
}

interface ModelNewsSectionProps {
  carName: string
  newsArticles: NewsArticle[]
}

export default function ModelNewsSection({ carName, newsArticles }: ModelNewsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextArticle = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, newsArticles.length - 1))
  }

  const prevArticle = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, newsArticles.length - 1)) % Math.max(1, newsArticles.length - 1))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Review':
        return 'bg-blue-500'
      case 'Featured':
        return 'bg-purple-500'
      case 'News':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <section className="py-8 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">
            {carName} News
          </h2>
          <button className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center">
            View All News
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* News Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button 
            onClick={prevArticle}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center justify-center group"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
          </button>

          <button 
            onClick={nextArticle}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center justify-center group"
          >
            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-800" />
          </button>

          {/* News Cards */}
          <div className="flex space-x-4 overflow-hidden">
            {newsArticles.slice(currentIndex, currentIndex + 2).map((article) => (
              <div key={article.id} className="flex-1 min-w-0">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden h-full">
                  {/* Article Image */}
                  <div className="relative h-36 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                    {/* Category Badge */}
                    <div className={`absolute top-2 left-2 ${getCategoryColor(article.category)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                      {article.category}
                    </div>
                    
                    {/* News Label */}
                    <div className="text-center text-white px-3">
                      <div className="text-sm font-bold mb-1">NEWS</div>
                      <h3 className="text-xs font-medium leading-tight">
                        {article.title.length > 45 ? article.title.substring(0, 45) + '...' : article.title}
                      </h3>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-3">
                    <h3 className="text-gray-900 font-bold text-sm mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Author and Date */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span className="font-medium">{article.author}</span>
                      <span>{article.date}</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        <span>{article.views}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        <span>{article.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
