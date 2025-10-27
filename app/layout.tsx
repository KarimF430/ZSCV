import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://motoroctane.com'),
  title: 'MotorOctane - New Cars in India | Latest Prices, Reviews & Comparisons',
  description: 'Discover new cars in India with AI-powered search. Compare latest prices, detailed specifications, expert reviews, and get the best deals from authorized dealers across India.',
  keywords: 'new cars India, car prices 2024, car specifications, car reviews, car comparison, EMI calculator, car deals, Maruti Suzuki, Hyundai, Tata, Mahindra',
  authors: [{ name: 'MotorOctane' }],
  creator: 'MotorOctane',
  publisher: 'MotorOctane',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://motoroctane.com',
    siteName: 'MotorOctane',
    title: 'MotorOctane - New Cars in India | Latest Prices & Reviews',
    description: 'Discover new cars in India with AI-powered search. Compare latest prices, detailed specifications, and expert reviews from authorized dealers.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MotorOctane - New Cars in India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MotorOctane - New Cars in India | Latest Prices & Reviews',
    description: 'Discover new cars in India with AI-powered search. Compare latest prices, detailed specifications, and expert reviews.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://motoroctane.com',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#dc2626" />
      </head>
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
