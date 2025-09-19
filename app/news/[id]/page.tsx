import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ChevronRight, Calendar, Clock, User, Tag, Eye, MessageCircle, Share2, ThumbsUp, BookOpen, Car } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface ArticleDetailPageProps {
  params: {
    id: string
  }
}

// Mock article data - in real app, this would be fetched from database
const getArticleById = (id: string) => {
  const articles = [
    {
      id: '1',
      title: 'Maruti Suzuki Swift 2024 Review: The Perfect City Companion?',
      excerpt: 'We put the new Swift through its paces to see if it maintains its position as India\'s favorite hatchback. Here\'s our comprehensive review.',
      content: `
        <h2>Introduction</h2>
        <p>The Maruti Suzuki Swift has been India's beloved hatchback for over a decade. With the 2024 update, Maruti has introduced several improvements while maintaining the car's core appeal. But does it still deserve the crown in an increasingly competitive segment?</p>
        
        <h2>Design and Exterior</h2>
        <p>The 2024 Swift gets a refreshed front grille, new LED headlamps, and updated bumpers. The side profile remains largely unchanged, maintaining the sporty silhouette that Swift is known for. The rear gets new LED taillamps and a redesigned bumper.</p>
        
        <h2>Interior and Features</h2>
        <p>Inside, the Swift 2024 features a new 9-inch touchscreen infotainment system with wireless Android Auto and Apple CarPlay. The dashboard gets a fresh layout with improved materials. Key features include:</p>
        <ul>
          <li>9-inch touchscreen infotainment</li>
          <li>Wireless smartphone connectivity</li>
          <li>Automatic climate control</li>
          <li>Push button start/stop</li>
          <li>Cruise control</li>
        </ul>
        
        <h2>Engine and Performance</h2>
        <p>The Swift continues with the proven 1.2L K-Series petrol engine producing 89 bhp and 113 Nm of torque. It's available with both 5-speed manual and AMT options. The engine is refined and offers good fuel efficiency of around 23 kmpl.</p>
        
        <h2>Safety</h2>
        <p>Safety has been improved with dual airbags as standard, ABS with EBD, electronic stability program, and hill hold assist. The Swift has received a 4-star Global NCAP rating.</p>
        
        <h2>Verdict</h2>
        <p>The 2024 Swift successfully updates the formula without losing its charm. It remains an excellent choice for city driving with good fuel efficiency, reliable performance, and now better features. At its price point, it's hard to beat.</p>
      `,
      category: 'review',
      author: 'Rajesh Kumar',
      authorBio: 'Senior Automotive Journalist with 15+ years of experience reviewing cars across all segments.',
      authorImage: '/authors/rajesh-kumar.jpg',
      publishedAt: '2024-01-15',
      updatedAt: '2024-01-15',
      readTime: 8,
      views: 15420,
      comments: 23,
      likes: 156,
      tags: ['Maruti Suzuki', 'Swift', 'Hatchback', 'Review', '2024'],
      featuredImage: '/news/swift-2024-review.jpg',
      isFeatured: true,
      isBreaking: false,
      relatedCars: ['Maruti Suzuki Swift'],
      seoTitle: 'Maruti Suzuki Swift 2024 Review - Detailed Test Drive Report',
      seoDescription: 'Comprehensive review of the 2024 Maruti Suzuki Swift. Read our detailed test drive report covering design, features, performance, safety, and verdict.',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Maruti Suzuki Swift 2024 Review: The Perfect City Companion?',
        author: {
          '@type': 'Person',
          name: 'Rajesh Kumar'
        },
        datePublished: '2024-01-15',
        dateModified: '2024-01-15',
        publisher: {
          '@type': 'Organization',
          name: 'MotorOctane'
        }
      }
    }
  ]
  
  return articles.find(article => article.id === id)
}

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
  const article = getArticleById(params.id)
  
  if (!article) {
    return {
      title: 'Article Not Found | MotorOctane'
    }
  }

  return {
    title: article.seoTitle || `${article.title} | MotorOctane`,
    description: article.seoDescription || article.excerpt,
    keywords: article.tags.join(', '),
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: `/news/${params.id}`,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
    alternates: {
      canonical: `/news/${params.id}`,
    },
  }
}

export default function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const article = getArticleById(params.id)

  if (!article) {
    notFound()
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'news': return 'bg-blue-100 text-blue-800'
      case 'review': return 'bg-green-100 text-green-800'
      case 'guide': return 'bg-purple-100 text-purple-800'
      case 'comparison': return 'bg-orange-100 text-orange-800'
      case 'launch': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(article.schema),
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href="/news" className="text-gray-500 hover:text-gray-700">News</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium capitalize">{article.category}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Article Header */}
          <div className="p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getCategoryColor(article.category)}`}>
                {article.category}
              </span>
              {article.isBreaking && (
                <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  BREAKING
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Article Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 border-t border-b border-gray-200">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{article.author}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{new Date(article.publishedAt).toLocaleDateString()}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{article.readTime} min read</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{article.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>{article.likes}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span>{article.comments}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="h-64 md:h-96 bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center">
            <div className="text-center text-white">
              <BookOpen className="h-20 w-20 mx-auto mb-4 opacity-80" />
              <p className="text-lg opacity-80">Article Featured Image</p>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-6 sm:p-8">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-ul:text-gray-700"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Cars */}
            {article.relatedCars && article.relatedCars.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Car className="h-5 w-5 mr-2" />
                  Related Cars
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.relatedCars.map(car => (
                    <Link
                      key={car}
                      href={`/cars/${car.toLowerCase().replace(' ', '-')}`}
                      className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                    >
                      {car}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Social Share */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Share this article</h3>
              <div className="flex space-x-4">
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
                <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Like ({article.likes})
                </button>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">About the Author</h3>
              <div className="flex items-start">
                <div className="h-16 w-16 bg-gray-300 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <User className="h-8 w-8 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{article.author}</h4>
                  <p className="text-gray-600 text-sm">{article.authorBio}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Comments Section Placeholder */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            Comments ({article.comments})
          </h3>
          <p className="text-gray-500">Comments section will be implemented with backend integration.</p>
        </div>

        {/* Related Articles Placeholder */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Related Articles</h3>
          <p className="text-gray-500">Related articles will be displayed here based on tags and category.</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
