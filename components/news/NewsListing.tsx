'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, Calendar, Clock, User, Tag, TrendingUp, Eye, MessageCircle, Share2, ChevronRight } from 'lucide-react'

interface Article {
  id: number
  title: string
  excerpt: string
  content: string
  category: 'news' | 'review' | 'guide' | 'comparison' | 'launch'
  author: string
  publishedAt: string
  readTime: number
  views: number
  comments: number
  tags: string[]
  featuredImage: string
  isFeatured: boolean
  isBreaking: boolean
  relatedCars?: string[]
}

export default function NewsListing() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Mock articles data
  const articles: Article[] = [
    {
      id: 1,
      title: 'Maruti Suzuki Swift 2024 Review: The Perfect City Companion?',
      excerpt: 'We put the new Swift through its paces to see if it maintains its position as India\'s favorite hatchback. Here\'s our comprehensive review.',
      content: 'Full article content...',
      category: 'review',
      author: 'Rajesh Kumar',
      publishedAt: '2024-01-15',
      readTime: 8,
      views: 15420,
      comments: 23,
      tags: ['Maruti Suzuki', 'Swift', 'Hatchback', 'Review', '2024'],
      featuredImage: '/news/swift-2024-review.jpg',
      isFeatured: true,
      isBreaking: false,
      relatedCars: ['Maruti Suzuki Swift']
    },
    {
      id: 2,
      title: 'BREAKING: Tata Motors Announces Electric Nexon EV Max with 400km Range',
      excerpt: 'Tata Motors has officially unveiled the Nexon EV Max with an impressive 400km range, setting new benchmarks in the electric vehicle segment.',
      content: 'Full article content...',
      category: 'news',
      author: 'Priya Sharma',
      publishedAt: '2024-01-14',
      readTime: 5,
      views: 28750,
      comments: 45,
      tags: ['Tata', 'Nexon EV', 'Electric', 'Launch', 'Breaking'],
      featuredImage: '/news/nexon-ev-max.jpg',
      isFeatured: true,
      isBreaking: true,
      relatedCars: ['Tata Nexon EV']
    },
    {
      id: 3,
      title: 'Car Buying Guide 2024: Best Cars Under ₹10 Lakh',
      excerpt: 'Planning to buy a car under ₹10 lakh? Our comprehensive guide covers the best options across different segments with detailed comparisons.',
      content: 'Full article content...',
      category: 'guide',
      author: 'Amit Verma',
      publishedAt: '2024-01-13',
      readTime: 12,
      views: 19650,
      comments: 31,
      tags: ['Buying Guide', 'Budget Cars', 'Under 10 Lakh', '2024'],
      featuredImage: '/news/best-cars-under-10-lakh.jpg',
      isFeatured: false,
      isBreaking: false
    },
    {
      id: 4,
      title: 'Hyundai Creta vs Kia Seltos: Which SUV Should You Buy?',
      excerpt: 'Both SUVs dominate the compact SUV segment, but which one offers better value? We compare features, performance, and pricing.',
      content: 'Full article content...',
      category: 'comparison',
      author: 'Sneha Patel',
      publishedAt: '2024-01-12',
      readTime: 10,
      views: 22340,
      comments: 38,
      tags: ['Hyundai Creta', 'Kia Seltos', 'SUV', 'Comparison'],
      featuredImage: '/news/creta-vs-seltos.jpg',
      isFeatured: false,
      isBreaking: false,
      relatedCars: ['Hyundai Creta', 'Kia Seltos']
    },
    {
      id: 5,
      title: 'Honda City Hybrid Launched in India: Price, Features & Specifications',
      excerpt: 'Honda introduces the City Hybrid with impressive fuel efficiency and premium features. Here\'s everything you need to know about pricing and specs.',
      content: 'Full article content...',
      category: 'launch',
      author: 'Vikram Singh',
      publishedAt: '2024-01-11',
      readTime: 6,
      views: 18920,
      comments: 27,
      tags: ['Honda City', 'Hybrid', 'Launch', 'Fuel Efficiency'],
      featuredImage: '/news/honda-city-hybrid.jpg',
      isFeatured: false,
      isBreaking: false,
      relatedCars: ['Honda City']
    },
    {
      id: 6,
      title: 'Top 5 Safety Features Every Car Should Have in 2024',
      excerpt: 'Safety should be your top priority when buying a car. Here are the essential safety features that every modern car should offer.',
      content: 'Full article content...',
      category: 'guide',
      author: 'Dr. Kavita Rao',
      publishedAt: '2024-01-10',
      readTime: 7,
      views: 14580,
      comments: 19,
      tags: ['Safety', 'Car Features', 'Guide', '2024'],
      featuredImage: '/news/car-safety-features.jpg',
      isFeatured: false,
      isBreaking: false
    }
  ]

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'news', label: 'News' },
    { value: 'review', label: 'Reviews' },
    { value: 'guide', label: 'Buying Guides' },
    { value: 'comparison', label: 'Comparisons' },
    { value: 'launch', label: 'New Launches' }
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'news': return <TrendingUp className="h-4 w-4" />
      case 'review': return <Eye className="h-4 w-4" />
      case 'guide': return <Tag className="h-4 w-4" />
      case 'comparison': return <MessageCircle className="h-4 w-4" />
      case 'launch': return <Calendar className="h-4 w-4" />
      default: return <Tag className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'news': return 'bg-gradient-to-r from-red-100 to-orange-100 text-red-800'
      case 'review': return 'bg-green-100 text-green-800'
      case 'guide': return 'bg-purple-100 text-purple-800'
      case 'comparison': return 'bg-orange-100 text-orange-800'
      case 'launch': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = !selectedCategory || article.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const featuredArticles = filteredArticles.filter(article => article.isFeatured)
  const regularArticles = filteredArticles.filter(article => !article.isFeatured)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, reviews, and guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        {/* Category Filter */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block mt-4 pt-4 border-t border-gray-200 lg:border-t-0 lg:pt-0 lg:mt-4`}>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Breaking News */}
      {articles.some(article => article.isBreaking) && (
        <div className="mb-8">
          <div className="bg-red-600 text-white rounded-lg p-4">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 mr-2" />
              <span className="font-bold text-sm">BREAKING NEWS</span>
            </div>
            {articles
              .filter(article => article.isBreaking)
              .slice(0, 1)
              .map(article => (
                <div key={article.id}>
                  <h3 className="text-lg font-bold mb-1">{article.title}</h3>
                  <p className="text-red-100 text-sm">{article.excerpt}</p>
                  <Link
                    href={`/news/${article.id}`}
                    className="inline-flex items-center text-white hover:text-red-100 font-medium mt-2"
                  >
                    Read Full Story
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Stories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredArticles.map(article => (
              <article key={article.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Calendar className="h-16 w-16 mx-auto mb-2 opacity-80" />
                      <p className="text-sm opacity-80">Featured Article</p>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getCategoryColor(article.category)}`}>
                      {getCategoryIcon(article.category)}
                      <span className="ml-1 capitalize">{article.category}</span>
                    </span>
                  </div>
                  {article.isBreaking && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        BREAKING
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-4">{article.author}</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{new Date(article.publishedAt).toLocaleDateString()}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{article.readTime} min read</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye className="h-4 w-4 mr-1" />
                      <span className="mr-3">{article.views.toLocaleString()}</span>
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span>{article.comments}</span>
                    </div>
                    <Link
                      href={`/news/${article.id}`}
                      className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-orange-600 transition-colors font-medium"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Regular Articles */}
      {regularArticles.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {featuredArticles.length > 0 ? 'Latest Articles' : 'All Articles'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map(article => (
              <article key={article.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="h-32 bg-gradient-to-r from-gray-300 to-gray-500 flex items-center justify-center">
                    <Calendar className="h-12 w-12 text-white opacity-80" />
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium flex items-center ${getCategoryColor(article.category)}`}>
                      {getCategoryIcon(article.category)}
                      <span className="ml-1 capitalize">{article.category}</span>
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>

                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <User className="h-3 w-3 mr-1" />
                    <span className="mr-2">{article.author}</span>
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{article.readTime} min</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Eye className="h-3 w-3 mr-1" />
                      <span className="mr-2">{(article.views / 1000).toFixed(1)}k</span>
                      <MessageCircle className="h-3 w-3 mr-1" />
                      <span>{article.comments}</span>
                    </div>
                    <Link
                      href={`/news/${article.id}`}
                      className="text-red-600 hover:text-orange-600 text-sm font-medium"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search terms or category filters to find more articles.
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('')
            }}
            className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-orange-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
