'use client'

import { Play, ExternalLink, Clock, Eye, ThumbsUp } from 'lucide-react'

interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  duration: string
  views: string
  likes: string
  publishedAt: string
  channelName: string
}

export default function YouTubeVideoPlayer() {
  // Mock YouTube videos data
  const featuredVideo: YouTubeVideo = {
    id: 'dQw4w9WgXcQ',
    title: 'Maruti Suzuki Grand Vitara Detailed Review | Hybrid vs Petrol | Which One to Buy?',
    thumbnail: '/youtube/grand-vitara-review.jpg',
    duration: '12:45',
    views: '2.5M',
    likes: '45K',
    publishedAt: '2 days ago',
    channelName: 'MotorOctane'
  }

  const relatedVideos: YouTubeVideo[] = [
    {
      id: 'abc123',
      title: 'Top 5 Cars Under 10 Lakhs in 2024',
      thumbnail: '/youtube/top-5-cars.jpg',
      duration: '8:30',
      views: '1.2M',
      likes: '28K',
      publishedAt: '1 week ago',
      channelName: 'MotorOctane'
    },
    {
      id: 'def456',
      title: 'Electric vs Petrol Cars: Complete Cost Analysis',
      thumbnail: '/youtube/electric-vs-petrol.jpg',
      duration: '15:20',
      views: '890K',
      likes: '19K',
      publishedAt: '3 days ago',
      channelName: 'MotorOctane'
    },
    {
      id: 'ghi789',
      title: 'Hyundai Creta 2024 First Drive Review',
      thumbnail: '/youtube/creta-review.jpg',
      duration: '10:15',
      views: '1.8M',
      likes: '35K',
      publishedAt: '5 days ago',
      channelName: 'MotorOctane'
    }
  ]

  const handleVideoClick = (videoId: string) => {
    // In a real implementation, this would open a modal or navigate to video page
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Latest Videos</h2>
          <a 
            href="https://www.youtube.com/@motoroctane" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-red-600 hover:text-red-700 font-medium"
          >
            Visit Channel
            <ExternalLink className="h-4 w-4 ml-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Video */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Video Thumbnail */}
              <div 
                className="relative h-64 md:h-80 bg-gradient-to-r from-red-500 to-pink-500 cursor-pointer group"
                onClick={() => handleVideoClick(featuredVideo.id)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-4 group-hover:bg-white transition-colors">
                    <Play className="h-8 w-8 text-red-600 fill-current" />
                  </div>
                </div>
                
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
                  {featuredVideo.duration}
                </div>

                {/* Video Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                
                {/* Video Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg line-clamp-2">
                    {featuredVideo.title}
                  </h3>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span className="font-medium text-red-600">{featuredVideo.channelName}</span>
                  <span>{featuredVideo.publishedAt}</span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{featuredVideo.views} views</span>
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{featuredVideo.likes} likes</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{featuredVideo.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Videos */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">More Videos</h3>
            
            {relatedVideos.map((video) => (
              <div 
                key={video.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleVideoClick(video.id)}
              >
                <div className="flex">
                  {/* Video Thumbnail */}
                  <div className="relative w-32 h-20 bg-gradient-to-r from-blue-400 to-purple-500 flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-4 w-4 text-white fill-current" />
                    </div>
                    
                    {/* Duration Badge */}
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white px-1 py-0.5 rounded text-xs">
                      {video.duration}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="flex-1 p-3">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                      {video.title}
                    </h4>
                    
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-red-600 font-medium">{video.channelName}</span>
                        <span>{video.publishedAt}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span>{video.views} views</span>
                        <span>•</span>
                        <span>{video.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Subscribe Button */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <h4 className="font-bold text-gray-900 mb-2">Subscribe to MotorOctane</h4>
              <p className="text-sm text-gray-600 mb-3">
                Get the latest car reviews, comparisons, and buying guides
              </p>
              <a
                href="https://www.youtube.com/@motoroctane?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Subscribe Now
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
