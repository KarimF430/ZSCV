import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/common/Header'

const inter = Inter({ subsets: ['latin'] })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://motoroctane.com'),
  title: 'MotorOctane - New Cars in India | Car Prices, Reviews & Specifications',
  description: 'Find new cars in India with latest prices, specifications, reviews, and comparisons. Explore cars by budget, brand, and fuel type. Get EMI calculator and best deals.',
  keywords: 'new cars India, car prices, car specifications, car reviews, EMI calculator, car comparison, car deals',
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
    title: 'MotorOctane - New Cars in India',
    description: 'Find new cars in India with latest prices, specifications, reviews, and comparisons.',
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
    title: 'MotorOctane - New Cars in India',
    description: 'Find new cars in India with latest prices, specifications, reviews, and comparisons.',
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
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
