'use client'

import { Play, ArrowRight } from 'lucide-react'

interface Video {
  id: string
  title: string
  thumbnail: string
  duration: string
  views: string
  uploadDate: string
  description: string
}

interface BrandYouTubeProps {
  brandName: string
}

export default function BrandYouTube({ brandName }: BrandYouTubeProps) {
  const getVideosByBrand = (brand: string): Video[] => {
    const videoData: Record<string, Video[]> = {
      maruti: [
        { id: '1', title: 'Maruti Grand Vitara Detailed Review', thumbnail: '/videos/maruti-1.jpg', duration: '12:45', views: '2.5M', uploadDate: '2024-01-10', description: 'Complete review of the hybrid SUV with performance tests' },
        { id: '2', title: 'Maruti Swift vs Baleno Comparison', thumbnail: '/videos/maruti-2.jpg', duration: '15:30', views: '1.8M', uploadDate: '2024-01-05', description: 'Head-to-head comparison of popular hatchbacks' },
        { id: '3', title: 'Maruti Dzire Long Term Review', thumbnail: '/videos/maruti-3.jpg', duration: '18:20', views: '3.2M', uploadDate: '2023-12-28', description: 'After 50,000 km ownership experience' }
      ],
      hyundai: [
        { id: '1', title: 'Hyundai Creta 2024 First Drive', thumbnail: '/videos/hyundai-1.jpg', duration: '14:15', views: '4.1M', uploadDate: '2024-01-12', description: 'First drive review of the updated Creta' },
        { id: '2', title: 'Hyundai Venue N Line Track Test', thumbnail: '/videos/hyundai-2.jpg', duration: '10:45', views: '1.5M', uploadDate: '2024-01-08', description: 'Performance testing on the race track' },
        { id: '3', title: 'Hyundai i20 Buying Guide', thumbnail: '/videos/hyundai-3.jpg', duration: '13:30', views: '2.8M', uploadDate: '2024-01-03', description: 'Which variant to buy and why' }
      ],
      tata: [
        { id: '1', title: 'Tata Nexon EV Real World Range Test', thumbnail: '/videos/tata-1.jpg', duration: '16:40', views: '3.5M', uploadDate: '2024-01-14', description: 'Highway and city driving range test' },
        { id: '2', title: 'Tata Safari vs Mahindra XUV700', thumbnail: '/videos/tata-2.jpg', duration: '20:15', views: '5.2M', uploadDate: '2024-01-09', description: 'Ultimate SUV comparison battle' },
        { id: '3', title: 'Tata Harrier Safety Features Explained', thumbnail: '/videos/tata-3.jpg', duration: '11:25', views: '1.9M', uploadDate: '2024-01-06', description: 'Detailed look at safety technologies' }
      ]
    }
    return videoData[brand] || []
  }

  const videos = getVideosByBrand(brandName)

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {videos.length === 0 ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {brandName.charAt(0).toUpperCase() + brandName.slice(1)} Videos
            </h2>
            <p className="text-gray-600 mb-8">
              No videos available yet. Check back soon for the latest reviews and updates!
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {brandName.charAt(0).toUpperCase() + brandName.slice(1)} Videos
                </h2>
                <p className="text-gray-600">
                  Watch detailed reviews and comparisons of {brandName.charAt(0).toUpperCase() + brandName.slice(1)} cars
                </p>
              </div>
              <button className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-medium">
                View All Videos
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="group cursor-pointer">
                  <div className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                    {/* Video Thumbnail */}
                    <div className="relative">
                      <div className="aspect-video bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Video Thumbnail</span>
                      </div>
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Play className="h-6 w-6 text-white ml-1" fill="currentColor" />
                        </div>
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute bottom-3 right-3 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-xs font-medium">
                        {video.duration}
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {video.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{video.views} views</span>
                        <span>{new Date(video.uploadDate).toLocaleDateString('en-IN', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile View All Button */}
            <div className="mt-8 text-center md:hidden">
              <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                View All Videos
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
