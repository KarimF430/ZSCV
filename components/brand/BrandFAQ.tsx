'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQ {
  id: string
  question: string
  answer: string
}

interface BrandFAQProps {
  brandName: string
}

export default function BrandFAQ({ brandName }: BrandFAQProps) {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  const getFAQsByBrand = (brand: string): FAQ[] => {
    const faqData: Record<string, FAQ[]> = {
      maruti: [
        { id: '1', question: `What is the price range of ${brand.charAt(0).toUpperCase() + brand.slice(1)} cars?`, answer: `${brand.charAt(0).toUpperCase() + brand.slice(1)} cars are available in a wide price range starting from ₹3.99 lakh for Alto K10 and going up to ₹19.65 lakh for Grand Vitara, making them accessible to various budget segments.` },
        { id: '2', question: `Which ${brand.charAt(0).toUpperCase() + brand.slice(1)} car has the best mileage?`, answer: `The ${brand.charAt(0).toUpperCase() + brand.slice(1)} Grand Vitara Hybrid offers the best mileage with up to 27.97 kmpl, followed by Alto K10 with 24.39 kmpl and Dzire with 24.12 kmpl.` },
        { id: '3', question: `Are ${brand.charAt(0).toUpperCase() + brand.slice(1)} cars reliable?`, answer: `Yes, ${brand.charAt(0).toUpperCase() + brand.slice(1)} cars are known for their reliability, low maintenance costs, and excellent after-sales service network across India with over 3,000 service centers.` },
        { id: '4', question: `Which ${brand.charAt(0).toUpperCase() + brand.slice(1)} car is best for families?`, answer: `For families, the ${brand.charAt(0).toUpperCase() + brand.slice(1)} Ertiga and XL6 are excellent choices for larger families, while Swift, Baleno, and Dzire are perfect for small to medium families.` },
        { id: '5', question: `Do ${brand.charAt(0).toUpperCase() + brand.slice(1)} cars have good resale value?`, answer: `${brand.charAt(0).toUpperCase() + brand.slice(1)} cars typically have excellent resale value due to their popularity, reliability, and widespread service network, making them a smart investment choice.` }
      ],
      hyundai: [
        { id: '1', question: `What makes ${brand.charAt(0).toUpperCase() + brand.slice(1)} cars special?`, answer: `${brand.charAt(0).toUpperCase() + brand.slice(1)} cars are known for their premium features, advanced technology, stylish design, and excellent build quality with industry-leading warranty coverage.` },
        { id: '2', question: `Which is the most popular ${brand.charAt(0).toUpperCase() + brand.slice(1)} car in India?`, answer: `The ${brand.charAt(0).toUpperCase() + brand.slice(1)} Creta is the most popular model, leading the compact SUV segment with its premium features, spacious interior, and strong performance.` },
        { id: '3', question: `Are ${brand.charAt(0).toUpperCase() + brand.slice(1)} cars expensive to maintain?`, answer: `${brand.charAt(0).toUpperCase() + brand.slice(1)} cars have reasonable maintenance costs with comprehensive service packages and genuine parts availability across their extensive service network.` },
        { id: '4', question: `Does ${brand.charAt(0).toUpperCase() + brand.slice(1)} offer electric cars?`, answer: `Yes, ${brand.charAt(0).toUpperCase() + brand.slice(1)} offers the Kona Electric and has announced plans for more electric vehicles including Creta EV and other models in the coming years.` },
        { id: '5', question: `What is ${brand.charAt(0).toUpperCase() + brand.slice(1)}'s warranty coverage?`, answer: `${brand.charAt(0).toUpperCase() + brand.slice(1)} offers a comprehensive 3-year/unlimited km warranty on most models, with extended warranty options available for additional peace of mind.` }
      ],
      tata: [
        { id: '1', question: `Are ${brand.charAt(0).toUpperCase() + brand.slice(1)} cars safe?`, answer: `Yes, ${brand.charAt(0).toUpperCase() + brand.slice(1)} cars are renowned for their safety with multiple models receiving 5-star Global NCAP ratings, including Nexon, Altroz, and Punch.` },
        { id: '2', question: `Which ${brand.charAt(0).toUpperCase() + brand.slice(1)} electric car should I buy?`, answer: `The ${brand.charAt(0).toUpperCase() + brand.slice(1)} Nexon EV is the most popular choice with proven reliability, while Tigor EV offers sedan comfort and upcoming models like Curvv EV promise more options.` },
        { id: '3', question: `What is ${brand.charAt(0).toUpperCase() + brand.slice(1)}'s service network like?`, answer: `${brand.charAt(0).toUpperCase() + brand.slice(1)} has an extensive service network with over 1,200 service centers across India, ensuring convenient maintenance and support.` },
        { id: '4', question: `Are ${brand.charAt(0).toUpperCase() + brand.slice(1)} cars good for long drives?`, answer: `Yes, ${brand.charAt(0).toUpperCase() + brand.slice(1)} cars like Harrier and Safari are excellent for long drives with comfortable seating, good ride quality, and robust build quality.` },
        { id: '5', question: `What is the fuel efficiency of ${brand.charAt(0).toUpperCase() + brand.slice(1)} cars?`, answer: `${brand.charAt(0).toUpperCase() + brand.slice(1)} cars offer competitive fuel efficiency with Altroz delivering up to 25.11 kmpl, Tiago up to 23.84 kmpl, and Nexon up to 17.57 kmpl.` }
      ]
    }
    return faqData[brand] || []
  }

  const faqs = getFAQsByBrand(brandName)

  const toggleFAQ = (faqId: string) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId)
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {faqs.length === 0 ? (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              No FAQs available yet. Check back soon for answers to common questions!
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Common questions about {brandName.charAt(0).toUpperCase() + brandName.slice(1)} cars
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                    {openFAQ === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openFAQ === faq.id && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
