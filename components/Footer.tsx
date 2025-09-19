import Link from 'next/link'
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">MotorOctane</span>
            </Link>
            <p className="text-gray-300 text-sm">
              Your trusted partner for finding the perfect new car in India. Compare prices, 
              specifications, and get the best deals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/new-cars" className="text-gray-300 hover:text-primary-400">
                  New Cars
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-gray-300 hover:text-primary-400">
                  Compare Cars
                </Link>
              </li>
              <li>
                <Link href="/emi-calculator" className="text-gray-300 hover:text-primary-400">
                  EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-gray-300 hover:text-primary-400">
                  Offers & Deals
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-primary-400">
                  Car News
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Brands */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Popular Brands</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cars/maruti-suzuki" className="text-gray-300 hover:text-primary-400">
                  Maruti Suzuki
                </Link>
              </li>
              <li>
                <Link href="/cars/hyundai" className="text-gray-300 hover:text-primary-400">
                  Hyundai
                </Link>
              </li>
              <li>
                <Link href="/cars/tata" className="text-gray-300 hover:text-primary-400">
                  Tata
                </Link>
              </li>
              <li>
                <Link href="/cars/mahindra" className="text-gray-300 hover:text-primary-400">
                  Mahindra
                </Link>
              </li>
              <li>
                <Link href="/cars/honda" className="text-gray-300 hover:text-primary-400">
                  Honda
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">info@motoroctane.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary-400 mt-0.5" />
                <span className="text-gray-300">
                  123 Business Park, Sector 18<br />
                  Gurgaon, Haryana 122015
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 MotorOctane. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-primary-400">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-primary-400">
                Terms of Service
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-primary-400">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-primary-400">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
