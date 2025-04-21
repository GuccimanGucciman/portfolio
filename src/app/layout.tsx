import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import AbstractBackground from '@/components/canvas/AbstractBackground'
import CustomCursor from '@/components/ui/CustomCursor'
import PlayfulScroll from '@/components/ui/PlayfulScroll'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'

// Use Inter with better typographic options
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  // Use more optical sizes for better legibility
  adjustFontFallback: true
})

// Define website URL for canonical and other references
const siteUrl = 'https://fludo.se'

export const metadata: Metadata = {
  // Main metadata with targeted keywords in title
  title: 'Fludo Web Design | Professional Web Development Services',
  description: 'Expert web design & development services for businesses. Custom responsive websites, e-commerce solutions, and SEO optimization that drive real results. Get a free quote today!',
  
  // Enhanced keywords for better search matching
  keywords: [
    'web design', 'web development', 'website design', 'responsive websites', 
    'business website', 'professional web design', 'SEO optimization', 
    'custom website development', 'web designer', 'affordable websites',
    'mobile-friendly websites', 'e-commerce websites', 'web developer',
    'frontend developer', 'Next.js developer', 'React developer', 'fludo'
  ],
  
  // Creator information
  authors: [{ name: 'Fludo Web Design', url: siteUrl }],
  creator: 'Fludo Web Design',
  publisher: 'Fludo Web Design',
  
  // Canonical URL to prevent duplicate content issues
  alternates: {
    canonical: siteUrl,
  },
  
  // Additional meta tags for robots and viewport
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  
  // Enhanced OpenGraph data for better social sharing
  openGraph: {  
    title: 'Fludo Web Design | Custom Website Development That Converts',
    description: 'Transform your online presence with our professional web design services. Custom responsive websites built to attract visitors, boost engagement, and grow your business.',
    url: siteUrl,
    siteName: 'Fludo Web Design',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Fludo Web Design - Professional Website Development Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  // Enhanced Twitter card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Fludo Web Design | Professional Websites That Drive Results',
    description: 'Expert web design services for businesses. Beautiful, responsive websites that convert visitors into customers. Get a free quote today!',
    site: '@fludo',
    creator: '@fludo',
    images: [`${siteUrl}/twitter-image.jpg`],
  },
  
  // Additional verification and application metadata
  verification: {
    google: 'google-site-verification-code', // Replace with your actual Google verification code
  },
  
  // Theme color for mobile browsers
  themeColor: '#2980b9',
  
  // Setting proper viewport
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to domains for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* JSON-LD structured data for local business */}
        <Script
          id="schema-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Fludo Web Design",
              "description": "Expert web design & development services for businesses. Custom responsive websites, e-commerce solutions, and SEO optimization that drive real results.",
              "image": "https://fludo.se/logo.jpg",
              "url": "https://fludo.se",
              "sameAs": [
                "https://www.linkedin.com/in/gustavbrochmann/",
              ],
              "priceRange": "$$",
              "servesCuisine": "Web Development Services",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "89"
              },
              "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "999",
                "highPrice": "9999",
                "priceCurrency": "USD",
                "offerCount": "4"
              }
            })
          }}
        />
        
        {/* Additional structured data for WebApplication */}
        <Script
          id="webapplication-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",

              "@type": "WebApplication",
              "name": "Fludo Web Design Portfolio",
              "applicationCategory": "DesignApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "89"
              }
            })
          }}
        />
        
        {/* FAQPage structured data */}
        <Script
          id="faq-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How long does it take to build a website?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The timeframe largely depends on the scope of the website, we'll provide a detailed timeline during our initial consultation based on your specific needs."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need to provide the content?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "While you know your business best, we offer content strategy and copywriting services to help craft compelling messaging. We can work with existing content or help you create new content that resonates with your audience."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What happens after my website launches?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We don't disappear after launch! We offer ongoing maintenance and support packages to ensure your site remains secure, up-to-date, and optimized for performance. We'll help you grow your online presence over time."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-[#01010A] text-white min-h-screen`}>
        <div className="relative min-h-screen">
          {/* Abstract minimalist background */}
          <AbstractBackground />
          
          {/* Custom cursor */}
          <CustomCursor />
          
          {/* Minimal scroll indicator */}
          <PlayfulScroll />
          
          {/* Navigation */}
          <Navbar />
          
          {/* Main content */}
          <main className="relative z-10 overflow-x-hidden">
            {children}
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  )
}
